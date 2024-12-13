import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TravelPlanForm from "@/components/travel/TravelPlanForm";

interface TravelPlansHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  refetchTravelPlans: () => void;
}

const TravelPlansHeader = ({ isDialogOpen, setIsDialogOpen, refetchTravelPlans }: TravelPlansHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">My Travel Plans</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-modelboard-red hover:bg-red-600">
            <Plus className="mr-2" />
            Plan a Trip
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-modelboard-gray text-white">
          <DialogHeader>
            <DialogTitle>Plan a New Trip</DialogTitle>
          </DialogHeader>
          <TravelPlanForm
            onSuccess={refetchTravelPlans}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TravelPlansHeader;