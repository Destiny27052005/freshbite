import { useState, useRef, useEffect } from "react";
import { 
  Leaf, 
  Menu, 
  Search, 
  ShoppingCart, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { productsData } from "../data/products"; // adjust path as needed

const links = [
  { title: "Home", to: "/" },
  { title: "Shop", to: "/shop" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Zustand Store
  const totalCount = useCartStore((state) => state.getTotalCount());
  const addItem = useCartStore((state) => state.addItem);

  // Filter products by title or category
  const searchResults = searchQuery.trim()
    ? productsData.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-350 mx-auto flex items-center justify-between px-6 md:px-12 py-3.5">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#12773c] flex items-center justify-center text-white">
            <Leaf className="h-5 w-5 fill-current" />
          </div>
          <div className="leading-tight">
            <h1 className="text-[#0d2a17] text-xl font-black tracking-tight">FreshBites</h1>
            <p className="text-[10px] text-gray-500 font-medium">Good Food • Happy You</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.title}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative py-1 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#12773c] after:content-[''] after:absolute after:left-0 after:-bottom-4 after:w-full after:h-[2.5px] after:bg-[#12773c] after:rounded-full"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          {/* Search Input Container */}
          <div ref={searchContainerRef} className="relative">
            <div className="flex items-center gap-2 bg-[#f8faf9] border border-gray-200/90 px-3.5 py-1.5 rounded-full w-52 sm:w-64 lg:w-72 focus-within:border-[#12773c] focus-within:bg-white transition-all shadow-2xs">
              <Search className="h-4 w-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search products..."
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Live Search Availability Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-84 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Results for "{searchQuery}"</span>
                  <span>{searchResults.length} found</span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center space-y-1">
                      <div className="flex justify-center text-amber-500">
                        <AlertCircle size={20} />
                      </div>
                      <p className="text-xs font-semibold text-gray-800">Product Unavailable</p>
                      <p className="text-[11px] text-gray-400">
                        We don't have this item in stock right now. Check back soon!
                      </p>
                    </div>
                  ) : (
                    searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-2.5 flex items-center justify-between gap-2.5 hover:bg-gray-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={prod.img}
                            alt={prod.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-gray-800 truncate">
                              {prod.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-bold text-gray-900">
                                ₦{prod.price.toLocaleString()}
                              </span>

                              {/* Availability Pill */}
                              {prod.inStock ? (
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-[#eaf5ed] text-[#12773c]">
                                  <CheckCircle2 size={10} /> Available
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-red-50 text-red-600">
                                  <AlertCircle size={10} /> Out of stock
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Direct Add to Cart (Only if in stock) */}
                        {prod.inStock && (
                          <button
                            onClick={() => {
                              addItem(prod);
                              setIsSearchOpen(false);
                            }}
                            title="Add to Cart"
                            className="shrink-0 p-1.5 rounded-lg bg-[#12773c] hover:bg-[#0e5c2e] text-white transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                  <Link
                    to="/shop"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[11px] text-[#12773c] font-semibold hover:underline"
                  >
                    View All Products in Shop &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cart Counter Icon */}
          <Link to="/shop" className="relative cursor-pointer p-1">
            <ShoppingCart className="h-5 w-5 text-[#0d2a17]" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#12773c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-black p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 bg-white">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "bg-green-50 text-[#12773c]" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}