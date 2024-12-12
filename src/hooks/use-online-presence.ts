import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useOnlinePresence = (userId: string | undefined) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel('online_users')
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const online = new Set<string>();
        
        Object.values(newState).forEach((presence: any) => {
          presence.forEach((p: any) => {
            if (p.user_id) {
              online.add(p.user_id);
            }
          });
        });
        
        setOnlineUsers(online);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      });

    // Track user's presence
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          user_id: userId,
          online_at: new Date().toISOString(),
        });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);

  const isOnline = (id: string) => onlineUsers.has(id);

  return { isOnline, onlineUsers };
};