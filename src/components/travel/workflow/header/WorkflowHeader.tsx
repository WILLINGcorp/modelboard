import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export const WorkflowHeader = () => {
  return (
    <DrawerHeader className="flex flex-col space-y-2 px-2 sm:px-4">
      <DrawerTitle className="text-xl sm:text-2xl font-bold text-gradient">
        Collaboration Workflow
      </DrawerTitle>
      <DrawerDescription className="text-sm text-gray-400">
        Manage your collaboration process step by step
      </DrawerDescription>
    </DrawerHeader>
  );
};