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
    <div className="p-4 rounded-lg bg-[#2A2A2A]/50 border border-modelboard-red/10 animate-fade-in">
      <h3 className="text-lg font-semibold text-modelboard-red mb-3">
        Proposal Details
      </h3>
      <div className="space-y-3 text-[#E5DEFF]">
        <div className="flex items-center justify-between">
          <span className="text-[#8E9196]">From:</span>
          <div className="text-right">
            <p className="font-medium">{senderName || "Anonymous"}</p>
            <p className="text-sm text-[#8E9196]">@{senderUsername || "unknown"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#8E9196]">To:</span>
          <div className="text-right">
            <p className="font-medium">{receiverName || "Anonymous"}</p>
            <p className="text-sm text-[#8E9196]">@{receiverUsername || "unknown"}</p>
          </div>
        </div>
        <p className="flex items-center gap-2">
          <span className="text-[#8E9196]">Location:</span>
          {location}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-[#8E9196]">Status:</span>
          <span className={cn(
            "capitalize px-2 py-1 rounded-full text-sm",
            "bg-modelboard-red/20 text-modelboard-red"
          )}>
            {status}
          </span>
        </p>
        {message && (
          <div className="pt-2 border-t border-modelboard-red/10">
            <p className="text-[#8E9196] mb-1">Message:</p>
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetails;