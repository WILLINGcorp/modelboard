import { FormField } from "../../form-fields/FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { TextFormField } from "../../form-fields/TextFormField";

interface BusinessModelAndSkillsProps {
  businessModel: string[];
  skills: string[];
  otherSkill: string;
  onBusinessModelChange: (modelId: string, checked: boolean) => void;
  onSkillChange: (skillId: string, checked: boolean) => void;
  onOtherSkillChange: (value: string) => void;
}

const BUSINESS_MODELS = [
  { id: "collaborative", label: "Collaborative" },
  { id: "hourly", label: "Hourly Rate" },
  { id: "project", label: "Per Project Rate" },
  { id: "quote", label: "Ask for a Quote" },
  { id: "ask", label: "Ask Me" },
];

const SKILLS = [
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "post_production", label: "Post-Production" },
  { id: "scriptwriting", label: "Scriptwriting" },
  { id: "directing", label: "Directing" },
  { id: "other", label: "Other" },
];

export const BusinessModelAndSkills = ({
  businessModel,
  skills,
  otherSkill,
  onBusinessModelChange,
  onSkillChange,
  onOtherSkillChange,
}: BusinessModelAndSkillsProps) => (
  <div className="grid grid-cols-2 gap-6">
    <FormField label="Business Model">
      <div className="space-y-2">
        {BUSINESS_MODELS.map((model) => (
          <div key={model.id} className="flex items-center space-x-2">
            <Checkbox
              id={`business-${model.id}`}
              checked={businessModel.includes(model.id)}
              onCheckedChange={(checked) => 
                onBusinessModelChange(model.id, checked as boolean)
              }
            />
            <label
              htmlFor={`business-${model.id}`}
              className="text-sm text-gray-300 cursor-pointer"
            >
              {model.label}
            </label>
          </div>
        ))}
      </div>
    </FormField>

    <FormField label="Skills">
      <div className="space-y-2">
        {SKILLS.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-2">
            <Checkbox
              id={`skill-${skill.id}`}
              checked={skills.includes(skill.id)}
              onCheckedChange={(checked) => 
                onSkillChange(skill.id, checked as boolean)
              }
            />
            <label
              htmlFor={`skill-${skill.id}`}
              className="text-sm text-gray-300 cursor-pointer"
            >
              {skill.label}
            </label>
          </div>
        ))}
      </div>
    </FormField>

    {skills.includes("other") && (
      <TextFormField
        label="Other Skill"
        value={otherSkill}
        onChange={onOtherSkillChange}
      />
    )}
  </div>
);