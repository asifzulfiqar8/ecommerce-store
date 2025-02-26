import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-primary">
      <section className="container mx-auto px-5 py-3">
        <Link to="/" className="text-2xl font-bold text-white">
          E-Commerce
        </Link>
      </section>
    </header>
  );
};

export default Header;
