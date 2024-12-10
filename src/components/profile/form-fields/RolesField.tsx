import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "./FormField";

interface RolesFieldProps {
  selectedRoles: string[];
  onRoleChange: (roleId: string, checked: boolean) => void;
}

export const RolesField = ({ selectedRoles, onRoleChange }: RolesFieldProps) => {
  const roles = [
    { id: "performer", label: "Performer / Model" },
    { id: "photographer", label: "Photographer / Videographer" },
    { id: "creator", label: "Creator / Producer" },
    { id: "institutional", label: "Institutional / Studio Representative / Casting" }
  ];

  return (
    <FormField label="Roles">
      <div className="flex flex-wrap gap-6">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center space-x-2">
            <Checkbox
              id={role.id}
              checked={selectedRoles.includes(role.id)}
              onCheckedChange={(checked) => 
                onRoleChange(role.id, checked as boolean)
              }
            />
            <label
              htmlFor={role.id}
              className="text-sm text-gray-300 cursor-pointer"
            >
              {role.label}
            </label>
          </div>
        ))}
      </div>
    </FormField>
  );
};