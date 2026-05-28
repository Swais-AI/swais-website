'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
// START FEATURE FLAG CHANGE - Navigation Hidden
import { FEATURE_FLAGS } from '@/lib/featureFlags';
// END FEATURE FLAG CHANGE

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const isSuperAdmin = isLoggedIn && (user?.role === 'SUPER_ADMIN' || user?.role === 'HEAD');

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: '/platform' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'Academy', path: '/academy' },
    { name: 'Saraswati', path: '/saraswati' },
    { name: 'Collaborations', path: '/collaborations' },
    { name: 'Accreditation', path: '/accreditation' },
    { name: 'Media Assets', path: '/mediaassets' },
    { name: 'Company', path: '/company' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' },
  ];

  // START FEATURE FLAG CHANGE - Navigation Hidden
  const visibleLinks = FEATURE_FLAGS.accreditation
    ? links
    : links.filter(link => link.path !== '/accreditation');
  // END FEATURE FLAG CHANGE

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0 group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gradient">SWAIS</span>
          </Link>

          <div className="hidden xl:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {/* START FEATURE FLAG CHANGE - Navigation Hidden */}
              {visibleLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`nav-btn ${pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              {/* END FEATURE FLAG CHANGE */}
            </div>
          </div>

          <div className="hidden xl:flex gap-3 items-center">
            {isSuperAdmin && (
              <Link
                href="/admin"
                title="Super Admin: User Activation"
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 to-amber-300/15 border border-amber-400/40 text-amber-300 hover:text-amber-100 hover:from-amber-500/25 hover:to-amber-300/25 transition-all text-xs font-semibold tracking-wide"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin
              </Link>
            )}
            {isLoggedIn ? (
              <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 transition-all text-sm font-semibold tracking-wide shadow-lg shadow-cyan-500/20">
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={handleLogin}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 transition-all text-sm font-semibold tracking-wide shadow-lg shadow-cyan-500/20"
              >
                Get Started
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
              {/* START FEATURE FLAG CHANGE - Navigation Hidden */}
              {visibleLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === link.path ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  {link.name}
                </Link>
              ))}
              {/* END FEATURE FLAG CHANGE */}
            {isSuperAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-amber-400/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin · User Activation
              </Link>
            )}
            <div className="pt-3 mt-3 border-t border-white/5">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => { handleLogin(); setMobileMenuOpen(false); }}
                  className="w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
