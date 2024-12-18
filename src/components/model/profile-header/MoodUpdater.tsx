import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface MoodUpdaterProps {
  profileId: string;
  initialMood: string;
}

export const MoodUpdater = ({ profileId, initialMood }: MoodUpdaterProps) => {
  const [currentMood, setCurrentMood] = useState(initialMood || "");
  const { toast } = useToast();

  const handleMoodUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          current_mood: currentMood,
          current_mood_updated_at: new Date().toISOString()
        })
        .eq("id", profileId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Mood updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update mood",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4">
      <Input
        placeholder="How are you feeling? (52 chars max)"
        value={currentMood}
        onChange={(e) => setCurrentMood(e.target.value.slice(0, 52))}
        className="mb-2"
      />
      <Button 
        onClick={handleMoodUpdate}
        className="w-full bg-modelboard-dark hover:bg-modelboard-gray text-white"
      >
        Update Mood
      </Button>
    </div>
  );
};