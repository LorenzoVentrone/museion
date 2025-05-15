'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          first_name: firstName, 
          last_name: lastName 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registrazione avvenuta con successo!');
        router.push('/login');
      } else {
        setError(data.error || 'Registrazione fallita');
      }
    } catch (err) {
      console.error(err);
      setError('Errore di connessione');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <form 
        onSubmit={handleSignup} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Registrati
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label 
            htmlFor="firstName" 
            className="block text-gray-700 font-medium mb-1"
          >
            Nome
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Inserisci il tuo nome"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="lastName" 
            className="block text-gray-700 font-medium mb-1"
          >
            Cognome
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Inserisci il tuo cognome"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-gray-700 font-medium mb-1"
          >
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
            className="block text-gray-700 font-medium mb-1"
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
          Registrati
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Hai già un account?{' '}
            <a 
              href="/login" 
              className="text-indigo-600 hover:underline"
            >
              Accedi
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}