import { Button } from "@/components/ui/button";

interface PublicNavProps {
  isMobile?: boolean;
}

export const PublicNav = ({ isMobile = false }: PublicNavProps) => {
  const navigationItems = [
    { label: "Features", path: "#features" },
    { label: "How it works", path: "#how-it-works" },
    { label: "Pricing", path: "#pricing" },
  ];

  return (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={`hover:text-modelboard-red transition-colors ${
            isMobile ? "w-full justify-start" : ""
          }`}
          asChild
        >
          <a href={item.path}>{item.label}</a>
        </Button>
      ))}
    </>
  );
};