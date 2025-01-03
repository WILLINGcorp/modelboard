import { format } from "date-fns";
import { MapPin, Calendar as CalendarIcon, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "./CollabProposalForm";

interface TravelPlan {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  description: string | null;
  status: string;
  profile_id: string;
}

const TravelPlanCard = ({ plan }: { plan: TravelPlan }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-modelboard-gray rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="h-5 w-5" />
          <h3 className="text-xl font-semibold">{plan.destination}</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:text-modelboard-red">
              <UserPlus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-modelboard-gray text-white">
            <DialogHeader>
              <DialogTitle>Propose Collaboration</DialogTitle>
            </DialogHeader>
            <CollabProposalForm
              travelPlanId={plan.id}
              receiverId={plan.profile_id}
              location={plan.destination}
              onSuccess={() => {}}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
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
          {plan.status === "upcoming" ? "Upcoming" : "Completed"}
        </span>
      </div>
    </div>
  );
};

export default TravelPlanCard;