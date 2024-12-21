import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Loader2 } from "lucide-react";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  onSuccess?: () => void;
}

interface UserSuggestion {
  id: string;
  display_name: string | null;
  username: string | null;
}

const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  proposalId,
  onSuccess,
}: InviteCollaboratorModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, display_name, username")
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(5);

      if (error) throw error;
      setSuggestions(profiles || []);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    searchUsers(value);
  };

  const handleInvite = async (username: string) => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    try {
      // Get current user's name
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: senderProfile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      // Find receiver by username
      const { data: receiverProfiles, error: receiverError } = await supabase
        .from("profiles")
        .select("id")
        .or(`username.eq.${username.trim()},display_name.eq.${username.trim()}`);

      if (receiverError) throw receiverError;
      if (!receiverProfiles || receiverProfiles.length === 0) {
        throw new Error("User not found with this username");
      }

      const receiverProfile = receiverProfiles[0];

      // Create collaboration proposal
      const { error: proposalError } = await supabase
        .from("collab_proposals")
        .insert({
          sender_id: user.id,
          receiver_id: receiverProfile.id,
          status: "pending",
          message: `Collaboration invitation from ${senderProfile?.display_name || "a user"}`,
          location: "Remote",
        });

      if (proposalError) throw proposalError;

      toast({
        title: "Success",
        description: "Collaboration invitation sent successfully",
      });
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search User
            </label>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by username or display name"
              className="bg-modelboard-gray border-modelboard-gray"
            />
            {isSearching && (
              <div className="absolute right-3 top-10">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
            {suggestions.length > 0 && (
              <Command className="absolute w-full z-50 mt-1 bg-modelboard-gray rounded-md border border-modelboard-gray/50">
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSelectSuggestion(suggestion)}
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
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-modelboard-gray hover:bg-modelboard-gray/90"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleInvite(searchTerm)}
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