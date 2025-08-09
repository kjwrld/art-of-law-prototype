import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Sparkles,
    Bot,
    Globe,
    Brain,
    Scale,
    Users,
    Briefcase,
    Wrench,
    Gavel,
    Sprout,
    Eye,
    Target,
    Menu,
    X,
    Sword,
    Lock,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
    currentCategory?: string;
    onCategoryChange?: (category: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
    onNavigate?: (page: string) => void;
    currentPage?: string;
}

const sidebarItems = [
    {
        id: "new-for-you",
        name: "New & For You",
        icon: Sparkles,
        navigateTo: "home",
        available: true,
    },
    {
        id: "learning-tracks",
        name: "Learning Tracks",
        icon: Sprout,
        navigateTo: "learning-tracks",
        available: true,
    },
    {
        id: "practice-areas",
        name: "Practice Area",
        icon: Sword,
        navigateTo: "practice-area",
        available: true,
    },
    {
        id: "ai-legal-tech",
        name: "AI & Legal Tech",
        icon: Bot,
        available: false,
    },
    {
        id: "crypto-web3",
        name: "Crypto & Web3",
        icon: Globe,
        available: false,
    },
    {
        id: "wellness-performance",
        name: "Attorney Wellness",
        icon: Brain,
        available: false,
    },
    {
        id: "ethics-conduct",
        name: "Ethics & Conduct",
        icon: Scale,
        available: false,
    },
    {
        id: "dei-leadership",
        name: "DEI & Leadership",
        icon: Users,
        available: false,
    },
    {
        id: "business-career",
        name: "Business Development",
        icon: Briefcase,
        available: false,
    },
    {
        id: "legal-skills",
        name: "Legal Skills & Craft",
        icon: Wrench,
        available: false,
    },
    {
        id: "litigation-advocacy",
        name: "Litigation & Advocacy",
        icon: Gavel,
        available: false,
    },
    {
        id: "scotus-watch",
        name: "SCOTUS Watch",
        icon: Eye,
        available: false,
    },
];

