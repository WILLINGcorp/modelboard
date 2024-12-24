import { Button } from "@/components/ui/button";

interface PublicNavProps {
  isMobile?: boolean;
}

export const PublicNav = ({ isMobile = false }: PublicNavProps) => {
  const containerClasses = isMobile 
    ? "flex flex-col space-y-4 w-full" 
    : "flex items-center space-x-4";

  const buttonClasses = isMobile 
    ? "w-full justify-start" 
    : "";

  return (
    <nav className={containerClasses}>
      <Button 
        variant="ghost" 
        className={`hover:text-modelboard-red transition-colors ${buttonClasses}`}
        asChild
      >
        <a href="#features">Features</a>
      </Button>
      <Button 
        variant="ghost"
        className={`hover:text-modelboard-red transition-colors ${buttonClasses}`}
        asChild
      >
        <a href="#how-it-works">How it works</a>
      </Button>
      <Button 
        variant="ghost"
        className={`hover:text-modelboard-red transition-colors ${buttonClasses}`}
        asChild
      >
        <a href="#pricing">Pricing</a>
      </Button>
    </nav>
  );
};