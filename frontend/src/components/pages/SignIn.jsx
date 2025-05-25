'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence} from 'framer-motion';
import { useAuth } from '@/components/utils/AuthProvider';
import { FiEye, FiEyeOff} from 'react-icons/fi'
import toast from 'react-hot-toast';

export default function AuthPage() {
  // state: "signin" | "signup"
  const [mode, setMode] = useState('signin');
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const { login } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupError, setSignupError] = useState('');

  /* ---------------- helpers ---------------- */
  const slideVariant = {
    hiddenLeft: { x: '-100%', opacity: 0 },
    hiddenRight: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.45, 0.2, 0.2, 1] } }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(data.token);
        router.push(from === 'tickets' ? '/tickets' : '/checkout');
      } else {
        setLoginError(data.message || '	Invalid credentials');
      }
    } catch {
      setLoginError('Connection error');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    try {
      const res = await fetch('http://localhost:3001/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          first_name: signupFirstName,
          last_name: signupLastName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Registration successful!');
        setMode('signin');
      } else {
        setSignupError(data.error || '	Registration failed');
      }
    } catch {
      setSignupError('Connection error');
    }
  };

  const heroImgLeft = '/images/MaleStatue.png';

  const frameStatic    = '/images/Static.png';
  const gifCover       = '/images/animation.gif'; // VEDIAMO SE METTERLA ANIMATA
  const gifUncover     = '/images/reverse-animation.gif';
  const frameStaticSpy   = '/images/StaticSpy.png';
  const frameStaticCover = '/images/StaticCover.png';

  const [heroSrc, setHeroSrc] = useState(frameStatic);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Mobile version: mostra l'immagine sopra il form */}
      <div
        className="fixed inset-0 -z-10 block md:hidden
                  bg-center bg-contain bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url('/images/${mode === 'signin'
            ? 'Static.png'
            : 'MaleStatue.png'}')`,
          opacity: 0.90,  // velatura tenue
          filter: 'blur(2px)'
        }}
      />
      {/* facoltativo: tonalità beige del brand sotto l’outline */}
      <div className="fixed inset-0 -z-20 bg-[#fdfaf6]/90 md:hidden" />

      <div className="flex flex-1 overflow-hidden z-0">
        {/* Desktop version: immagine laterale */}
        <AnimatePresence initial={false} mode="wait">
          {mode === 'signin' ? (
            <motion.div
              key="hero-signin"
              variants={slideVariant}
              initial="hiddenRight"
              animate="visible"
              exit="hiddenRight"
              className="hidden md:block w-1/2 relative order-first"
            >
              {/* Static Img */}
              <img
                src={heroSrc}
                alt="museum visual"
                className="absolute inset-0 w-3/4 h-3/4 object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="hero-signup"
              variants={slideVariant}
              initial="hiddenLeft"
              animate="visible"
              exit="hiddenLeft"
              className="hidden md:block w-1/2 relative order-last"
            >
              <img
                src={heroImgLeft}
                alt="museum visual"
                className="absolute inset-0 w-3/4 h-3/4 object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 md:p-8  text-[#2e2b28]">
          <AnimatePresence mode="wait" initial={false}>
            {mode === 'signin' ? (
              <motion.div key="signin" variants={slideVariant} initial="hiddenLeft" animate="visible" exit="hiddenLeft" className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
                <form onSubmit={handleSignin} className="space-y-4">
                    {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
                    <input type="email" placeholder="Email" className="w-full border bg-white p-3 rounded" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                      <div className="flex items-start gap-4">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full border p-3 rounded pr-10 bg-white"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onFocus={() => setHeroSrc(frameStaticCover)}
                        onBlur={() => {
                          setHeroSrc(frameStatic);
                        }}
                        required
                      />
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setHeroSrc(frameStaticSpy);      
                          setShowPassword(true);
                        }}
                        onMouseUp={(e) => {
                          e.preventDefault();
                          setHeroSrc(frameStaticCover);
                          setShowPassword(false);
                        }}
                        onMouseLeave={(e) => {
                          e.preventDefault();
                          // Nel caso in cui il mouse lasci il bottone durante la pressione
                          setHeroSrc(frameStaticCover);
                          setShowPassword(false);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          setHeroSrc(frameStaticSpy);
                          setShowPassword(true);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          setHeroSrc(frameStaticCover);
                          setShowPassword(false);
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-black text-white rounded hover:bg-orange-500 transition">Sign in</button>
                </form>
                <p className="text-sm mt-4">
                  Don't have an account? {' '}
                  <button onClick={() => setMode('signup')} className="text-orange-500 font-semibold">
                    Sign up
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div key="signup" variants={slideVariant} initial="hiddenRight" animate="visible" exit="hiddenRight" className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Create an account</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                  {signupError && <p className="text-red-600 text-sm">{signupError}</p>}
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="flex-1 border p-3 rounded bg-white" 
                      value={signupFirstName} 
                      onChange={(e) => setSignupFirstName(e.target.value)} 
                      required 
                      />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="flex-1 border p-3 rounded bg-white" 
                      value={signupLastName} onChange={(e) => setSignupLastName(e.target.value)} 
                      required 
                      />
                  </div>
                  <input type="email" placeholder="Email" className="w-full border p-3 rounded bg-white" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" className="w-full border p-3 rounded bg-white" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                  <button type="submit" className="w-full py-3 bg-black text-white rounded hover:bg-orange-500 transition">Create account</button>
                </form>
                <p className="text-sm mt-4">
                  Already have an account?{' '}
                  <button onClick={() => setMode('signin')} className="text-orange-500 font-bold">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}



