import { ProfileForm } from "@/components/profile/ProfileForm";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

const Profile = () => {
  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileForm />
        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default Profile;