import { WorkflowStep } from "../types/workflow";

interface StepContentProps {
  step: WorkflowStep;
}

const StepContent = ({ step }: StepContentProps) => {
  const data = step.data || {};
  
  switch (step.step_type) {
    case "Add Collaborator":
      return (
        <div>
          <p className="text-gray-400">Added collaborators:</p>
          <ul className="list-disc list-inside">
            {data.collaborators?.map((email: string, index: number) => (
              <li key={index} className="text-white">{email}</li>
            ))}
          </ul>
        </div>
      );
    case "Schedule Shoot":
    case "Schedule Release":
      return (
        <div>
          <p className="text-gray-400">Scheduled for:</p>
          <p className="text-white">
            {new Date(data.date).toLocaleDateString()} at {data.time}
          </p>
        </div>
      );
    case "Compliance":
      return (
        <div>
          <p className="text-gray-400">Compliance details:</p>
          <p className="text-white">{data.description}</p>
        </div>
      );
    case "Share Footage":
    case "Upload Promo":
    case "Upload Gallery":
    case "Upload Release":
      return (
        <div>
          <p className="text-gray-400">Uploaded file:</p>
          {data.fileUrl && (
            <a
              href={data.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-modelboard-red hover:underline"
            >
              View File
            </a>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;