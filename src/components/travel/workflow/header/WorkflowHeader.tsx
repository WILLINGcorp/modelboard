import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export const WorkflowHeader = () => {
  return (
    <DrawerHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <DrawerTitle className="text-2xl font-bold text-gradient">
          Collaboration Workflow
        </DrawerTitle>
        <DrawerDescription className="text-sm text-gray-400">
          Manage your collaboration process step by step
        </DrawerDescription>
      </div>
    </DrawerHeader>
  );
};