import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);

  // ✅ handle SignOut and redirect
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/booking");
      setMobileMenuOpen(false); // Close mobile menu after sign out
    }
  };

  // ✅ handle Book Now
  const handleBookNow = () => {
    if (!user) {
      navigate("/booking");
    } else {
      navigate("/booking?mode=guest", { state: { openGuestForm: true } });
    }
    setMobileMenuOpen(false); // Close mobile menu
  };

  const handleBookNow2 = () => {
    navigate("/MyBooking");
    setMobileMenuOpen(false); // Close mobile menu
  };

  // Mobile navigation items
  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[100px] bg-gradient-to-b from-white/95 via-white/80 to-white/60 backdrop-blur-md shadow">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png"
              alt="Fleetory Logo"
              className="h-[10rem] w-auto"
            />
          </a>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-md"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium bg-transparent px-3 py-2 text-md">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-4 bg-white shadow-lg border rounded-lg space-y-3">
                      <NavigationMenuLink
                        href="/services/same-day-delivery"
                        className="block p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-semibold text-logistics-blue">
                          Same Day Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Guaranteed same day arrival
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/services/timed-delivery"
                        className="block p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-semibold text-logistics-blue">
                          Timed Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Scheduled pickup and guaranteed time slots
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/services/heavy-haulage"
                        className="block p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="font-semibold text-logistics-blue">
                          Heavy Haulage
                        </div>
                        <div className="text-sm text-gray-600">
                          Oversized and specialist deliveries
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Industries Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium bg-transparent px-3 py-2 text-md">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-96 p-4 bg-white shadow-lg border rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <NavigationMenuLink
                          href="/industries/healthcare"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Healthcare & Medical
                          </div>
                          <div className="text-xs text-gray-600">
                            Medical supplies & pharmaceuticals
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/industries/legal-services"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Legal Services
                          </div>
                          <div className="text-xs text-gray-600">
                            Court filings & documents
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/industries/construction"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Construction & Trade
                          </div>
                          <div className="text-xs text-gray-600">
                            Materials & equipment
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/industries/retail"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Retail & E-commerce
                          </div>
                          <div className="text-xs text-gray-600">
                            Last-mile delivery
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/industries/manufacturing"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Manufacturing
                          </div>
                          <div className="text-xs text-gray-600">
                            Just-in-time logistics
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/industries/residential"
                          className="block p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="font-semibold text-logistics-blue">
                            Residential
                          </div>
                          <div className="text-xs text-gray-600">
                            House moves & furniture
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/fleet"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-md"
                  >
                    Our Fleet
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-md"
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-md"
                  >
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* ✅ Book Now */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={handleBookNow}
                    className="cursor-pointer text-white hover:text-white bg-logistics-orange hover:bg-logistics-orange-light transition-colors duration-200 font-medium px-4 py-2 rounded-lg text-md"
                  >
                    Book Now
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-logistics-blue text-logistics-blue hover:bg-logistics-blue hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={handleBookNow2}
                    className="cursor-pointer"
                  >
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/booking")}
                className="bg-logistics-blue hover:bg-logistics-blue-light text-white font-semibold px-6"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col space-y-4">
                {/* Mobile Navigation Links */}
                <button
                  onClick={() => handleMobileNavigation("/")}
                  className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground"
                >
                  Home
                </button>
                
                {/* Services Accordion */}
                <div>
                  <button
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground flex items-center justify-between"
                  >
                    Services
                    <ChevronRight className={`h-4 w-4 transition-transform ${servicesExpanded ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {servicesExpanded && (
                    <div className="ml-4 mt-2 space-y-2">
                      <button
                        onClick={() => handleMobileNavigation("/services/same-day-delivery")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Same Day Delivery</div>
                        <div className="text-xs text-gray-600">Guaranteed same day arrival</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/services/timed-delivery")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Timed Delivery</div>
                        <div className="text-xs text-gray-600">Scheduled pickup and guaranteed time slots</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/services/heavy-haulage")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Heavy Haulage</div>
                        <div className="text-xs text-gray-600">Oversized and specialist deliveries</div>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Industries Accordion */}
                <div>
                  <button
                    onClick={() => setIndustriesExpanded(!industriesExpanded)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground flex items-center justify-between"
                  >
                    Industries
                    <ChevronRight className={`h-4 w-4 transition-transform ${industriesExpanded ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {industriesExpanded && (
                    <div className="ml-4 mt-2 space-y-2">
                      <button
                        onClick={() => handleMobileNavigation("/industries/healthcare")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Healthcare & Medical</div>
                        <div className="text-xs text-gray-600">Medical supplies & pharmaceuticals</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/industries/legal-services")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Legal Services</div>
                        <div className="text-xs text-gray-600">Court filings & documents</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/industries/construction")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Construction & Trade</div>
                        <div className="text-xs text-gray-600">Materials & equipment</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/industries/retail")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Retail & E-commerce</div>
                        <div className="text-xs text-gray-600">Last-mile delivery</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/industries/manufacturing")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Manufacturing</div>
                        <div className="text-xs text-gray-600">Just-in-time logistics</div>
                      </button>
                      <button
                        onClick={() => handleMobileNavigation("/industries/residential")}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <div className="font-medium text-logistics-blue">Residential</div>
                        <div className="text-xs text-gray-600">House moves & furniture</div>
                      </button>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleMobileNavigation("/fleet")}
                  className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground"
                >
                  Our Fleet
                </button>
                
                <button
                  onClick={() => handleMobileNavigation("/about")}
                  className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground"
                >
                  About Us
                </button>
                
                <button
                  onClick={() => handleMobileNavigation("/contact")}
                  className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground"
                >
                  Contact Us
                </button>
                
                <div className="border-t pt-4">
                  <Button
                    onClick={handleBookNow}
                    className="w-full bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold"
                  >
                    Book Now
                  </Button>
                </div>
                
                {/* Mobile Auth Section */}
                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-600">
                        Signed in as: <span className="font-medium">{user.email}</span>
                      </div>
                      <button
                        onClick={handleBookNow2}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-foreground"
                      >
                        My Bookings
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/booking");
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;