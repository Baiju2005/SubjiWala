import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const [open, setOpen] = useState(false);          // profile dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu

  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);

  const navigate = useNavigate();

  /* ---------- close profile dropdown outside ---------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- close mobile menu outside ---------- */
  useEffect(() => {
    const handleOutsideMobile = (event) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideMobile);
    return () => document.removeEventListener("mousedown", handleOutsideMobile);
  }, []);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm relative">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          Sabji<span className="text-gray-800">Wala</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/products" className="hover:text-green-600">All Products</Link>
          <Link to="/orders" className="hover:text-green-600">My Orders</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-700 hover:text-green-600">
            <FaShoppingCart size={22} />
          </Link>

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-gray-700 hover:text-green-600"
              >
                <FaUserCircle size={26} />
                <span className="font-medium hidden sm:block">{user.name}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/orders");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="md:hidden bg-white border-t shadow-md"
        >
          <div className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-green-600"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileOpen(false)}
              className="hover:text-green-600"
            >
              All Products
            </Link>

            <Link
              to="/orders"
              onClick={() => setMobileOpen(false)}
              className="hover:text-green-600"
            >
              My Orders
            </Link>

            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-green-600 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
