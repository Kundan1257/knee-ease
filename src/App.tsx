/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
 import PremiumPage from "./pages/PremiumPage";
import HomeSection from "./sections/HomeSection";
import React, { useState, useEffect, useRef, Component, ErrorInfo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
// --- Emojis (Temporary Replacement for Icons) ---
const HomeIcon = (props: any) => <span>🏠</span>;
const Activity = (props: any) => <span>🏃</span>;
const Utensils = (props: any) => <span>🍴</span>;
const HelpCircle = (props: any) => <span>❓</span>;
const ChevronRight = (props: any) => <span>→</span>;
const ChevronLeft = (props: any) => <span>←</span>;
const Send = (props: any) => <span>↗</span>;
const Lock = (props: any) => <span>🔒</span>;
const MessageCircle = (props: any) => <span>💬</span>;
const CheckCircle2 = (props: any) => <span>✔</span>;
const AlertCircle = (props: any) => <span>⚠</span>;
const ShieldCheck = (props: any) => <span>🛡</span>;
const Shield = (props: any) => <span>🛡</span>;
const Pause = (props: any) => <span>⏸</span>;
const Play = (props: any) => <span>▶</span>;
const Square = (props: any) => <span>⏹</span>;
const Droplets = (props: any) => <span>💧</span>;
const Zap = (props: any) => <span>⚡</span>;
const Leaf = (props: any) => <span>🍃</span>;
const Coffee = (props: any) => <span>☕</span>;
const Egg = (props: any) => <span>🥚</span>;
const X = (props: any) => <span>✕</span>;
const Info = (props: any) => <span>ℹ</span>;
const Star = (props: any) => <span>⭐</span>;
const Sparkles = (props: any) => <span>⭐</span>;
const ClipboardList = (props: any) => <span>📋</span>;
const ChevronDown = (props: any) => <span>↓</span>;
const ArrowRight = (props: any) => <span>→</span>;

import { cn } from './lib/utils';
import { EXERCISES, RELAXATIONS, RECIPES, TEAS } from './constants';
import { getKneeCareTip, generateKneeContent } from './services/geminiService';

// --- Context ---

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://thriving-rebirth.up.railway.app";

const AuthContext = React.createContext<{
  userId: string | null;
  isPremium: boolean;
  setUserId: (id: string) => void;
  setPremium: (value: boolean) => void;
}>({
  userId: null,
  isPremium: false,
  setUserId: () => {},
  setPremium: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // STATE
  const [userId, setUserIdState] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const [isPremium, setIsPremiumState] = useState<boolean>(
    localStorage.getItem("isPremium") === "true"
  );

  const [isLoading, setIsLoading] = useState(true);

  // FUNCTIONS
  const setUserId = (id: string) => {
    setUserIdState(id);
    localStorage.setItem("userId", id);
  };

  const setPremium = (value: boolean) => {
    setIsPremiumState(value);
    localStorage.setItem("isPremium", String(value));
  };

  // INIT AUTH (CLEAN VERSION - NO JWT)
  useEffect(() => {
    const initAuth = async () => {
      try {
        let storedUserId = localStorage.getItem("userId");

        if (!storedUserId) {
          storedUserId = "user_" + Date.now();
          localStorage.setItem("userId", storedUserId);
        }

        setUserIdState(storedUserId);

        // OPTIONAL: fetch premium status from backend
        const res = await fetch(`${API_URL}/user/${storedUserId}`);

let data = null;

try {
  data = await res.json();
} catch (err) {
  console.warn("Invalid JSON from /user:", err);
}

if (res.ok && data) {
  setIsPremiumState(data?.isPremium || false);
} else {
  setIsPremiumState(false);
}

      } catch (e) {
        console.error("Auth initialization failed:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // LOADING SAFE GUARD
  if (isLoading) return null;

  // PROVIDER
  return (
    <AuthContext.Provider
      value={{
        userId,
        isPremium,
        setUserId,
        setPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};




// --- Components ---

const KneeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <span className={className} style={{ fontSize: size }}>🦵</span>
);

const AppLogo = ({ size = "small" }: { size?: "small" | "large" }) => {
  const dimensions = size === "large" ? "w-24 h-24" : "w-10 h-10";
  const iconSize = size === "large" ? 48 : 24;

  return (
    <div className={cn(
      dimensions,
      "bg-primary rounded-xl flex items-center justify-center shadow-sm"
    )}>
      <KneeIcon size={iconSize} />
    </div>
  );
};

const AppLogoLarge = () => <AppLogo size="large" />;

const navItems = [
  { path: '/', icon: HomeIcon, label: 'Home' },
  { path: '/exercises', icon: Activity, label: 'Ex' },
  { path: '/diet', icon: Utensils, label: 'Diet' },
  { path: '/help', icon: HelpCircle, label: 'Help' },
  { path: '/about', icon: Info, label: 'About' },
];

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, logout } = React.useContext(AuthContext);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border/30 transition-all duration-300 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-0 md:px-6">
        <div className="flex justify-between items-center h-14 md:h-16 nav-container">
          <div className="flex items-center gap-2 py-4 md:py-0 logo-container">
            <AppLogo />
            <span className="font-bold text-primary tracking-tight">Knee-Care</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end">
            {/* Navigation Items (Scrollable on mobile, fixed on desktop) */}
            <div className="nav-scroll-wrapper flex-1 md:flex-none">
              <nav className="flex items-center gap-4 md:gap-8 nav-items-flex">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center justify-center transition-all duration-300 relative group mobile-nav-link",
                      location.pathname === item.path ? "text-accent active" : "text-gray-400 hover:text-primary"
                    )}
                  >
                    <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                    <span className="text-[10px] mt-1.5 font-bold uppercase tracking-widest">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute -bottom-2 w-1 h-1 bg-accent rounded-full hidden md:block" 
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
        </div>
      </div>
    </div>
  </header>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate('/');
        }
      }}
      className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-bold text-sm group"
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 group-hover:border-accent/50 transition-all">
        <ChevronLeft size={20} />
      </div>
      <span>Back</span>
    </motion.button>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="pb-8 pt-8 px-4 max-w-4xl mx-auto"
  >
    <BackButton />
    {children}
  </motion.div>
));

const Section: React.FC<{ title: string; children: React.ReactNode }> = React.memo(({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
      <div className="w-1.5 h-8 bg-accent rounded-full" />
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </section>
));

const Card: React.FC<{ children: React.ReactNode; className?: string }> = React.memo(({ children, className }) => (
  <div className={cn("bg-white p-6 rounded-3xl shadow-sm border border-border/50", className)}>
    {children}
  </div>
));

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    (this as any).state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("UI Error caught:", error, errorInfo);
  }
  render() {
    const state = (this as any).state;
    const props = (this as any).props;
    
    if (state.hasError) {
      return (
        <div className="min-h-screen bg-muted flex items-center justify-center p-8 text-center border-t-4 border-red-500">
          <Card className="max-w-md w-full p-10 space-y-6 shadow-2xl">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
            <p className="text-gray-500 text-sm leading-relaxed">The application encountered a temporary error. We have logged the issue and are working to fix it.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-secondary py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Reload Application
            </button>
          </Card>
        </div>
      );
    }
    return props.children;
  }
}

const PersonalizedPlanSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [formData, setFormData] = useState({
    painLevel: 'Low',
    activityType: 'Walking',
    primaryIssue: 'Pain',
    ageGroup: '25–40',
    weight: '60–80 kg'
  });

  const generatePlan = React.useCallback(async () => {
    setLoading(true);
    const systemPrompt = `You are a specialized knee-care assistant. Create a structured "Personalized Knee Support Plan" based on the user's inputs. 
    The plan MUST have these exact sections:
    A. Daily Support Strategy
    B. Movement Guidance
    C. Recovery Tips
    D. Progress Advice

    RULES:
    - DO NOT mention the brand name "Knee-Lace".
    - Avoid medical claims; state that this is for informational purposes.
    - Format output in clear sections.
    - Be supportive and practical.
    - ADJUSTMENTS:
      * For higher age (40-60, 60+), recommend gentler, low-impact exercises.
      * For higher weight (80+ kg), recommend low-impact activities and slower progression.`;

    const userPrompt = `
    Pain Level: ${formData.painLevel}
    Activity Type: ${formData.activityType}
    Primary Issue: ${formData.primaryIssue}
    Age Group: ${formData.ageGroup}
    Weight: ${formData.weight}
    `;

    const result = await generateKneeContent(systemPrompt, userPrompt);
    setPlan(result);
    setLoading(false);
  }, [formData]);

  const SelectGroup = ({ label, options, value, name }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-primary/60">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
          className="w-full bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl px-5 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <Section title="Personalized Knee Support Plan">
      <Card className="border-none shadow-xl overflow-hidden bg-white/70 backdrop-blur-sm relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ClipboardList size={140} />
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">Personalized Knee Support Plan</h3>
              <p className="text-sm text-gray-500 font-medium">Tailored support guidance based on activity, recovery, and daily movement.</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-3xl">
            Learn how to reduce strain, improve stability, and support your knees with simple daily habits. This free guide uses insights to provide you with the best strategy for your lifestyle.
          </p>

          {/* Plan Configuration and Display */}
          {!plan && !loading && !started ? (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="bg-primary text-secondary px-10 py-5 rounded-3xl font-bold flex items-center gap-3 shadow-xl hover:bg-primary/90 transition-all font-bold"
              >
                Create Your Free Plan
              </motion.button>
            </div>
          ) : (
            <div className="space-y-10">
              {!plan ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-8 rounded-[32px]">
                    <SelectGroup 
                      label="Pain Level" 
                      name="painLevel"
                      value={formData.painLevel}
                      options={['Low', 'Moderate', 'Severe']} 
                    />
                    <SelectGroup 
                      label="Activity Type" 
                      name="activityType"
                      value={formData.activityType}
                      options={['Walking', 'Running', 'Sports', 'Sedentary']} 
                    />
                    <SelectGroup 
                      label="Primary Issue" 
                      name="primaryIssue"
                      value={formData.primaryIssue}
                      options={['Pain', 'Weakness', 'Recovery', 'Injury']} 
                    />
                    <SelectGroup 
                      label="Age Group" 
                      name="ageGroup"
                      value={formData.ageGroup}
                      options={['Under 25', '25–40', '40–60', '60+']} 
                    />
                    <SelectGroup 
                      label="Weight" 
                      name="weight"
                      value={formData.weight}
                      options={['Under 60 kg', '60–80 kg', '80+ kg']} 
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generatePlan}
                    disabled={loading}
                    className="w-full bg-primary text-secondary py-5 rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? "Analyzing..." : "Generate My Plan"}
                    {!loading && <ArrowRight size={20} />}
                  </motion.button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-primary">Your Personalized Plan</h4>
                    <button 
                      onClick={() => { setPlan(null); setStarted(false); }}
                      className="text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors bg-muted rounded-full px-5 py-2"
                    >
                      New Plan
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-muted/30 border-none p-6 space-y-3">
                      <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-medium">
                        {plan}
                      </div>
                    </Card>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <p className="text-xs text-gray-400 font-medium">This plan is adjusted based on your age and lifestyle.</p>
                    <div className="flex items-start gap-3 bg-amber-50 p-6 rounded-2xl border border-amber-100 max-w-2xl">
                      <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        This plan is based on general guidance and does not replace professional medical advice. Always listen to your body and consult a specialist for severe or persistent pain.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Section>
  );
};

const KneeSupportSection = () => (
  <Card className="mt-8 bg-accent/5 border-accent/20 border shadow-md">
    <div className="flex flex-col items-center text-center p-2">
      <p className="text-sm text-gray-700 mb-6 leading-relaxed max-w-md">
        “If your knee pain increases during movement or exercise, proper support can help reduce strain and improve recovery.”
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          const element = document.getElementById('knee-support-guide');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="w-full md:w-auto bg-accent text-primary py-4 px-8 rounded-2xl font-bold shadow-lg hover:bg-accent/90 transition-all text-sm md:text-base"
      >
        Reduce Knee Pain with the Right Support
      </motion.button>

      {/* Guidance Section */}
      <div className="mt-8 w-full max-w-sm bg-[#f3fdf6] p-6 rounded-3xl border border-green-100/50">
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Not sure which knee support is right for you? Get personalized guidance.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const element = document.getElementById('help-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              // Fallback if element not on page (e.g. if we need to navigate first)
              window.location.href = '/help#help-section';
            }
          }}
          className="bg-[#10b981] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#0da371] transition-colors"
        >
          Still Confused? Get Help
        </motion.button>
      </div>
      <p className="text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-widest">
        Used for sports, recovery, and daily comfort
      </p>
    </div>
  </Card>
);

