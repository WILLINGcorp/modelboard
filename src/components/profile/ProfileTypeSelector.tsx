import { useState } from "react";
import { Camera, Clapperboard, Building } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type ProfileType = "producer" | "creator" | "studio";

interface ProfileTypeSelectorProps {
  selectedType: ProfileType | null;
  onTypeSelect: (type: ProfileType) => void;
}

export const ProfileTypeSelector = ({
  selectedType,
  onTypeSelect,
}: ProfileTypeSelectorProps) => {
  const [pendingSelection, setPendingSelection] = useState<ProfileType | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const profileTypes = [
    {
      id: "producer" as const,
      title: "Indie Producer",
      subtitle: "Photographer / Videographer",
      icon: Camera,
      buttonText: "Make a Producer Profile",
    },
    {
      id: "creator" as const,
      title: "Content Creator",
      subtitle: "Performer / Model",
      icon: Clapperboard,
      buttonText: "Make a Creator Profile",
    },
    {
      id: "studio" as const,
      title: "Studio Executive",
      subtitle: "Casting / Institutional",
      icon: Building,
      buttonText: "Make a Studio Profile",
    },
  ];

  const handleTypeClick = (type: ProfileType) => {
    if (!selectedType) {
      setPendingSelection(type);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    if (pendingSelection) {
      onTypeSelect(pendingSelection);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setPendingSelection(null);
    setShowConfirmation(false);
  };

  const selectedTypeData = profileTypes.find(type => type.id === selectedType);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {selectedType ? (
          // Show only the selected type
          <Card
            key={selectedTypeData?.id}
            className="relative p-8 text-center bg-modelboard-gray ring-2 ring-modelboard-red"
          >
            {selectedTypeData && (
              <>
                <selectedTypeData.icon className="w-24 h-24 mx-auto mb-6 text-modelboard-red" strokeWidth={1} />
                <h3 className="text-2xl font-bold text-white mb-2">{selectedTypeData.title}</h3>
                <p className="text-gray-400 mb-6">{selectedTypeData.subtitle}</p>
                <button
                  className="w-full py-3 px-6 rounded-lg bg-modelboard-red text-white"
                  disabled
                >
                  {selectedTypeData.buttonText}
                </button>
              </>
            )}
          </Card>
        ) : (
          // Show all types if none selected
          profileTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = pendingSelection === type.id;
            
            return (
              <Card
                key={type.id}
                className={`
                  relative p-8 text-center cursor-pointer transition-all
                  hover:bg-modelboard-gray
                  ${isSelected ? 'bg-modelboard-gray ring-2 ring-modelboard-red' : 'bg-modelboard-dark'}
                `}
                onClick={() => handleTypeClick(type.id)}
              >
                <Icon className="w-24 h-24 mx-auto mb-6 text-modelboard-red" strokeWidth={1} />
                <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                <p className="text-gray-400 mb-6">{type.subtitle}</p>
                <button
                  className={`
                    w-full py-3 px-6 rounded-lg transition-colors
                    ${isSelected 
                      ? 'bg-modelboard-red text-white' 
                      : 'bg-modelboard-gray text-gray-300 hover:bg-modelboard-red hover:text-white'
                    }
                  `}
                >
                  {type.buttonText}
                </button>
              </Card>
            );
          })
        )}
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-modelboard-gray border-modelboard-dark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Profile Type</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This choice will be permanent and cannot be changed later. Are you sure you want to continue with this profile type?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleCancel}
              className="bg-modelboard-dark text-white hover:bg-modelboard-gray"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirm}
              className="bg-modelboard-red hover:bg-red-600 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};