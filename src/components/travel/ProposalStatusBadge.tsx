interface ProposalStatusBadgeProps {
  status: string;
}

const ProposalStatusBadge = ({ status }: ProposalStatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-500";
      case "rejected":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusStyles(status)}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default ProposalStatusBadge;