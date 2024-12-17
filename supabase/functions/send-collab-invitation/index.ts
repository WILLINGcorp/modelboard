import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  message: string;
  proposalId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, message, proposalId }: InvitationRequest = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get proposal details
    const { data: proposal, error: proposalError } = await supabaseClient
      .from("collab_proposals")
      .select("*, sender:profiles!sender_id(*)")
      .eq("id", proposalId)
      .single();

    if (proposalError) throw proposalError;

    // Send email using Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Modelboard <onboarding@resend.dev>",
        to: [email],
        subject: "Invitation to Join Collaboration Project on Modelboard",
        html: `
          <h2>You've been invited to join a collaboration project on Modelboard!</h2>
          <p>${proposal.sender.display_name || "A user"} has invited you to collaborate on their project.</p>
          ${message ? `<p>Message: ${message}</p>` : ""}
          <p>Click the link below to join Modelboard and view the collaboration proposal:</p>
          <a href="${Deno.env.get("FRONTEND_URL")}/auth?proposal=${proposalId}">Join Collaboration</a>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);