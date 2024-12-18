import { Heart } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Security", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Guidelines", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const FooterLinkSection = ({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    <ul className="space-y-2 text-gray-400">
      {links.map(({ label, href }) => (
        <li key={label}>
          <a href={href} className="hover:text-modelboard-red transition-colors">
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/modelboard_logo_white.png" 
              alt="ModelBoard" 
              className="h-8 mb-4"
            />
            <p className="text-gray-400">
              The premier platform for independent content creators.
            </p>
          </div>
          
          <FooterLinkSection title="Product" links={footerLinks.product} />
          <FooterLinkSection title="Resources" links={footerLinks.resources} />
          <FooterLinkSection title="Company" links={footerLinks.company} />
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ModelBoard. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-modelboard-red transition-colors">Privacy</a>
            <a href="#" className="hover:text-modelboard-red transition-colors">Terms</a>
            <span className="flex items-center">
              Made with <Heart size={16} className="text-modelboard-red mx-1" /> by ModelBoard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;