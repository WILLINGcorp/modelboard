import { FC } from "react";

export const SponsorFeaturesList: FC = () => {
  const features = [
    "Sponsor account badge",
    "Advanced analytics",
    "Priority support",
    "Be featured among Sponsor members in premium placements across the platform",
  ];

  return (
    <ul className="space-y-3 text-sm mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red/50" />
          {feature}
        </li>
      ))}
    </ul>
  );
};