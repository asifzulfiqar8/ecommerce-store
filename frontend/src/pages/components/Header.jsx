import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { VscLock } from "react-icons/vsc";

const Header = () => {
  const user = true;
  const isAdmin = true;
  return (
    <header className="w-full bg-black">
      <section className="container mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          E-Commerce
        </Link>
        <nav className="flex items-center flex-wrap gap-4 lg:gap-6">
          <Link
            to="/"
            className="text-base text-white hover:text-primary transition-all duration-150 font-semibold"
          >
            Home
          </Link>
          {user && (
            <div className="relative flex items-center gap-1">
              <Link to="/cart" className="text-base text-white font-semibold">
                <BsCart2 fontSize={20} color="white" />
              </Link>
              <span className="absolute -top-2 right-1 bg-white size-3 grid place-items-center rounded-full text-[10px] font-bold text-black">
                0
              </span>
            </div>
          )}
          {isAdmin && (
            <Link
              to="/dashboard"
              className="px-4 py-1 border border-white rounded-md flex items-center justify-center gap-2 text-base text-white font-semibold hover:bg-primary transition-all duration-150"
            >
              <VscLock />
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              type="button"
              className="px-4 py-1 rounded-md border border-white bg-white group hover:bg-primary transition-all duration-150"
            >
              <IoLogOutOutline
                fontSize={20}
                className="text-primary group-hover:text-white"
              />
            </button>
          ) : (
            <button className="px-4 py-1 text-base font-semibold rounded-md border border-white bg-white hover:bg-primary transition-all duration-150">
              Sign up
            </button>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Header;
