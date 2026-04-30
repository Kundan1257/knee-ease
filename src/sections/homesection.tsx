import React from 'react';
import { motion } from 'motion/react';
import { Activity, CheckCircle2, HomeIcon, ChevronRight, Droplets, Zap } from '../App';
import { Card, Section, PageWrapper, AppLogoLarge, PersonalizedPlanSection, KneeSupportSection, KneeSupportGuide } from '../App';

export const HomeSection: React.FC = () => (
  <PageWrapper>
    <div className="flex justify-center mb-8">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-primary/10 overflow-hidden">
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

    <Card className="mb-10 bg-white shadow-xl border-none overflow-hidden relative">
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
);

export default HomeSection;
