import { supabase } from "@/integrations/supabase/client";
import type { ToastProps } from "@/components/ui/use-toast";

export const uploadPortfolioImage = async (
  file: File,
  toast: (props: ToastProps) => void
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
    toast({
      title: "Error",
      variant: "destructive",
    });
    return null;
  }
};