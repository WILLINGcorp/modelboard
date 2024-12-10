import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => (
  <div>
    <label className="text-sm font-medium text-white">{label}</label>
    {children}
  </div>
);