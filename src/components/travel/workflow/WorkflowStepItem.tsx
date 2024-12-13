import { cn } from "@/lib/utils";
import { WorkflowStep } from "../types/workflow";
import StepContent from "./StepContent";
import ApprovalsList from "./ApprovalsList";

interface WorkflowStepItemProps {
  step: WorkflowStep;
}

const WorkflowStepItem = ({ step }: WorkflowStepItemProps) => {
  return (
    <div className="p-4 bg-modelboard-dark rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-white font-semibold">{step.step_type}</h4>
          <p className="text-sm text-gray-400">
            {new Date(step.created_at).toLocaleString()}
          </p>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-sm",
            step.status === "approved"
              ? "bg-green-500/20 text-green-500"
              : step.status === "rejected"
              ? "bg-red-500/20 text-red-500"
              : "bg-yellow-500/20 text-yellow-500"
          )}
        >
          {step.status}
        </span>
      </div>
      <StepContent step={step} />
      <ApprovalsList stepId={step.id} />
    </div>
  );
};

export default WorkflowStepItem;