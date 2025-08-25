import { Button } from "@/components/ui/button";
import React from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  // ✅ handle SignOut and redirect
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/booking"); // redirect to booking page after logout
    }
  };

  // ✅ handle Book Now
  const handleBookNow = () => {
    if (!user) {
      // not signed in → go to booking login/signup
      navigate("/booking");
    } else {
      // signed in → go directly to guest section
      navigate("/booking?mode=guest", { state: { openGuestForm: true } });
    }
  };

const handleBookNow2 = () => {
  navigate("/MyBooking"); // <-- path to your BookingProfile page
};

  return (
   <header className="fixed top-0 left-0 right-0 z-50 h-[100px] bg-gradient-to-b from-white/95 via-white/80 to-white/60 backdrop-blur-md shadow">
      <div className="container mx-auto px-6">
        <div className="flex items-center ">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-200 mr-8"
          >
            <img
              src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png"
              alt="Fleetory Logo"
              className="h-[6rem] w-auto"
            />
          </a>

          {/* Navigation */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium bg-transparent px-3 py-2 text-sm">
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
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/fleet"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm"
                  >
                    Our Fleet
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm"
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm"
                  >
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* ✅ Book Now */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={handleBookNow}
                    className="cursor-pointer text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm"
                  >
                    Book Now
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center">
                {/* Left: Profile */}
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-r-none"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4" />
                  {user?.user_metadata?.full_name || "My Profile"}
                </Button>

                {/* Right: Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-l-none px-2">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleBookNow2}>
                      Booking Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 " />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild variant="outline">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
