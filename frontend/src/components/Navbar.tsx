import { Link } from "react-router-dom";

const linkClasses =
  "relative pb-1 text-secondary transition-colors duration-300 hover:text-primary after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-secondary/20 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl text-primary">
          AuthSecurityDemo
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium sm:text-base">
          <Link to="/login" className={linkClasses}>
            Login
          </Link>
          <Link to="/signup" className={linkClasses}>
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
