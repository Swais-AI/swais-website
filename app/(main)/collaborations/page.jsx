export default function CollaborationsPage() {
  const partners = [
    {
      name: 'Comtrade Digital Services',
      country: 'Serbia',
      flag: '🇷🇸',
      domain: 'Platform Engineering & System Integration',
      desc: 'Strategic technology partner providing platform engineering expertise and deep system integration capabilities across enterprise environments.',
      tags: ['Technology', 'Integration'],
      status: 'active',
    },
    {
      name: 'Graia',
      country: 'Hungary',
      flag: '🇭🇺',
      domain: 'AI Reception & Front Desk Automation',
      desc: 'AI-powered reception and front desk automation platform enabling intelligent customer interaction across healthcare, hospitality, and e-commerce environments.',
      tags: ['AI', 'Automation'],
      status: 'active',
    },
    {
      name: 'St. Gallen IMB Business School',
      country: 'Switzerland',
      flag: '🇨🇭',
      domain: 'Global Executive Programs & AI Awareness',
      desc: 'Academic collaboration for international executive immersion programs, AI awareness initiatives, and cross-border knowledge exchange for leadership teams.',
      tags: ['Education', 'Executive Programs'],
      status: 'active',
    },
    {
      name: 'Swissnex India',
      country: 'Switzerland',
      flag: '🇨🇭',
      domain: 'Swiss–India Innovation Bridge',
      desc: 'Engagement with the Swiss government\'s global network connecting Switzerland and India in science, education, and innovation for technology-driven initiatives.',
      tags: ['Innovation', 'Government'],
      status: 'discussions',
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-fadeIn">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Global Collaborations</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6" />
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          SWAIS builds purposeful global partnerships to deliver integrated AI solutions across industries. Our collaborations span technology, academia, and innovation networks across Europe and beyond.
        </p>
      </div>

      {/* Disclaimer for In Discussions */}
      <div className="mb-10 flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-5 py-4 max-w-3xl mx-auto">
        <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p className="text-sm text-amber-300/80 leading-relaxed">
          Partnerships marked <span className="font-semibold text-amber-400">In Discussions</span> are currently in preliminary stages. These have not been formally executed and should not be construed as confirmed agreements for any legal or commercial purposes.
        </p>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner, i) => (
          <div
            key={i}
            className={`glass-card rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
              partner.status === 'discussions' ? 'border border-amber-500/15' : ''
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{partner.flag}</span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{partner.name}</h3>
                  <p className="text-slate-500 text-sm">{partner.country}</p>
                </div>
              </div>

              {/* Status badge */}
              {partner.status === 'discussions' ? (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  In Discussions
                </span>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Active
                </span>
              )}
            </div>

            {/* Domain */}
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-full min-h-[20px] bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
              <p className="text-cyan-400 text-sm font-semibold">{partner.domain}</p>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">{partner.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {partner.tags.map((tag, j) => (
                <span key={j} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/10 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* More coming card */}
        <div className="glass-card rounded-2xl p-7 flex flex-col items-center justify-center text-center border border-dashed border-white/10 min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <p className="text-slate-500 font-semibold text-sm">More collaborations in progress</p>
          <p className="text-slate-600 text-xs mt-1">SWAIS is actively building its global network</p>
        </div>
      </div>
    </div>
  );
}
