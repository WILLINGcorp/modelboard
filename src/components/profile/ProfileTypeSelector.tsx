import { Camera, Clapperboard, Building } from "lucide-react";
import { Card } from "@/components/ui/card";

export type ProfileType = "producer" | "creator" | "studio";

interface ProfileTypeSelectorProps {
  selectedType: ProfileType | null;
  onTypeSelect: (type: ProfileType) => void;
}

export const ProfileTypeSelector = ({
  selectedType,
  onTypeSelect,
}: ProfileTypeSelectorProps) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {profileTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        
        return (
          <Card
            key={type.id}
            className={`
              relative p-8 text-center cursor-pointer transition-all
              hover:bg-modelboard-gray
              ${isSelected ? 'bg-modelboard-gray ring-2 ring-modelboard-red' : 'bg-modelboard-dark'}
            `}
            onClick={() => onTypeSelect(type.id)}
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
      })}
    </div>
  );
};