import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Grid, Calendar, File, Package, Sparkles, ShieldCheck, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface WorkflowTabsProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const WorkflowTabs = ({ defaultValue = "collaborators", onValueChange }: WorkflowTabsProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabs = [
    { value: "collaborators", label: "Collaborators", icon: <Grid className="h-4 w-4" /> },
    { value: "schedule", label: "Schedule", icon: <Calendar className="h-4 w-4" /> },
    { value: "proservices", label: "Pro Services", icon: <Sparkles className="h-4 w-4" /> },
    { value: "compliance", label: "Compliance", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "files", label: "Files", icon: <File className="h-4 w-4" /> },
    { value: "release", label: "Release", icon: <Package className="h-4 w-4" /> },
    { value: "chat", label: "Project Chat", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  if (isMobile) {
    return (
      <div className="px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {tabs.find(tab => tab.value === activeTab)?.label || tabs[0].label}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[200px]">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className="flex items-center gap-2"
              >
                {tab.icon}
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <TabsList className="bg-modelboard-dark border border-modelboard-red/20 flex flex-nowrap gap-2 p-1 h-auto w-max min-w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base flex items-center gap-2"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};