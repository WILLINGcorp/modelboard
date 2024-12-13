import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const uploadPortfolioImage = async (
  file: File,
  showToast: typeof toast
): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("portfolio")
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    showToast({
      title: "Error",
      variant: "destructive",
    });
    return null;
  }
};