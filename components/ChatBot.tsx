'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getGeminiResponse } from '@/services/geminiService';
import { sendNotification } from '@/services/notificationService';
import { pushToGHL } from '@/services/ghlService';
import { Message } from '@/lib/types';

const WHATSAPP_URL =
  'https://wa.me/19296392284?text=Hi%2C%20I%27m%20interested%20in%20getting%20financing%20for%20a%20real%20estate%20deal.%20Can%20you%20help%3F';

const ChatBot = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm your AssetLift deal analyst. Send me your numbers (Purchase Price, Rehab, ARV) and I'll run a quick analysis for you." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactState, setContactState] = useState<'none' | 'asked_email' | 'asked_phone' | 'captured'>('none');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const lcLoadedRef = useRef(false);

  /** Find the LC bubble button inside the shadow DOM */
  const getLcBubble = () => {
    const widget = document.querySelector('chat-widget');
    if (!widget?.shadowRoot) return null;
    return widget.shadowRoot.querySelector<HTMLElement>('#lc_text-widget--btn');
  };

  /** Hide the LC launcher bubble & prompt inside the shadow DOM */
  const hideLcBubble = () => {
    const widget = document.querySelector('chat-widget');
    if (!widget?.shadowRoot) return;
    const sr = widget.shadowRoot;
    const bubble = sr.querySelector<HTMLElement>('#lc_text-widget--btn');
    const prompt = sr.querySelector<HTMLElement>('.lc_text-widget--prompt');
    if (bubble) bubble.style.display = 'none';
    if (prompt) prompt.style.display = 'none';
  };

  const openLeadConnector = () => {
    setMenuOpen(false);

    // If LC script already loaded, click the bubble to open chat
    if (lcLoadedRef.current) {
      const lcBtn = getLcBubble();
      if (lcBtn) {
        lcBtn.style.display = '';  // Unhide temporarily to click
        lcBtn.click();
        // Re-hide the bubble after chat opens
        setTimeout(hideLcBubble, 500);
      }
      return;
    }

    // Dynamically inject the LC script on first click
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '69bae59888f7834d50ca2684');
    script.async = true;
    document.body.appendChild(script);
    lcLoadedRef.current = true;

    // Wait for the widget to render inside shadow DOM, then open + hide bubble
    const checkAndOpen = setInterval(() => {
      const lcBtn = getLcBubble();
      if (lcBtn) {
        clearInterval(checkAndOpen);
        lcBtn.click();
        // Hide the bubble + prompt after the chat window opens
        setTimeout(hideLcBubble, 500);
      }
    }, 300);

    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkAndOpen), 10000);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    const updatedHistory = [...messages, userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const emailMatch = input.match(/[^@\s]+@[^@\s]+\.[^@\s]+/);
    const phoneMatch = input.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const hasEmail = Boolean(emailMatch);
    const hasPhone = Boolean(phoneMatch);

    if (hasEmail || hasPhone) {
      setContactState('captured');

      // Someone who hands over contact details in the chat is a lead, and until
      // now they existed only in a transcript email. The chat never asks for a
      // name, so the record is labelled by where it came from rather than
      // inventing one, and the message is kept as the note.
      void pushToGHL({
        name: 'Chatbot enquiry',
        email: emailMatch?.[0],
        phone: phoneMatch?.[0],
        notes: `Shared contact details in the site chatbot.\n\nTheir message: ${userMsg.text}`,
        source: 'chatbot',
      });
    }

    const result = await getGeminiResponse(updatedHistory);
    const cleanedText = result.text.replace(/\*\*/g, '');

    const modelMsg: Message = {
      role: 'model',
      text: cleanedText,
      sources: result.sources,
    };

    setMessages((prev) => [...prev, modelMsg]);
    setIsLoading(false);

    // Only advance the contact-capture state on a real analyst reply. The
    // connection-error fallback mentions "email" too, and letting it flip the
    // state turns the input placeholder into "Enter your email..." after
    // every failed answer.
    const isConnectionFallback = cleanedText.startsWith('Connection issue');
    if (!isConnectionFallback) {
      if (contactState === 'none' && (cleanedText.toLowerCase().includes('email') || cleanedText.toLowerCase().includes('address'))) {
        setContactState('asked_email');
      } else if (contactState === 'asked_email' && (cleanedText.toLowerCase().includes('phone') || cleanedText.toLowerCase().includes('cell'))) {
        setContactState('asked_phone');
      }
    }

    if (cleanedText.toLowerCase().includes('summary') || cleanedText.toLowerCase().includes('loan amount') || hasEmail || hasPhone) {
      sendNotification('chat', {
        user_input: userMsg.text,
        analysis_result: cleanedText,
        full_history: [...updatedHistory, modelMsg],
      });
    }
  };

  /* =========== Deal Analyst Chat Panel =========== */
  if (chatOpen) {
    return (
      <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-[calc(100vw-1.5rem)] max-w-[400px] h-[70vh] max-h-[550px] bg-card border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Deal Analyst</h3>
                <p className="text-xs opacity-80">Powered by AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChatOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-grow p-4 bg-background">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-current/10">
                        <p className="text-[10px] font-medium opacity-60 mb-1">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {m.sources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] underline opacity-70 hover:opacity-100"
                            >
                              {source.title.substring(0, 25)}...
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 bg-card border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={
                  contactState === 'asked_email'
                    ? 'Enter your email...'
                    : contactState === 'asked_phone'
                      ? 'Enter your phone...'
                      : 'Ex: Buy $200k, Rehab $50k...'
                }
                className="flex-grow bg-background"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* =========== Parent Bubble + Expandable Menu =========== */
  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex w-[calc(100vw-1.5rem)] max-w-sm flex-col gap-2 mb-2"
          >
            {/* Option 1: Chat with Us (LeadConnector) */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              onClick={openLeadConnector}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity cursor-pointer sm:rounded-full sm:px-5"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-semibold">Chat with Us</span>
            </motion.button>

            {/* Option 2: WhatsApp */}
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity sm:rounded-full sm:px-5"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-sm font-semibold">WhatsApp</span>
            </motion.a>

            {/* Option 3: Analyze a Deal */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => { setChatOpen(true); setMenuOpen(false); }}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity cursor-pointer sm:rounded-full sm:px-5"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">Analyze a Deal</span>
            </motion.button>

            {/* Option 4: Call Us */}
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              href="tel:+19296392284"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity sm:rounded-full sm:px-5"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-semibold">Call Us</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parent Bubble */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center transition-shadow cursor-pointer sm:h-16 sm:w-16"
        whileTap={{ scale: 0.9 }}
        aria-label="Contact options"
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
