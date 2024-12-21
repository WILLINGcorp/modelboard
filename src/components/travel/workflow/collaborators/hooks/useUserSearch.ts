import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserSuggestion } from "../types";

export const useUserSearch = () => {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    suggestions,
    isSearching,
    searchUsers,
    setSuggestions
  };
};