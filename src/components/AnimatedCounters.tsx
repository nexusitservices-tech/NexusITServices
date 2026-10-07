import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, Server, CheckCircle2, TrendingUp, Award } from 'lucide-react';

interface CounterItem {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: any;
  color: string;
}

const METRICS: CounterItem[] = [
  {
    id: 'uptime',
    label: 'Enterprise Cloud SLA',
    sublabel: 'Zero downtime commitment across UAE servers',
    value: 99.99,
    suffix: '%',
    decimals: 2,
    icon: Server,
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'response',
    label: 'Incident Response Time',
    sublabel: 'Direct GST support by senior engineers in Dubai',
    value: 15,
    prefix: '<',
    suffix: ' min',
    icon: Clock,
    color: 'text-[#0046AF] bg-blue-50 border-blue-200'
  },
  {
    id: 'deployments',
    label: 'UAE & GCC Projects',
    sublabel: 'Successfully delivered across Dubai & Abu Dhabi',
    value: 65,
    suffix: '+',
    icon: CheckCircle2,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'residency',
    label: 'UAE Data Sovereignty',
    sublabel: 'Strict TDRA & ISO 27001 compliance',
    value: 100,
    suffix: '%',
    icon: ShieldCheck,
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  }
];

function SingleCounter({ item }: { item: CounterItem; key?: React.Key }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = item.icon;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * item.value;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(item.value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, item.value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0046AF] via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} shadow-2xs group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            UAE Standard
          </span>
        </div>

        <div className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-mono mb-1.5 flex items-baseline">
          {item.prefix && <span className="text-[#0046AF] mr-0.5">{item.prefix}</span>}
          <span>{item.decimals ? count.toFixed(item.decimals) : Math.floor(count)}</span>
          {item.suffix && <span className="text-[#0046AF] ml-0.5 text-2xl">{item.suffix}</span>}
        </div>

        <h4 className="text-sm font-bold text-slate-900 mb-1">{item.label}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{item.sublabel}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF] animate-pulse"></span>
        <span>Audited & verified in Dubai</span>
      </div>
    </motion.div>
  );
}

export default function AnimatedCounters() {
  return (
    <section className="w-full py-12 max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map(item => (
          <SingleCounter key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
