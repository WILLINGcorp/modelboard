import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <p className="flex items-center gap-2">
      <span className="text-gray-400">Status:</span>
      <span className={cn(
        "capitalize px-2 py-1 rounded-full text-sm",
        "bg-modelboard-red/20 text-modelboard-red"
      )}>
        {status}
      </span>
    </p>
  );
};