import { Button } from "@/components/ui/button";

export interface DurationOption {
  hours: number;
  price: number;
  label: string;
}

interface DurationOptionsProps {
  options: DurationOption[];
  onSelect: (option: DurationOption) => void;
  isLoading: boolean;
}

export const DurationOptions = ({
  options,
  onSelect,
  isLoading,
}: DurationOptionsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Select Duration</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <Button
            key={option.hours}
            onClick={() => onSelect(option)}
            disabled={isLoading}
            className="bg-modelboard-gray hover:bg-modelboard-gray/90 h-auto py-4"
            variant="outline"
          >
            <div className="text-center space-y-2">
              <div className="font-semibold">{option.label}</div>
              <div className="text-xl text-modelboard-red">${option.price}</div>
              <div className="text-sm text-gray-400">
                {option.hours} hours visibility
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};