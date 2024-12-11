import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "./FormField";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const SelectFormField = ({ label, value, options, onChange }: SelectFormFieldProps) => (
  <FormField label={label}>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-modelboard-dark border-modelboard-gray text-white">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormField>
);