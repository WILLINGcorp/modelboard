import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

type TravelPlan = {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  description: string | null;
  status: string;
};

const TravelPlans = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: travelPlans, refetch } = useQuery({
    queryKey: ["travel-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("travel_plans")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data as TravelPlan[];
    },
  });

  const form = useForm({
    defaultValues: {
      destination: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const onSubmit = async (values) => {
    try {
      const { error } = await supabase.from("travel_plans").insert({
        destination: values.destination,
        description: values.description,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Voyage planifié avec succès",
      });

      form.reset();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de planifier le voyage",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Mes Voyages</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-modelboard-red hover:bg-red-600">
                <Plus className="mr-2" />
                Planifier un voyage
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-modelboard-gray text-white">
              <DialogHeader>
                <DialogTitle>Planifier un nouveau voyage</DialogTitle>
              </DialogHeader>
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
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelPlans?.map((plan) => (
            <div
              key={plan.id}
              className="bg-modelboard-gray rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="h-5 w-5" />
                <h3 className="text-xl font-semibold">{plan.destination}</h3>
              </div>
              {plan.description && (
                <p className="text-gray-400">{plan.description}</p>
              )}
              <div className="flex items-center space-x-2 text-gray-400">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {format(new Date(plan.start_date), "dd/MM/yyyy")} -{" "}
                  {format(new Date(plan.end_date), "dd/MM/yyyy")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    plan.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {plan.status === "upcoming" ? "À venir" : "Terminé"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPlans;