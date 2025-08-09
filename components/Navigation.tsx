import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    User,
    Settings,
    LogOut,
    Bell,
    BookOpen,
    Trophy,
    Sword,
    ChevronDown,
    Menu,
    Search,
} from "lucide-react";
import { color, motion } from "framer-motion";
import logoImage from "../src/assets/logo.png";

interface NavigationProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    onMenuToggle?: () => void;
}

export function Navigation({
    currentPage,
    onPageChange,
    onMenuToggle,
}: NavigationProps) {
    const navigationItems = [
        { name: "My Courses", icon: BookOpen, page: "my-courses" },
        { name: "Practice Area", icon: Sword, page: "practice-area" },
        { name: "CLE Tracker", icon: Trophy, page: "cle-tracker" },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--aow-black)]/95 backdrop-blur-xl border-b border-[var(--aow-gold)]"
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Centered container with constrained width */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 py-4">
                    <div className="flex items-center space-x-8">
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onMenuToggle}
                            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 md:hidden mr-4"
                            aria-label="Open navigation menu"
                            aria-expanded="false"
                        >
                            <Menu className="h-5 w-5 text-white" />
                        </Button>

                        {/* Logo & Title - All in one line, prevent squishing */}
                        <button
                            onClick={() => onPageChange("home")}
                            className="relative flex items-center space-x-1.5 cursor-pointer group min-w-fit pb-2"
                            style={{ marginLeft: "0" }}
                            aria-label="Go to homepage - Art of Law"
                        >
                            <div
                                className="h-7 w-7 flex-shrink-0"
                                style={{
                                    overflow: "visible",
                                }}
                            >
                                <img
                                    src={logoImage}
                                    alt="Art of Law Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h1
                                className="font-['Luxora_Grotesk',_sans-serif] text-white text-lg font-medium tracking-wide whitespace-nowrap"
                                style={{
                                    marginLeft: ".6rem",
                                }}
                            >
                                ART OF LAW
                            </h1>
                            {/* Gold Underline for Homepage */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-[var(--aow-gold)] rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                    width: currentPage === "home" ? "100%" : 0,
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{
                                    marginLeft: "0",
                                }}
                            />
                        </button>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex items-center ml-8">
                            <div className="relative w-96 lg:w-[400px] xl:w-[540px]">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                                <Input
                                    type="text"
                                    placeholder="Search instructors, classes, and more"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:bg-white/15 focus:border-[var(--aow-gold)]/50 transition-all duration-200 text-sm"
                                    aria-label="Search for instructors, courses, and legal content"
                                    role="searchbox"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - All the way to the right */}
                    <div className="flex items-center space-x-4 ml-8">
                        {/* Desktop Navigation Items */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {navigationItems.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => onPageChange(item.page)}
                                    className={`group relative flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap ${
                                        currentPage === item.page
                                            ? "text-white"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                    aria-label={`Navigate to ${item.name}`}
                                    aria-current={currentPage === item.page ? "page" : undefined}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <item.icon
                                        className={`h-4 w-4 transition-colors duration-300 ${
                                            currentPage === item.page
                                                ? "text-aow-gold"
                                                : ""
                                        }`}
                                    />
                                    <span>{item.name}</span>
                                    {/* Gold Underline for Active State */}
                                    <motion.div
                                        className="absolute bottom-0 left-1/2 h-0.5 bg-aow-gold rounded-full"
                                        initial={{ width: 0, x: "-50%" }}
                                        animate={{
                                            width:
                                                currentPage === item.page
                                                    ? "80%"
                                                    : 0,
                                            x: "-50%",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                </motion.button>
                            ))}
                        </div>

                        {/* Tablet Navigation - Icon Only */}
                        <div className="hidden md:flex lg:hidden items-center space-x-4">
                            {navigationItems.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => onPageChange(item.page)}
                                    className={`relative flex flex-col items-center py-2 px-3 transition-all duration-300 rounded-lg ${
                                        currentPage === item.page
                                            ? "text-white"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <item.icon
                                        className={`h-5 w-5 transition-colors duration-300 ${
                                            currentPage === item.page
                                                ? "text-aow-gold"
                                                : ""
                                        }`}
                                    />
                                    {/* Gold indicator dot */}
                                    <motion.div
                                        className="absolute bottom-0 w-1 h-1 bg-aow-gold rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity:
                                                currentPage === item.page
                                                    ? 1
                                                    : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                </motion.button>
                            ))}
                        </div>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-3 h-11 px-4 rounded-xl bg-gradient-to-r from-white/8 to-white/4 hover:from-white/12 hover:to-white/8 hover:shadow-lg hover:shadow-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 group relative"
                                    >
                                        <div className="relative h-7 w-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                            <User className="h-4 w-4 text-white" />
                                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-400 border border-aow-black rounded-full"></div>
                                        </div>
                                        <div className="hidden xl:flex flex-col items-start">
                                            <span className="text-white text-sm font-medium">
                                                Eric Jarrett
                                            </span>
                                            <span className="text-white/60 text-xs">
                                                Free Trial
                                            </span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-white/60 group-hover:text-white transition-colors duration-200 hidden lg:block" />
                                        {/* Notification Indicator */}
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-aow-gold text-aow-black border-0 flex items-center justify-center font-luxora"
                                        >
                                            3
                                        </Badge>
                                    </Button>
                                </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-64 bg-aow-black/95 backdrop-blur-xl border border-aow-gold shadow-2xl"
                                align="end"
                                sideOffset={8}
                            >
                                <div className="px-3 py-3 border-b border-aow-gold">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">
                                                Eric Jarrett
                                            </div>
                                            <div className="text-white/60 text-sm">
                                                eric@jarrettlaw.com
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Navigation Menu Items */}
                                <div className="md:hidden py-2 border-b border-aow-gold">
                                    {navigationItems.map((item) => (
                                        <DropdownMenuItem
                                            key={item.name}
                                            onClick={() =>
                                                onPageChange(item.page)
                                            }
                                            className={`text-white hover:bg-white/10 hover:text-white transition-colors duration-200 ${
                                                currentPage === item.page
                                                    ? "bg-white/15 text-white"
                                                    : ""
                                            }`}
                                        >
                                            <item.icon className="mr-3 h-4 w-4" />
                                            <span>{item.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </div>

                                {/* Notifications Section */}
                                <div className="py-2 border-b border-aow-gold">
                                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white transition-colors duration-200">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <Bell className="mr-3 h-4 w-4" />
                                                <span>Notifications</span>
                                            </div>
                                            <Badge
                                                variant="destructive"
                                                className="h-5 w-5 p-0 text-xs bg-aow-gold text-aow-black border-0 flex items-center justify-center font-luxora"
                                            >
                                                3
                                            </Badge>
                                        </div>
                                    </DropdownMenuItem>
                                </div>

                                <div className="py-2">
                                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white transition-colors duration-200">
                                        <User className="mr-3 h-4 w-4" />
                                        <span>Profile & Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white transition-colors duration-200">
                                        <Trophy className="mr-3 h-4 w-4" />
                                        <span>My Progress</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white transition-colors duration-200">
                                        <Settings className="mr-3 h-4 w-4" />
                                        <span>Preferences</span>
                                    </DropdownMenuItem>
                                </div>

                                <DropdownMenuSeparator className="bg-aow-gold" />

                                <div className="py-2">
                                    <DropdownMenuItem className="text-white hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200">
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden px-0 pb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                            type="text"
                            placeholder="Search classes, topics..."
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 hover:bg-white/15 focus:bg-white/15 focus:border-[var(--aow-gold)]/50 transition-all duration-200 text-sm"
                        />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
