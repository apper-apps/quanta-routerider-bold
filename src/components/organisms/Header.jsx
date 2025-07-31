import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const navItems = [
    { name: "Search", href: "/", icon: "Search" },
    { name: "My Bookings", href: "/bookings", icon: "Ticket" },
    { name: "Help", href: "/help", icon: "HelpCircle" }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <ApperIcon name="Bus" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-display">
                RouteRider
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Bus Booking Made Easy</p>
            </div>
          </Link>

{/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary border border-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-sm text-gray-600">
                Welcome, {user?.firstName || 'User'}
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                icon="LogOut"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

{/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary border border-primary/20"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <ApperIcon name={item.icon} size={20} />
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="px-4 py-2 text-sm text-gray-600">
                  Welcome, {user?.firstName || 'User'}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-gray-50 w-full"
                >
                  <ApperIcon name="LogOut" size={20} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;