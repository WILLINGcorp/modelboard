import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Globe } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const ModelProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileAndPortfolio = async () => {
      try {
        if (!id) {
          setError("No profile ID provided");
          setLoading(false);
          return;
        }

        // Fetch profile using .match() instead of .eq()
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select()
          .match({ id })
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch portfolio items using .match() instead of .eq()
        const { data: portfolioData, error: portfolioError } = await supabase
          .from("portfolio_items")
          .select()
          .match({ profile_id: id })
          .order("created_at", { ascending: false });

        if (portfolioError) throw portfolioError;
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    getProfileAndPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">{error || "Profile not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-modelboard-gray rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profile.display_name || "Anonymous Model"}
              </h1>
              {profile.location && (
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Globe className="h-4 w-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              {profile.bio && (
                <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <Card
              key={item.id}
              className="bg-modelboard-gray overflow-hidden"
            >
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-300">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelProfile;