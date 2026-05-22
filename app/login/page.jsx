'use client';
import Link from 'next/link';
import StandardHeader from '../../components/StandardHeader';

const API = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    window.location.href = `${API}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <StandardHeader />
      
      <div className="flex-1 flex w-full relative">
        {/* Full Screen Navy Blue Background */}
        <div className="w-full bg-[#0f2851] flex flex-col items-center justify-center relative overflow-hidden text-center py-12 px-8">
          
          {/* Gold abstract overlay shape */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-tr from-[#9c7b39] to-transparent opacity-80" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)'}}></div>
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-bl from-[#cda653] to-transparent opacity-20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>

          <div className="relative z-10 w-full max-w-md mx-auto">
            {/* SWAIS Logo */}
            <div className="mb-6 flex justify-center">
              <svg className="w-20 h-20 text-[#cda653]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" stroke="#cda653" />
                <path d="M12 2v20M2 12h20M4 4l16 16M4 20L20 4" stroke="#cda653" strokeOpacity="0.5"/>
                <circle cx="12" cy="12" r="3" fill="#cda653" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-widest mb-2">SWAIS</h1>
            <h2 className="text-[#cda653] text-xl font-medium mb-8">Saraf Worldsphere AI Services</h2>
            <p className="text-gray-300 mb-12 tracking-wide font-light">AI Solutions Across Industries</p>

            {/* Login Box */}
            <div className="bg-[#1a355f]/60 backdrop-blur-md border rounded-xl border-[#2a4575] p-8 shadow-2xl relative z-20">
              <h3 className="text-white text-2xl font-medium mb-8">User Login</h3>
              
              <button 
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-100 text-[#0f2851] font-bold py-3 px-4 rounded shadow flex items-center justify-center gap-3 transition-colors mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
                </svg>
                Sign in with Google
              </button>
              
              <p className="text-sm text-gray-300 mb-4 cursor-pointer hover:text-white transition-colors">
                New User? Continue with Google to Register
              </p>
              
              <p className="text-sm text-gray-300 border-t border-[#2a4575]/50 pt-6 mt-4">
                Need Help?<br/><br/>
                Contact us: <a href="mailto:murty.varanasi@swais.in" className="hover:text-white cursor-pointer transition-colors font-medium">murty.varanasi@swais.in</a>
              </p>

              <Link
                href="/"
                className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-[#cda653] transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
