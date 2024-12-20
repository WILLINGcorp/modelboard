import { Button } from "@/components/ui/button";

export const PublicNav = () => {
  return (
    <nav className="flex items-center space-x-8">
      <Button variant="ghost" asChild>
        <a href="#features">Features</a>
      </Button>
      <Button variant="ghost" asChild>
        <a href="#how-it-works">How it works</a>
      </Button>
      <Button variant="ghost" asChild>
        <a href="#pricing">Pricing</a>
      </Button>
    </nav>
  );
};