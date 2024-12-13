import { cn } from "@/lib/utils";

interface ProposalDetailsProps {
  location: string;
  status: string;
  message: string | null;
  senderName: string | null;
  senderUsername: string | null;
  receiverName: string | null;
  receiverUsername: string | null;
}

const ProposalDetails = ({
  location,
  status,
  message,
  senderName,
  senderUsername,
  receiverName,
  receiverUsername,
}: ProposalDetailsProps) => {
  return (
    <div className="p-4 rounded-lg bg-modelboard-dark border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h3 className="text-lg font-bold text-gradient mb-3 relative z-10">
        Proposal Details
      </h3>
      <div className="space-y-3 text-white relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">From:</span>
          <div className="text-right">
            <p className="font-medium">{senderName || "Anonymous"}</p>
            <p className="text-sm text-gray-400">@{senderUsername || "unknown"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">To:</span>
          <div className="text-right">
            <p className="font-medium">{receiverName || "Anonymous"}</p>
            <p className="text-sm text-gray-400">@{receiverUsername || "unknown"}</p>
          </div>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-gray-400">Location:</span>
          {location}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-gray-400">Status:</span>
          <span className={cn(
            "capitalize px-2 py-1 rounded-full text-sm",
            "bg-modelboard-red/20 text-modelboard-red"
          )}>
            {status}
          </span>
        </p>
        {message && (
          <div className="pt-2 border-t border-modelboard-red/10">
            <p className="text-gray-400 mb-1">Message:</p>
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetails;