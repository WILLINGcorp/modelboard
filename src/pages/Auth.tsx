import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Check if profile is complete
        const { data: profile } = await supabase
          .from("profiles")
          .select("profile_type, username")
          .eq("id", session.user.id)
          .single();

        // If profile is incomplete, redirect to profile setup
        if (!profile?.profile_type || !profile?.username) {
          navigate("/profile");
        } else {
          navigate("/dashboard");
        }
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-modelboard-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-modelboard-gray p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome to ModelBoard</h2>
          <p className="mt-2 text-gray-400">Sign in or create an account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#ea384c",
                  brandAccent: "#ff4d64",
                },
              },
            },
          }}
          theme="dark"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default AuthPage;