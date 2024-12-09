import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {portfolio.map((item) => (
          <Card
            key={item.id}
            className="bg-modelboard-gray overflow-hidden break-inside-avoid mb-6"
          >
            <img
              src={item.media_url}
              alt={item.title}
              className="w-full object-cover"
              loading="lazy"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-300">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PortfolioSection;