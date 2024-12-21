import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Calendar, File, Package, Sparkles, ShieldCheck } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const WorkflowTabs = () => {
  return (
    <ScrollArea className="w-full">
      <TabsList className="bg-modelboard-dark border border-modelboard-red/20 flex flex-nowrap gap-2 mt-4 md:mt-0 p-1 h-auto">
        {/* Core Tabs - Left */}
        <div className="flex gap-2 border-r border-modelboard-red/20 pr-2">
          <TabsTrigger 
            value="collaborators"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap"
          >
            <Grid className="h-4 w-4 mr-2" />
            Collaborators
          </TabsTrigger>
          <TabsTrigger 
            value="schedule"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </div>

        {/* Pro Services - Center */}
        <div className="px-2">
          <TabsTrigger 
            value="proservices"
            className="data-[state=active]:bg-modelboard-red/10 bg-gradient-to-r from-modelboard-red/20 to-transparent whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Pro Services
          </TabsTrigger>
        </div>

        {/* Premium Tabs - Right */}
        <div className="flex gap-2 border-l border-modelboard-red/20 pl-2">
          <TabsTrigger 
            value="compliance"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger 
            value="files"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap"
          >
            <File className="h-4 w-4 mr-2" />
            Project Files
          </TabsTrigger>
          <TabsTrigger 
            value="release"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap"
          >
            <Package className="h-4 w-4 mr-2" />
            Release Assets
          </TabsTrigger>
        </div>
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};