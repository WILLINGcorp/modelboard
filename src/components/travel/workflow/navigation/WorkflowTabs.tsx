import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Calendar, File, Package, Sparkles, ShieldCheck } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const WorkflowTabs = () => {
  return (
    <ScrollArea className="w-full">
      <TabsList className="bg-modelboard-dark border border-modelboard-red/20 flex flex-nowrap gap-2 p-1 h-auto w-max min-w-full">
        {/* Core Tabs - Left */}
        <div className="flex gap-2 border-r border-modelboard-red/20 pr-2">
          <TabsTrigger 
            value="collaborators"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base"
          >
            <Grid className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Collaborators</span>
            <span className="sm:hidden">Collab</span>
          </TabsTrigger>
          <TabsTrigger 
            value="schedule"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base"
          >
            <Calendar className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            Schedule
          </TabsTrigger>
        </div>

        {/* Pro Services - Center */}
        <div className="px-2">
          <TabsTrigger 
            value="proservices"
            className="data-[state=active]:bg-modelboard-red/10 bg-gradient-to-r from-modelboard-red/20 to-transparent whitespace-nowrap text-sm sm:text-base"
          >
            <Sparkles className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Pro Services</span>
            <span className="sm:hidden">Pro</span>
          </TabsTrigger>
        </div>

        {/* Premium Tabs - Right */}
        <div className="flex gap-2 border-l border-modelboard-red/20 pl-2">
          <TabsTrigger 
            value="compliance"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base"
          >
            <ShieldCheck className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Compliance</span>
            <span className="sm:hidden">Comp</span>
          </TabsTrigger>
          <TabsTrigger 
            value="files"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base"
          >
            <File className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            Files
          </TabsTrigger>
          <TabsTrigger 
            value="release"
            className="data-[state=active]:bg-modelboard-red/10 whitespace-nowrap text-sm sm:text-base"
          >
            <Package className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Release Assets</span>
            <span className="sm:hidden">Release</span>
          </TabsTrigger>
        </div>
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};