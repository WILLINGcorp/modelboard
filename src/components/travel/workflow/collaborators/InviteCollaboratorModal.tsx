import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserSearchInput from "./search/UserSearchInput";
import UserSuggestionsList from "./search/UserSuggestionsList";
import { useUserSearch } from "./hooks/useUserSearch";
import { useCollabInvite } from "./hooks/useCollabInvite";
import { UserSuggestion } from "./types";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  proposalId: string;
}

const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  onSuccess = () => {},
  proposalId,
}: InviteCollaboratorModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { suggestions, isSearching, searchUsers, setSuggestions } = useUserSearch();
  const { isLoading, sendInvite } = useCollabInvite(proposalId, onSuccess);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    searchUsers(value);
  };

  const handleSelectSuggestion = (suggestion: UserSuggestion) => {
    setSearchTerm(suggestion.username || suggestion.display_name || "");
    setSuggestions([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
          <DialogDescription className="text-gray-400">
            Search by username or display name
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <UserSearchInput
            searchTerm={searchTerm}
            isSearching={isSearching}
            onSearchChange={handleSearchChange}
          />
          <UserSuggestionsList
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-modelboard-gray hover:bg-modelboard-gray/90"
            >
              Cancel
            </Button>
            <Button
              onClick={() => sendInvite(searchTerm)}
              disabled={isLoading || !searchTerm.trim()}
              className="bg-modelboard-red hover:bg-modelboard-red/90"
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCollaboratorModal;