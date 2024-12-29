import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortfolioHeaderProps {
  isOwnPortfolio: boolean;
}

export const PortfolioHeader = ({ isOwnPortfolio }: PortfolioHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">Portfolio</h2>
      {isOwnPortfolio && (
        <Button
          onClick={() => navigate('/my-portfolio')}
          className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Portfolio
        </Button>
      )}
    </div>
  );
};