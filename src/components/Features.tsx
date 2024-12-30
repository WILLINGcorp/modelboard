import { Camera, Map, MessageSquare, Users, FileText, Shield, Share2, Calendar, Film, Briefcase, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Features = () => {
  return (
    <section id="features" className="py-32 bg-gradient-to-b from-background via-modelboard-dark to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Elevate Your Creative Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            ModelBoard provides industry-leading tools and features designed to transform your professional portfolio 
            and expand your creative network.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 glass rounded-xl"
            >
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">10K+</h3>
              <p className="text-gray-400">Active creators</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 glass rounded-xl"
            >
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">50K+</h3>
              <p className="text-gray-400">Collaborations</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 glass rounded-xl"
            >
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">100+</h3>
              <p className="text-gray-400">Countries</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 glass rounded-xl"
            >
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">4.9/5</h3>
              <p className="text-gray-400">User rating</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass p-8 rounded-xl hover:bg-modelboard-gray/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-6 p-4 rounded-full bg-modelboard-gray/30 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;