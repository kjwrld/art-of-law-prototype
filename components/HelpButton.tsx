import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Headphones } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function HelpButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! How can we help you today?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        // Add user message
        const newUserMessage = {
            id: messages.length + 1,
            text: message,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages([...messages, newUserMessage]);
        setMessage("");

        // Simulate bot response after a brief delay
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: "Thanks for your message! Our support team will get back to you shortly. In the meantime, you can check our FAQ or browse our course catalog.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Sleek Help Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 px-6 bg-aow-gold rounded-2xl shadow-xl hover:shadow-2xl backdrop-blur-sm border-4 border-aow-gold/20 z-50 flex items-center gap-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-aow-gold/25 text-aow-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
                <MessageCircle className="w-5 h-5" />
                <span className="font-luxora text-sm">Need Help?</span>
            </motion.button>

            {/* Modern Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Minimal backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Chat Window */}
                        <motion.div
                            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-aow-black/95 backdrop-blur-xl border border-aow-gold/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            initial={{
                                opacity: 0,
                                y: 100,
                                scale: 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 100,
                                scale: 0.9,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-aow-gold/10 to-aow-gold/5 border-b border-aow-gold/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-aow-gold/20 rounded-lg flex items-center justify-center">
                                        <Headphones className="w-4 h-4 text-aow-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-luxora font-semibold text-white">
                                            Support
                                        </h3>
                                        <p className="text-xs text-white/60">
                                            We're here to help
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-80">
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex gap-3 ${
                                            msg.isUser ? "flex-row-reverse" : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                msg.isUser
                                                    ? "text-black"
                                                    : "bg-white/10"
                                            }`}
                                            style={
                                                msg.isUser
                                                    ? {
                                                          backgroundColor:
                                                              "rgb(255, 234, 202)",
                                                      }
                                                    : undefined
                                            }
                                        >
                                            {msg.isUser ? (
                                                <User className="w-4 h-4" />
                                            ) : (
                                                <Headphones className="w-4 h-4 text-aow-gold" />
                                            )}
                                        </div>
                                        <div
                                            className={`flex-1 max-w-[80%] ${
                                                msg.isUser ? "text-right" : ""
                                            }`}
                                        >
                                            <div
                                                className={`inline-block px-4 py-2 rounded-2xl ${
                                                    msg.isUser
                                                        ? "text-black"
                                                        : "bg-white/10 text-white"
                                                }`}
                                                style={
                                                    msg.isUser
                                                        ? {
                                                              backgroundColor:
                                                                  "rgb(255, 234, 202)",
                                                          }
                                                        : undefined
                                                }
                                            >
                                                <p className="text-sm">
                                                    {msg.text}
                                                </p>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1 px-1">
                                                {msg.timestamp.toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-aow-gold/20 bg-aow-black/50">
                                <div className="flex gap-2">
                                    <Textarea
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="flex-1 min-h-0 h-10 resize-none bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:border-aow-gold/50 focus:ring-1 focus:ring-aow-gold/50 transition-all"
                                        rows={1}
                                    />
                                    <motion.button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-black transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                        style={{
                                            backgroundColor: message.trim()
                                                ? "rgb(255, 234, 202)"
                                                : "rgba(255, 234, 202, 0.3)",
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Send className="w-4 h-4" />
                                    </motion.button>
                                </div>
                                <p className="text-xs text-white/40 mt-2 px-1">
                                    Press Enter to send
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
