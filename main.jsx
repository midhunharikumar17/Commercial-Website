import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, Search, User } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-slate-800 to-slate-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Menu & Navigation */}
        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav
            className={`absolute left-0 top-14 w-full bg-slate-700 md:static md:flex md:w-auto md:bg-transparent transition-all ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-6 px-4 py-2 md:py-0">
              {["Home", "About", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="block py-2 md:py-0 hover:text-teal-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="text-xl font-bold tracking-wide">
          <a href="/">YourLogo</a>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <button aria-label="Search"><Search size={20} /></button>
          <button aria-label="Favorites"><Heart size={20} /></button>
          <button aria-label="Cart"><ShoppingCart size={20} /></button>
          <button aria-label="Login / Signup" className="hidden md:block">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Login */}
      <div className="md:hidden flex justify-center py-2 border-t border-slate-700">
        <button className="flex items-center gap-1 text-sm hover:text-teal-300">
          <User size={18} /> Login / Signup
        </button>
      </div>
    </header>
  );
}
