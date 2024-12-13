import { Button } from "@/components/ui/button";

export const PublicNav = () => {
  return (
    <>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#features">Features</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#how-it-works">How it works</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#pricing">Pricing</a>
      </Button>
    </>
  );
};