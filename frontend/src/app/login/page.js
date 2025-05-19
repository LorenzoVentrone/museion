'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/profile');
      } else {
        setError(data.message || 'Credenziali non valide');
      }
    } catch (err) {
      setError('Errore di connessione, riprova più tardi.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Accedi al tuo account
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Inserisci la tua email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Inserisci la tua password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition-colors"
        >
          Accedi
        </button>
      </form>
    </div>
  );
}