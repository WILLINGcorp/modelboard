import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { UserSuggestion } from "../types";

interface UserSuggestionsListProps {
  suggestions: UserSuggestion[];
  onSelectSuggestion: (suggestion: UserSuggestion) => void;
}

const UserSuggestionsList = ({ suggestions = [], onSelectSuggestion }: UserSuggestionsListProps) => {
  if (!suggestions?.length) {
    return (
      <Command>
        <CommandGroup heading="Results">
          <CommandItem disabled>No results found</CommandItem>
        </CommandGroup>
      </Command>
    );
  }

  return (
    <Command>
      <CommandGroup heading="Results">
        {suggestions.map((suggestion) => (
          <CommandItem
            key={suggestion.id}
            onSelect={() => onSelectSuggestion(suggestion)}
            className="cursor-pointer hover:bg-modelboard-gray/50"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {suggestion.display_name || suggestion.username}
              </span>
              {suggestion.username && suggestion.display_name && (
                <span className="text-sm text-gray-400">@{suggestion.username}</span>
              )}
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};

export default UserSuggestionsList;