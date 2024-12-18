import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.mode === 'subscription') {
          const { user_id } = session.metadata;
          const subscriptionId = session.subscription;
          
          const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
          const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
          
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'sponsor',
              subscription_end_date: currentPeriodEnd.toISOString(),
            })
            .eq('id', user_id);
        } else {
          // Handle paid ad checkout
          const { user_id, hours } = session.metadata;
          const endTime = new Date();
          endTime.setHours(endTime.getHours() + parseInt(hours));

          await supabase
            .from('paid_ads')
            .insert({
              profile_id: user_id,
              end_time: endTime.toISOString(),
            });
        }
        break;
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const status = subscription.status === 'active' ? 'sponsor' : 'free';
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        
        // Find the user by customer ID
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .single();
          
        if (profiles) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: status,
              subscription_end_date: status === 'sponsor' ? currentPeriodEnd.toISOString() : null,
            })
            .eq('id', profiles.id);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});