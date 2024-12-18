import { Building2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface BrandsWorkedWithProps {
  profile: Profile;
}

export const BrandsWorkedWith = ({ profile }: BrandsWorkedWithProps) => {
  const brandsWorkedWith = (profile.brands_worked_with as string[]) || [];
  
  if (!brandsWorkedWith.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
        <Building2 className="h-5 w-5" />
        Brands & Studios
      </h3>
      <div className="flex flex-wrap gap-2">
        {brandsWorkedWith.map((brand, index) => (
          <span key={index} className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};