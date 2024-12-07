import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface TravelPlanFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const TravelPlanForm = ({ onSuccess, onClose }: TravelPlanFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      destination: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const onSubmit = async (values: {
    destination: string;
    description: string;
    start_date: Date;
    end_date: Date;
  }) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("travel_plans").insert({
        destination: values.destination,
        description: values.description,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
        profile_id: session.session.user.id,
      });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Voyage planifié avec succès",
      });

      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de planifier le voyage",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-modelboard-dark border-modelboard-gray"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-modelboard-dark border-modelboard-gray"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="bg-modelboard-dark text-white rounded-md border border-modelboard-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="bg-modelboard-dark text-white rounded-md border border-modelboard-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-modelboard-red hover:bg-red-600">
          Planifier
        </Button>
      </form>
    </Form>
  );
};

export default TravelPlanForm;