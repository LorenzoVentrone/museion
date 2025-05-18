'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' o 'signup'
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  // Stati form signin
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Stati form signup
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupError, setSignupError] = useState('');

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
        localStorage.setItem('token', data.token);
        router.push(from === 'tickets' ? '/tickets' : '/checkout');
      } else {
        setLoginError(data.message || 'Credenziali non valide');
      }
    } catch (err) {
      setLoginError('Errore di connessione, riprova più tardi.');
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    try {
      const res = await fetch('/api/signup', {
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
        alert('Registrazione avvenuta con successo!');
        setMode('signin');
      } else {
        setSignupError(data.error || 'Registrazione fallita');
      }
    } catch (err) {
      console.error(err);
      setSignupError('Errore di connessione');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div>
        {/* Tabs */}
        <div className="relative flex justify-around border-b border-gray-300">
          <button
            onClick={() => setMode('signin')}
            className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${
              mode === 'signin' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Accedi
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${
              mode === 'signup' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Registrati
          </button>
          {/* Indicator animato */}
          <span
            className="absolute bottom-0 left-0 h-1 w-1/2 bg-black rounded-t transition-transform duration-300"
            style={{ transform: mode === 'signin' ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>

        {/* Container form con overflow e width doppia */}
        <div className="overflow-hidden relative" style={{ height: 'auto' }}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: '200%', transform: mode === 'signin' ? 'translateX(0)' : 'translateX(-50%)' }}
          >
            {/* Form Signin */}
            <form
              onSubmit={handleSignin}
              className="w-1/2 p-8"
              noValidate
              autoComplete="off"
            >
              {loginError && (
                <p className="text-red-600 text-center mb-4">{loginError}</p>
              )}
              <div className="mb-5">
                <label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  placeholder="Inserisci la tua email"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-8">
                <label htmlFor="loginPassword" className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Inserisci la tua password"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black border border-black py-3 rounded hover:bg-black hover:text-white transition-colors"
              >
                Accedi
              </button>
            </form>

            {/* Form Signup */}
            <form
              onSubmit={handleSignup}
              className="w-1/2 p-8"
              noValidate
              autoComplete="off"
            >
              {signupError && (
                <p className="text-red-600 text-center mb-4">{signupError}</p>
              )}
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                  Nome
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                  Cognome
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Inserisci il tuo cognome"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signupEmail" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="signupEmail"
                  type="email"
                  placeholder="Inserisci la tua email"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="signupPassword" className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  placeholder="Inserisci la tua password"
                  className="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white w-full text-black border border-black py-3 rounded hover:bg-black hover:text-white transition-colors"
              >
                Registrati
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
