import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { UserSuggestion } from "../types";

interface UserSuggestionsListProps {
  suggestions: UserSuggestion[];
  onSelectSuggestion: (suggestion: UserSuggestion) => void;
}

const UserSuggestionsList = ({ suggestions, onSelectSuggestion }: UserSuggestionsListProps) => {
  return (
    <Command className="rounded-lg border border-modelboard-red/20">
      <CommandGroup>
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <CommandItem
              key={suggestion.id}
              onSelect={() => onSelectSuggestion(suggestion)}
              className="cursor-pointer hover:bg-modelboard-gray/50 flex flex-col items-start p-2"
            >
              <span className="font-medium text-white">
                {suggestion.display_name || suggestion.username}
              </span>
              {suggestion.username && suggestion.display_name && (
                <span className="text-sm text-gray-400">@{suggestion.username}</span>
              )}
            </CommandItem>
          ))
        ) : (
          <CommandEmpty className="p-2 text-sm text-gray-400">
            No results found
          </CommandEmpty>
        )}
      </CommandGroup>
    </Command>
  );
};

export default UserSuggestionsList;