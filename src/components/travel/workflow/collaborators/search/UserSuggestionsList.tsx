import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { UserSuggestion } from "../types";

interface UserSuggestionsListProps {
  suggestions: UserSuggestion[];
  onSelectSuggestion: (suggestion: UserSuggestion) => void;
}

const UserSuggestionsList = ({ suggestions = [], onSelectSuggestion }: UserSuggestionsListProps) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Command className="absolute w-full z-50 mt-1 bg-modelboard-gray rounded-md border border-modelboard-gray/50">
        <CommandGroup>
          <CommandItem disabled className="cursor-default text-gray-400">
            No results found
          </CommandItem>
        </CommandGroup>
      </Command>
    );
  }

  return (
    <Command className="absolute w-full z-50 mt-1 bg-modelboard-gray rounded-md border border-modelboard-gray/50">
      <CommandGroup>
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