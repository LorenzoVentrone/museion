'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/utils/AuthProvider';

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
        setLoginError(data.message || 'Credenziali non valide');
      }
    } catch {
      setLoginError('Errore di connessione');
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
        alert('Registrazione avvenuta!');
        setMode('signin');
      } else {
        setSignupError(data.error || 'Registrazione fallita');
      }
    } catch {
      setSignupError('Errore di connessione');
    }
  };

  const heroImgLeft = '/images/Female_Bust.png';
  const heroImgRight = '/images/Male_Bust.png';

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Mobile version: mostra l'immagine sopra il form */}
      <div className="block md:hidden relative h-48">
        <AnimatePresence initial={false} mode="wait">
          {mode === 'signin' ? (
            <motion.img
              key="mobile-hero-right"
              src={heroImgRight}
              alt="museum visual"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 mt-18 object-contain"
              variants={slideVariant}
              initial="hiddenRight"
              animate="visible"
              exit="hiddenRight"
            />
          ) : (
            <motion.img
              key="mobile-hero-left"
              src={heroImgLeft}
              alt="museum visual"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/7 mt-17 object-contain"
              variants={slideVariant}
              initial="hiddenLeft"
              animate="visible"
              exit="hiddenLeft"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1">
        {/* Desktop version: immagine laterale */}
        <AnimatePresence initial={false} mode="wait">
          {mode === 'signin' ? (
            <motion.div
              key="hero-right"
              variants={slideVariant}
              initial="hiddenRight"
              animate="visible"
              exit="hiddenRight"
              className="hidden md:block w-1/2 relative order-last"
            >
              <img src={heroImgRight} alt="museum visual" className="absolute inset-0 w-3/4 h-3/4 object-cover" />
            </motion.div>
          ) : (
            <motion.div
              key="hero-left"
              variants={slideVariant}
              initial="hiddenLeft"
              animate="visible"
              exit="hiddenLeft"
              className="hidden md:block w-1/2 relative order-first"
            >
              <img src={heroImgLeft} alt="museum visual" className="absolute inset-0 w-3/4 h-3/4 object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#fdfaf6] text-[#2e2b28]">
          <AnimatePresence mode="wait" initial={false}>
            {mode === 'signin' ? (
              <motion.div key="signin" variants={slideVariant} initial="hiddenLeft" animate="visible" exit="hiddenLeft" className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Bentornato</h1>
                <form onSubmit={handleSignin} className="space-y-4">
                  {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
                  <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  <button type="submit" className="w-full py-3 bg-black text-white rounded hover:bg-orange-500 transition">Accedi</button>
                </form>
                <p className="text-sm mt-4">
                  Non hai un account?{' '}
                  <button onClick={() => setMode('signup')} className="text-orange-500 font-semibold">
                    Registrati
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div key="signup" variants={slideVariant} initial="hiddenRight" animate="visible" exit="hiddenRight" className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Crea il tuo account</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                  {signupError && <p className="text-red-600 text-sm">{signupError}</p>}
                  <div className="flex gap-4">
                    <input type="text" placeholder="Nome" className="flex-1 border p-3 rounded" value={signupFirstName} onChange={(e) => setSignupFirstName(e.target.value)} required />
                    <input type="text" placeholder="Cognome" className="flex-1 border p-3 rounded" value={signupLastName} onChange={(e) => setSignupLastName(e.target.value)} required />
                  </div>
                  <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                  <button type="submit" className="w-full py-3 bg-black text-white rounded hover:bg-orange-500 transition">Registrati</button>
                </form>
                <p className="text-sm mt-4">
                  Hai già un account?{' '}
                  <button onClick={() => setMode('signin')} className="text-orange-500 font-semibold">
                    Accedi
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