import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";

interface TextFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "url";
}

export const TextFormField = ({ label, value, onChange, type = "text" }: TextFormFieldProps) => (
  <FormField label={label}>
    <Input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-modelboard-dark border-modelboard-gray text-white"
    />
  </FormField>
);