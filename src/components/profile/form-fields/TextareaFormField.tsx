import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./FormField";

interface TextareaFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export const TextareaFormField = ({ label, value, onChange, rows = 4 }: TextareaFormFieldProps) => (
  <FormField label={label}>
    <Textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-modelboard-dark border-modelboard-gray text-white"
      rows={rows}
    />
  </FormField>
);