import { Camera, Map, MessageSquare, Users, FileText, Shield, Share2, Calendar, Film, Briefcase, Megaphone } from "lucide-react";

const features = [
  {
    icon: <Camera className="w-6 h-6 text-modelboard-red" />,
    title: "Professional Portfolio",
    description: "Create a stunning portfolio to showcase your best work and attract potential collaborators.",
  },
  {
    icon: <Map className="w-6 h-6 text-modelboard-red" />,
    title: "Travel Planning",
    description: "Share your travel schedule and find collaboration opportunities wherever you go.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-modelboard-red" />,
    title: "Secure Messaging",
    description: "Connect with other creators through our private messaging system.",
  },
  {
    icon: <Users className="w-6 h-6 text-modelboard-red" />,
    title: "Community",
    description: "Join a supportive community of like-minded creators and professionals.",
  },
  {
    icon: <FileText className="w-6 h-6 text-modelboard-red" />,
    title: "Send Collab Proposals",
    description: "Easily send and manage collaboration proposals with potential partners.",
  },
  {
    icon: <Shield className="w-6 h-6 text-modelboard-red" />,
    title: "Managed Regulatory Compliance",
    description: "Stay compliant with our built-in regulatory management system.",
  },
  {
    icon: <Share2 className="w-6 h-6 text-modelboard-red" />,
    title: "File Sharing",
    description: "Securely share and manage files with your collaborators.",
  },
  {
    icon: <Film className="w-6 h-6 text-modelboard-red" />,
    title: "Release Assets Management",
    description: "Organize and control your release assets efficiently.",
  },
  {
    icon: <Calendar className="w-6 h-6 text-modelboard-red" />,
    title: "Schedule Management",
    description: "Keep track of your shoots and releases with our scheduling tools.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-modelboard-red" />,
    title: "Pro Services",
    description: "Access professional post-production and editing services.",
  },
  {
    icon: <Megaphone className="w-6 h-6 text-modelboard-red" />,
    title: "Community Ads",
    description: "Promote your services and find opportunities within the community.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ModelBoard provides all the tools and features you need to manage your career
            and grow your professional network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl hover-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;