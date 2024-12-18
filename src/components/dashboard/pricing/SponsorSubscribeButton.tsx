import { FC } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SponsorSubscribeButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const SponsorSubscribeButton: FC<SponsorSubscribeButtonProps> = ({
  loading,
  setLoading,
}) => {
  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to subscribe");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-sponsor-checkout", {
        body: { user_id: user.id }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full py-2.5 px-4 bg-modelboard-red text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Subscribe Now"}
    </button>
  );
};