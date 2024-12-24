import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="hover-effect">
      <img 
        src="/modelboard_logo_white.png" 
        alt="ModelBoard" 
        className="h-8 md:h-10"
      />
    </Link>
  );
};