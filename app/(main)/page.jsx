'use client';
import { useState } from 'react';
import Link from 'next/link';
import SolutionsMegaMenu from '../../components/SolutionsMegaMenu';

const services = [
  { icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5', title: 'AI-Powered Analytics', desc: 'Deep learning models that analyze operational data in real-time, uncovering patterns and insights humans miss.' },
  { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', title: 'Predictive Intelligence', desc: 'Machine learning pipelines that forecast demand, predict failures, and optimize resource allocation across operations.' },
  { icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125', title: 'Intelligent Data Systems', desc: 'Automated data pipelines and neural networks that transform raw enterprise data into actionable intelligence.' },
  { icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z', title: 'Computer Vision', desc: 'Image recognition and visual inspection systems for quality control, warehouse monitoring, and asset tracking.' },
  { icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z', title: 'Natural Language Processing', desc: 'AI-driven document analysis, intelligent search, and automated reporting systems for enterprise workflows.' },
  { icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75', title: 'Process Automation', desc: 'Intelligent automation that learns from operational patterns and continuously optimizes workflows end-to-end.' },
];

const industries = [
  { name: 'Logistics', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
  { name: 'Warehouse', icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z' },
  { name: 'Manufacturing', icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085' },
  { name: 'Banking', icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z' },
  { name: 'Healthcare', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { name: 'Education', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
];

const stats = [
  { value: '99.7%', label: 'Model Accuracy' },
  { value: '50ms', label: 'Avg Response Time' },
  { value: '10M+', label: 'Data Points Processed' },
  { value: '24/7', label: 'Autonomous Monitoring' },
];

export default function HomePage() {
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <section className="min-h-[92vh] flex flex-col justify-center relative bg-gradient-hero grid-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <span className="glow-dot"></span>
            <span className="text-cyan-400 text-sm font-medium tracking-wide">AI-Powered Enterprise Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            <span className="text-white">Transforming Industries</span><br className="hidden md:block" />
            <span className="text-gradient">with Artificial Intelligence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            SWAIS builds AI systems that see what humans miss — predictive models, computer vision, and intelligent automation that drive operational excellence across every industry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              type="button"
              onClick={() => setSolutionsMenuOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              Explore Solutions
            </button>
            <Link href="/platform" className="px-8 py-3.5 rounded-full border border-white/10 text-slate-300 font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all">
              View Platform
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(stat => (
              <div key={stat.label} className="glass-card p-6 rounded-2xl text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">AI Capabilities</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">End-to-end AI solutions engineered for real-world enterprise challenges</p>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl group cursor-default flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/10 flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">{svc.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed flex-grow">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Deploying intelligent systems across sectors that drive the global economy</p>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(ind => (
              <Link key={ind.name} href="/industries" className="glass-card p-6 rounded-2xl text-center group cursor-pointer">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center mb-4 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all">
                  <svg className="w-7 h-7 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ind.icon} />
                  </svg>
                </div>
                <p className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors">{ind.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0f] border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to harness AI for your business?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Let us show you how intelligent systems can transform your operations, reduce costs, and unlock new capabilities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all shadow-lg shadow-cyan-500/25">
              Contact Us
            </Link>
            <Link href="/academy" className="px-8 py-3.5 rounded-full border border-white/10 text-slate-300 font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all">
              Explore Academy
            </Link>
          </div>
        </div>
      </section>

      {solutionsMenuOpen && (
        <SolutionsMegaMenu onClose={() => setSolutionsMenuOpen(false)} />
      )}
    </div>
  );
}