export function Sidebar({
    currentCategory = "new-for-you",
    onCategoryChange,
    isOpen = false,
    onClose,
    onNavigate,
    currentPage = "home",
}: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Determine if an item is active - simplified logic
    const isItemActive = (item: any) => {
        if (item.navigateTo) {
            return currentPage === item.navigateTo;
        }
        return currentCategory === item.id && currentPage === "home";
    };

    const handleItemClick = (item: any) => {
        if (!item.available) {
            return; // Do nothing for unavailable items
        }

        if (item.navigateTo) {
            onNavigate?.(item.navigateTo);
            if (item.navigateTo === "home") {
                onCategoryChange?.("new-for-you");
            }
        } else {
            onCategoryChange?.(item.id);
            onNavigate?.("home");
        }
    };

    return (
        <>
            {/* Desktop Sidebar - Always visible on lg+ */}
            <motion.aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-20 lg:bottom-0 lg:w-60 lg:bg-[#0b0b0b] lg:border-r lg:border-[var(--aow-gold)] lg:z-40">
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Desktop Items */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide py-6">
                        {sidebarItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                onHoverStart={() => setHoveredItem(item.id)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className={`w-full flex items-center px-6 py-4 mx-3 my-6 pr-12 transition-all duration-200 rounded-xl group relative ${
                                    isItemActive(item)
                                        ? "bg-[#242424] text-white"
                                        : item.available
                                        ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                        : "text-white/40 cursor-not-allowed"
                                }`}
                                whileTap={item.available ? { scale: 0.98 } : {}}
                            >
                                <item.icon
                                    className={`h-5 w-5 flex-shrink-0 ${
                                        isItemActive(item)
                                            ? "text-aow-gold"
                                            : item.available
                                            ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                            : "text-white/40 cursor-not-allowed"
                                    }`}
                                    style={{ minWidth: "20px" }}
                                />
                                <div className="ml-4 flex-1 text-left">
                                    <div className="font-medium text-sm">
                                        {item.name}
                                    </div>
                                </div>

                                {/* Lock icon for unavailable items on hover */}
                                {!item.available && hoveredItem === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-6"
                                    >
                                        <Lock className="h-4 w-4 text-white/60" />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.aside>

            {/* Tablet Sidebar - Collapsed with hover expand */}
            <motion.aside
                className="hidden md:flex lg:hidden md:flex-col md:fixed md:left-0 md:top-20 md:bottom-0 md:bg-[#0b0b0b] md:border-r md:border-[var(--aow-gold)] md:z-40 md:transition-all md:duration-300"
                style={{
                    width: isHovered ? "250px" : "68px",
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Tablet Items */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide py-6">
                        {sidebarItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                onHoverStart={() => setHoveredItem(item.id)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className={`w-full flex items-center px-4 py-4 mx-2 my-6 pr-6 transition-all duration-200 rounded-xl relative group ${
                                    isItemActive(item)
                                        ? "bg-[#242424] text-white"
                                        : item.available
                                        ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                        : "text-white/40 cursor-not-allowed"
                                }`}
                                whileTap={item.available ? { scale: 0.98 } : {}}
                            >
                                <item.icon
                                    className={`h-5 w-5 flex-shrink-0 ${
                                        isItemActive(item)
                                            ? "text-aow-gold"
                                            : item.available
                                            ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                            : "text-white/40 cursor-not-allowed"
                                    }`}
                                    style={{ minWidth: "20px" }}
                                />
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{
                                                opacity: 1,
                                                width: "auto",
                                            }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-4 whitespace-nowrap overflow-hidden flex items-center"
                                        >
                                            <span className="font-medium text-sm">
                                                {item.name}
                                            </span>
                                            {/* Lock icon for unavailable items */}
                                            {!item.available &&
                                                hoveredItem === item.id && (
                                                    <Lock className="h-4 w-4 text-white/60 ml-2 absolute right-6" />
                                                    // <Lock className="h-4 w-4 text-white/60 ml-2" />
                                                )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Sidebar - Push Animation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            onClick={onClose}
                        />

                        {/* Mobile Sidebar */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-[#0b0b0b] border-r border-aow-gold z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-end p-6 border-b border-aow-gold">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onClose}
                                        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white"
                                    >
                                        <X className="h-4 w-4 text-white" />
                                    </Button>
                                </div>

                                {/* Mobile Items */}
                                <div className="flex-1 overflow-y-auto scrollbar-hide py-3">
                                    {sidebarItems.map((item) => (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => {
                                                handleItemClick(item);
                                                if (item.available) {
                                                    onClose?.();
                                                }
                                            }}
                                            onHoverStart={() =>
                                                setHoveredItem(item.id)
                                            }
                                            onHoverEnd={() =>
                                                setHoveredItem(null)
                                            }
                                            className={`w-full flex items-center px-6 py-4 mx-4 my-6 pr-12 transition-all duration-200 rounded-xl relative ${
                                                isItemActive(item)
                                                    ? "bg-[#242424] text-white"
                                                    : item.available
                                                    ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                                    : "text-white/40 cursor-not-allowed"
                                            }`}
                                            whileTap={
                                                item.available
                                                    ? { scale: 0.98 }
                                                    : {}
                                            }
                                        >
                                            <item.icon
                                                className={`h-6 w-6 flex-shrink-0 ${
                                                    isItemActive(item)
                                                        ? "text-aow-gold"
                                                        : item.available
                                                        ? "text-white/80 hover:text-white hover:bg-[#242424]"
                                                        : "text-white/40 cursor-not-allowed"
                                                }`}
                                                style={{ minWidth: "24px" }}
                                            />
                                            <div className="ml-4 flex-1 text-left">
                                                <div className="font-medium text-base">
                                                    {item.name}
                                                </div>
                                            </div>

                                            {/* Lock icon for unavailable items on hover */}
                                            {!item.available &&
                                                hoveredItem === item.id && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                        className="absolute right-6"
                                                    >
                                                        <Lock className="h-4 w-4 text-white/60" />
                                                    </motion.div>
                                                )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
