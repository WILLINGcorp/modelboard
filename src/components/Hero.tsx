import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-modelboard-red/10 text-modelboard-red text-sm font-medium mb-8 animate-fadeIn">
            Join the community of independent creators
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Connect, Collaborate, and
            <span className="text-modelboard-red"> Create Together</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            ModelBoard is the premier platform for independent content creators to showcase their work,
            connect with peers, and discover exciting collaboration opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <Button className="bg-modelboard-red hover:bg-red-600 text-white px-8 py-6 text-lg w-full sm:w-auto">
              Create your portfolio
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg w-full sm:w-auto">
              Explore creators
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fadeIn" style={{ animationDelay: "0.8s" }}>
            <div>
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">10K+</h3>
              <p className="text-gray-400">Active creators</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">50K+</h3>
              <p className="text-gray-400">Collaborations</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">100+</h3>
              <p className="text-gray-400">Countries</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-modelboard-red mb-2">4.9/5</h3>
              <p className="text-gray-400">User rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;