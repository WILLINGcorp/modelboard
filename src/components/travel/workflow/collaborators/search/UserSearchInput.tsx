import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface UserSearchInputProps {
  searchTerm: string;
  isSearching: boolean;
  onSearchChange: (value: string) => void;
}

const UserSearchInput = ({ searchTerm, isSearching, onSearchChange }: UserSearchInputProps) => {
  return (
    <div className="relative">
      <label htmlFor="search" className="block text-sm font-medium mb-2">
        Search User
      </label>
      <Input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or display name"
        className="bg-modelboard-gray border-modelboard-gray"
      />
      {isSearching && (
        <div className="absolute right-3 top-10">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default UserSearchInput;