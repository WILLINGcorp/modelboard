import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Calendar, File, Package, Sparkles, ShieldCheck } from "lucide-react";

export const WorkflowTabs = () => {
  return (
    <TabsList className="bg-modelboard-dark border border-modelboard-red/20 flex flex-wrap gap-2 mt-4 md:mt-0">
      {/* Core Tabs - Left */}
      <div className="flex gap-2 border-r border-modelboard-red/20 pr-2">
        <TabsTrigger 
          value="collaborators"
          className="data-[state=active]:bg-modelboard-red/10"
        >
          <Grid className="h-4 w-4 mr-2" />
          Collaborators
        </TabsTrigger>
        <TabsTrigger 
          value="schedule"
          className="data-[state=active]:bg-modelboard-red/10"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </TabsTrigger>
      </div>

      {/* Pro Services - Center */}
      <div className="px-2">
        <TabsTrigger 
          value="proservices"
          className="data-[state=active]:bg-modelboard-red/10 bg-gradient-to-r from-modelboard-red/20 to-transparent"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Pro Services
        </TabsTrigger>
      </div>

      {/* Premium Tabs - Right */}
      <div className="flex gap-2 border-l border-modelboard-red/20 pl-2">
        <TabsTrigger 
          value="compliance"
          className="data-[state=active]:bg-modelboard-red/10"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          Compliance
        </TabsTrigger>
        <TabsTrigger 
          value="files"
          className="data-[state=active]:bg-modelboard-red/10"
        >
          <File className="h-4 w-4 mr-2" />
          Project Files
        </TabsTrigger>
        <TabsTrigger 
          value="release"
          className="data-[state=active]:bg-modelboard-red/10"
        >
          <Package className="h-4 w-4 mr-2" />
          Release Assets
        </TabsTrigger>
      </div>
    </TabsList>
  );
};