const KneeSupportGuide = () => {
  const navigate = useNavigate();
  
  return (
    <Section title="Knee Support Guide">
      <div id="knee-support-guide" className="scroll-mt-24">
        <Card className="border-none shadow-xl bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="bg-primary/5 p-8 border-b border-primary/10 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Find the Right Knee Support for Your Condition</h2>
            <p className="text-sm text-gray-500">Choosing the correct support is crucial for effective recovery and comfort.</p>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Daily Support */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg">1. Daily Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Lightweight and breathable
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Suitable for mild discomfort
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Easy to wear under clothing
                </li>
              </ul>
            </div>

            {/* Sports Recovery */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                <Activity size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg">2. Sports Recovery</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Improved knee stability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Support during movement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Designed for active lifestyles
                </li>
              </ul>
            </div>

            {/* Severe Pain / Injury Support */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg">3. Severe Pain / Injury Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Maximum support and stability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Useful for injury recovery
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Adjustable and structured design
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-muted/30 border-t border-border/50 text-center">
            <p className="text-xs text-gray-500 italic mb-8 italic">
              "Note: Always consult a healthcare professional for proper diagnosis and treatment advice. This guide is for informational purposes only."
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('help-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/help');
                  // After navigation, we might need a longer delay or a hash param
                  setTimeout(() => {
                    document.getElementById('help-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="bg-primary text-secondary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 mx-auto shadow-lg hover:bg-primary/90 transition-all"
            >
              <MessageCircle size={20} />
              Ask AI for Personalized Guidance
            </motion.button>
          </div>
        </Card>
      </div>
    </Section>
  );
};

// --- Pages ---

const HomePage = React.memo(() => (
  <PageWrapper>
    <div className="flex justify-center mb-8">
      <div className="w-24 h-24 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-4 border-primary/10 overflow-hidden">
        <AppLogoLarge />
      </div>
    </div>
    <header className="mb-12 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary mb-3 tracking-tight"
      >
        Knee-Care
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-lg font-medium"
      >
        Simple steps for stronger, healthier knees.
      </motion.p>
    </header>
    <Link to="/premium">
  <button className="w-full bg-emerald-500 text-white py-2 rounded mb-8">
    Unlock Premium Access
  </button>
</Link>

    <Card className="mb-10 bg-white/70 backdrop-blur-sm shadow-xl border-none overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Activity size={28} />
          </div>
          <h2 className="text-2xl font-bold text-primary">Knee-Lace – Your Natural Knee Support 🦵</h2>
        </div>
        
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Your knees support every step you take — walking, running, playing sports, or doing daily activities. 
            Without proper support, knees can become weak, unstable, or painful over time.
          </p>
          <p className="font-medium text-primary/80">
            Knee-Lace acts as a natural support system for your knees.
          </p>
          <p>
            It provides balanced support around the entire knee, helping you move with stability and confidence. 
            Whether running, exercising, or performing daily tasks, Knee-Lace reduces stress on your knee joints and helps prevent discomfort or injury.
          </p>
        </div>

        <div className="mt-8 bg-muted/50 p-6 rounded-2xl border border-border/50">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-accent" />
            Use Knee-Lace with Knee-Care to:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Support knees during physical activity",
              "Help manage mild knee discomfort",
              "Prevent strain and unnecessary pressure",
              "Provide everyday protection for healthy knees"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <Section title="Running Safely">
        <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">1</div>
              <span>Choose soft surfaces like grass or trails.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">2</div>
              <span>Ensure your shoes have proper cushioning and replace them every 300–500 miles.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">3</div>
              <span>Focus on shorter strides and land softly on your mid-foot.</span>
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="Sports Precautions">
        <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">1</div>
              <span>Warm up for at least 10 minutes before playing.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">2</div>
              <span>Avoid sudden "stop-and-turn" movements when possible.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 text-[10px] font-bold">3</div>
              <span>Strengthen your quadriceps and hamstrings to provide better support for your knee joints.</span>
            </li>
          </ul>
        </Card>
      </Section>
    </div>

    <Section title="Daily Activities">
      <Card className="border-none shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-muted/30">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <HomeIcon size={16} /> Walking
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">Keep your head up and land on your heels, rolling through to your toes.</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <ChevronRight size={16} className="rotate-90" /> Stairs
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">Use the handrail. Step up with the stronger leg, step down carefully with the weaker leg.</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <Activity size={16} /> Sitting
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">Avoid crossing your legs for long periods. Keep knees at a 90-degree angle.</p>
          </div>
        </div>
      </Card>
    </Section>

    <Section title="🧊 Pain Relief Tips">
      <Card className="border-none shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
              <Droplets size={16} /> Ice Therapy
            </h4>
            <p className="text-xs text-blue-600 leading-relaxed">Apply ice for 15-20 minutes to reduce swelling and numb the pain after activity.</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
            <h4 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
              <Zap size={16} /> Gentle Compression
            </h4>
            <p className="text-xs text-orange-600 leading-relaxed">Use a light wrap or sleeve to provide support and manage minor inflammation.</p>
          </div>
        </div>
      </Card>
      <PersonalizedPlanSection />
      <KneeSupportSection />
      <KneeSupportGuide />
    </Section>
  </PageWrapper>
));

const ExercisePage = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const ExerciseSection = ({ title, description, isFree = true }: { title: string; description: string; isFree?: boolean }) => {
    const [timeLeft, setTimeLeft] = useState(300);
    const [isActive, setIsActive] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      let interval: any = null;
      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsActive(false);
        setIsComplete(true);
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
      setIsActive(true);
      setIsComplete(false);
    };

    const handlePause = () => setIsActive(false);
    const handleReset = () => {
      setIsActive(false);
      setTimeLeft(300);
      setIsComplete(false);
    };

    return (
      <Card className="mb-8 border-none shadow-md overflow-hidden relative">
        {isFree && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 size={12} /> Free
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description}</p>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                {!isActive ? (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStart}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-secondary py-3.5 px-8 rounded-2xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md"
                  >
                    <Play size={16} fill="currentColor" /> Start Routine {isFree && <span className="flex items-center gap-1 ml-1 text-[10px] text-accent"><CheckCircle2 size={10} /> Free</span>}
                  </motion.button>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePause}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-500 text-primary py-3.5 px-8 rounded-2xl text-sm font-bold hover:bg-amber-600 transition-all shadow-md"
                  >
                    <Pause size={16} fill="currentColor" /> Pause
                  </motion.button>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary text-primary py-3.5 px-8 rounded-2xl text-sm font-bold hover:bg-secondary/80 transition-all"
                >
                  Reset
                </motion.button>
              </div>

              <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/30 w-full">
                <div className="text-2xl font-mono font-bold text-primary tracking-tighter">
                  {formatTime(timeLeft)}
                </div>
                {isComplete && (
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="text-sm font-bold text-green-600 flex items-center gap-1 animate-bounce">
                      Routine Complete <CheckCircle2 size={16} />
                    </div>
                  </div>
                )}
              </div>
              {isComplete && <KneeSupportSection />}
            </div>
          </div>
          <div className="md:w-1/3 bg-muted/50 rounded-2xl p-4 flex items-center justify-center border border-border/30">
            <Activity size={48} className="text-accent/30" />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <PageWrapper>
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Activity size={24} />
          </div>
          <h1 className="text-3xl font-bold text-primary">Support Your Knees with Knee-Lace</h1>
        </div>
        <Card className="bg-muted/30 border-none mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Knee-Lace acts as a natural support system for your knees. It helps you move with stability, reduces stress on your joints, and supports your knees during every activity. Use these exercises to strengthen, protect, and maintain healthy knees.
          </p>
        </Card>
      </header>

      <Section title="🏃 Exercises & Warm-Up">
        <ExerciseSection 
          title="1. Mobility & Warm-Up" 
          description="Light jogging and gentle movements help your knees stay active and improve joint mobility. Essential before any physical activity."
          isFree={true}
        />

        <ExerciseSection 
          title="2. Strength Training" 
          description="Controlled exercises like squats and light drills strengthen muscles around the knee, providing better stability."
          isFree={true}
        />

        <ExerciseSection 
          title="3. Flexibility & Recovery" 
          description="Stretching exercises reduce stiffness and improve flexibility for daily activities. Perfect for post-workout recovery."
          isFree={true}
        />
      </Section>

      <Section title="🌟 Advanced Routines">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              Knee-Safe Exercises
              <Sparkles size={18} className="text-accent" />
            </h3>
            <p className="text-sm text-gray-500 mb-6">These exercises provide extra protection and recovery when combined with Knee-Lace support.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXERCISES.map((ex, i) => (
                <Card key={i} className="flex items-center gap-4 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{ex.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{ex.instruction}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              Relaxation & Recovery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {RELAXATIONS.map((rel, i) => (
                <Card key={i} className="border-none shadow-sm bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors relative">
                  <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {rel.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{rel.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
    </PageWrapper>
  );
};

const DietPage = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'teas' | 'dinner' | null>(null);

  const NutritionItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex gap-5 items-start p-3 hover:bg-muted/50 rounded-2xl transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-bold text-primary mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <PageWrapper>
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-primary mb-3">Knee Friendly Diet</h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto">Simple nutrition habits to support stronger and healthier knees through anti-inflammatory foods.</p>
      </header>

      <Section title="Nutrition Habits">
        <Card className="border-none shadow-md divide-y divide-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <NutritionItem 
              icon={Droplets} 
              title="Hydration" 
              description="Drink enough water to keep joints lubricated and reduce stiffness." 
            />
            <NutritionItem 
              icon={Zap} 
              title="Banana" 
              description="High potassium helps muscle recovery and supports knee stability." 
            />
            <NutritionItem 
              icon={Leaf} 
              title="Green Vegetables" 
              description="Spinach, kale, and broccoli provide calcium and anti-inflammatory nutrients." 
            />
            <NutritionItem 
              icon={Coffee} 
              title="Healthy Smoothie" 
              description="Fruit and yogurt smoothies support recovery and energy." 
            />
            <NutritionItem 
              icon={Zap} 
              title="Nuts & Seeds" 
              description="Healthy fats and magnesium help reduce inflammation." 
            />
            <NutritionItem 
              icon={Egg} 
              title="Protein Foods" 
              description="Eggs, beans, and lentils support muscle strength around the knee." 
            />
          </div>
        </Card>
      </Section>

      <div className="flex flex-col sm:flex-row gap-6 my-16">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('teas')}
          className={cn(
            "flex-1 py-5 rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-lg transition-all",
            activeTab === 'teas' ? "bg-accent text-primary" : "bg-primary text-secondary hover:shadow-xl"
          )}
        >
          <Coffee size={20} /> View Herbal Teas
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('dinner')}
          className={cn(
            "flex-1 py-5 rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-lg transition-all",
            activeTab === 'dinner' ? "bg-accent text-primary" : "bg-primary text-secondary hover:shadow-xl"
          )}
        >
          <Utensils size={20} /> View Dinner Ideas
        </motion.button>
      </div>

      {activeTab && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeTab}
        >
          {activeTab === 'dinner' && (
            <Section title="Anti-Inflammatory Dinner">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECIPES.map((recipe, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white/70 backdrop-blur-sm">
                    <h3 className="font-bold text-primary mb-2">{recipe.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{recipe.description}</p>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {activeTab === 'teas' && (
            <Section title="Herbal Teas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEAS.map((tea, i) => (
                  <Card key={i} className="bg-secondary/50 border-none shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-primary mb-2">{tea.name}</h3>
                    <p className="text-xs text-gray-600 italic leading-relaxed mb-3">{tea.benefit}</p>
                    
                    {tea.benefits && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Benefits:</p>
                        <ul className="list-disc list-inside text-[10px] text-gray-500 space-y-0.5">
                          {tea.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {tea.preparation && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Preparation:</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">{tea.preparation}</p>
                      </div>
                    )}
                    
                    {tea.note && (
                      <div className="pt-2 border-t border-primary/10">
                        <p className="text-[9px] text-gray-400 italic leading-relaxed">
                          <span className="font-bold not-italic text-primary/60">Note:</span> {tea.note}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Section>
          )}
        </motion.div>
      )}
      
      <p className="text-xs text-gray-400 text-center mt-12 font-medium">
        * Natural ingredients, no medical claims intended.
      </p>
    </PageWrapper>
  );
};

const HelpPage = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const country = localStorage.getItem("user_country") || "IN";
  const location = useLocation();

  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! I'm your Knee-Care assistant. How can I help you with your knee health or Knee-Lace support today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;
    
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput("");
    setLoading(true);

    const botResponse = await getKneeCareTip(text);
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    setLoading(false);
  };

  const predefinedButtons = [
    "Knee pain relief",
    "Daily routine",
    "Safe exercises",
    "Knee-Lace benefits"
  ];

  return (
    <PageWrapper>
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">Support & Guidance</h1>
        <p className="text-gray-500 font-medium">Get expert tips and answers to your knee care questions.</p>
      </header>

      <Section title="Knee-Care Assistant">
        <div id="help-section" className="scroll-mt-24">
          <Card className="flex flex-col h-[500px] border-none shadow-xl bg-white/70 backdrop-blur-sm p-0 overflow-hidden">
          <div className="bg-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-secondary">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-secondary font-bold text-sm">AI Assistant</h3>
              <p className="text-secondary/60 text-[10px] uppercase tracking-widest">Always Online</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-muted/20">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.isBot 
                  ? "bg-white text-primary self-start rounded-tl-none border border-border/30" 
                  : "bg-accent text-primary self-end ml-auto rounded-tr-none"
              )}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-primary p-4 rounded-2xl text-sm self-start rounded-tl-none border border-border/30 animate-pulse">
                Thinking...
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-border/30">
            <div className="flex gap-2 flex-wrap mb-4">
              {predefinedButtons.map(btn => (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={btn}
                  onClick={() => handleSend(btn)}
                  className="text-[10px] font-bold uppercase tracking-wider bg-secondary px-4 py-2 rounded-full text-primary hover:bg-accent hover:text-primary transition-all"
                >
                  {btn}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-3">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-muted border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                className="bg-primary text-secondary p-3 rounded-2xl hover:bg-primary/90 transition-all shadow-md"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <Section title="Community Tips">
        <Card className="bg-muted/30 border-none p-8 text-center h-full flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4 text-primary">
            <Sparkles size={32} />
          </div>
          <h3 className="font-bold text-primary mb-2">Daily Movement</h3>
          <p className="text-xs text-gray-500">"Consistency is key. Even 5 minutes of movement makes a difference."</p>
        </Card>
      </Section>

      <Section title="Feedback">
          <Card className="border-none shadow-md h-full flex flex-col">
            <p className="text-sm text-gray-500 mb-4">Help us improve Knee-Care for everyone.</p>
            <textarea 
              placeholder="Tell us about your experience..."
              className="flex-1 w-full bg-muted border border-border/50 rounded-2xl px-5 py-4 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all mb-4"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-secondary text-primary py-4 rounded-2xl text-sm font-bold hover:bg-primary hover:text-secondary transition-all"
            >
              Send Feedback
            </motion.button>
          </Card>
        </Section>
    </div>

      <div className="mt-12 p-6 bg-red-50 rounded-3xl border border-red-100 flex gap-4 items-start">
        <AlertCircle size={24} className="text-red-400 shrink-0" />
        <p className="text-xs text-red-700 leading-relaxed">
          <strong className="block mb-1">Medical Disclaimer</strong>
          This application provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </PageWrapper>
  );
};

const AboutPage = () => (
  <PageWrapper>
    <header className="mb-12 text-center">
      <h1 className="text-3xl font-bold text-primary mb-3">About Knee-Care</h1>
      <p className="text-gray-500 font-medium max-w-lg mx-auto">Learn more about our mission and guidance.</p>
    </header>

    <Section title="Our Mission">
      <Card className="border-none shadow-md space-y-6 p-8">
        <p className="text-gray-600 leading-relaxed">
          Knee-Care is a simple app designed to help people take better care of their knees through basic exercises, movement guidance, and helpful resources.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This app is not a medical product and does not replace professional advice. It is built to support everyday knee comfort and mobility.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our goal is to provide an easy and accessible way for users to stay active and mindful of their knee health.
        </p>
      </Card>
    </Section>
  </PageWrapper>
);

const PrivacyPolicyPage = () => (
  <PageWrapper>
    <header className="mb-12 text-center">
      <h1 className="text-3xl font-bold text-primary mb-3">Privacy Policy</h1>
      <p className="text-gray-500 font-medium max-w-lg mx-auto">Your privacy is important to us.</p>
    </header>

    <Section title="Our Commitment">
      <Card className="border-none shadow-md space-y-6 p-8">
        <p className="text-gray-600 leading-relaxed">
          We value your privacy.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Knee-Care does not collect or store personal data without your consent.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We do not sell or share your personal information with third parties.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This app may use basic local storage to improve user experience, such as saving preferences or login state.
        </p>
        <p className="text-gray-600 leading-relaxed font-medium text-primary">
          By using this app, you agree to this privacy policy.
        </p>
      </Card>
    </Section>
  </PageWrapper>
);

const ContactPage = () => (
  <PageWrapper>
    <header className="mb-12 text-center">
      <h1 className="text-3xl font-bold text-primary mb-3">Contact</h1>
      <p className="text-gray-500 font-medium max-w-lg mx-auto">We're here to help.</p>
    </header>

    <Section title="Get in Touch">
      <Card className="border-none shadow-md space-y-6 p-8">
        <p className="text-gray-600 leading-relaxed">
          If you have any questions, feedback, or issues, feel free to reach out.
        </p>
        <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
          <p className="text-primary font-bold">Email:</p>
          <p className="text-accent font-medium">kneecare.help@gmail.com</p>
        </div>
        <p className="text-gray-600 leading-relaxed">
          We aim to respond as soon as possible.
        </p>
      </Card>
    </Section>
  </PageWrapper>
);

const Footer = () => (
  <footer className="bg-white border-t border-border/50 py-8 mt-auto">
    <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <AppLogo />
        <span className="font-bold text-primary text-sm">Knee-Care</span>
      </div>
      <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        <Link to="/help" className="hover:text-primary transition-colors">Support</Link>
      </div>
      <p className="text-[10px] text-gray-400 font-medium">
        © {new Date().getFullYear()} Knee-Care. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- Main App ---

function AppContent() {
  const { isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-muted flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exercises" element={<ExercisePage />} />
              <Route path="/diet" element={<DietPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
            
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/premium" element={<PremiumPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
