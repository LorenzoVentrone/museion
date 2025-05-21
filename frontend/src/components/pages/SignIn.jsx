'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../utils/AuthProvider';

export default function AuthPage() {
  const [mode, setMode] = useState('signin');
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const { login } = useAuth(); // ✅ Context login

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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
        login(data.token); // token + context 
        router.push(from === 'tickets' ? '/tickets' : '/checkout');
      } else {
        setLoginError(data.message || 'Credenziali non valide');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Errore di connessione, riprova più tardi.');
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Tabs */}
        <div className="mb-6 flex justify-around border-b border-gray-300">
          <button
            onClick={() => setMode('signin')}
            className={`px-4 py-2 font-bold ${
              mode === 'signin' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'
            }`}
          >
            Accedi
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-2 font-bold ${
              mode === 'signup' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'
            }`}
          >
            Registrati
          </button>
        </div>

        {mode === 'signin' ? (
          <form onSubmit={handleSignin}>
            {loginError && <p className="text-red-600 mb-4">{loginError}</p>}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600">
              Accedi
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            {signupError && <p className="text-red-600 mb-4">{signupError}</p>}
            <input
              type="text"
              placeholder="Nome"
              className="w-full mb-4 p-3 border rounded"
              value={signupFirstName}
              onChange={(e) => setSignupFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cognome"
              className="w-full mb-4 p-3 border rounded"
              value={signupLastName}
              onChange={(e) => setSignupLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600">
              Registrati
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
