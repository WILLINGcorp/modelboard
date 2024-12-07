import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CollabProposalFormProps {
  travelPlanId: string;
  receiverId: string;
  onSuccess: () => void;
  onClose: () => void;
}

const CollabProposalForm = ({ receiverId, onSuccess, onClose }: CollabProposalFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: { message: string }) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("collab_proposals").insert({
        sender_id: session.session.user.id,
        receiver_id: receiverId,
        message: values.message,
      });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Proposition de collaboration envoyée",
      });

      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la proposition",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Écrivez un message pour expliquer votre intérêt à collaborer..."
                  className="bg-modelboard-dark border-modelboard-gray"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-modelboard-red hover:bg-red-600">
          Envoyer la proposition
        </Button>
      </form>
    </Form>
  );
};

export default CollabProposalForm;