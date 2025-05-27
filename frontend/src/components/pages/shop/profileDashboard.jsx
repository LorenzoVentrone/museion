'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import generatePdf from '@/components/utils/TicketGenerator';
import {
  FiUser, FiTag, FiPackage, FiArrowLeft,
  FiMenu, FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

/* -------------------- helper components -------------------- */

const NavButton = ({ icon: Icon, label, active, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`${className} flex items-center gap-3 w-full py-3 px-4
                font-medium rounded-lg transition
                ${active ? 'bg-black text-white' : 'text-[#2e2b28] hover:bg-gray-100'}`}
  >
    <Icon size={18} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

// --- Password Edit
const PasswordPane = () => {
  const [fields, setFields] = useState({
    old: '',
    pw1: '',
    pw2: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const change = e =>
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (fields.pw1 !== fields.pw2)
      return toast.error('Invalid old password');

    setSubmitting(true);
    const token = localStorage.getItem('token');
    const res   = await fetch('/api/user/changePw', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: fields.old,
        new_password: fields.pw1,
      }),
    });

    setSubmitting(false);
    if (res.ok) {
      toast.success('Password updeted');
      setFields({ old: '', pw1: '', pw2: '' });
    } else {
      const { error } = await res.json();
      toast.error(error || 'Errore');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-12 border-t pt-8 space-y-6 max-w-md"
    >
      <h3 className="text-xl font-semibold">Change password</h3>

      {['old', 'pw1', 'pw2'].map((f, i) => (
        <div key={f}>
          <label className="block mb-1 text-sm font-bold">
            {['Old password', 'New password', 'Repeat new password'][i]}
          </label>
          <input
            type="password"
            name={f}
            value={fields[f]}
            onChange={change}
            required
            className="w-full border border-black px-4 py-3 rounded-md"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="custom-btn-usable gap-3 p-3 flex items-center justify-center cursor-pointer"
      >
        {submitting ? 'Saving…' : 'Save new password'}
      </button>
    </form>
  );
};

// --- profile form 
const ProfilePane = ({ user, onSave }) => {
  const [form, setForm] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => setForm(user), [user]);

const handleChange = (e) =>
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const submit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');

    //update profile api call
    const res = await fetch('/api/user/profileChanges', {
      method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(form),
     });

    // JSON check
    const isJson = res.headers
      .get('content-type')
      ?.includes('application/json');

    //check errors
    if (!res.ok) {
      const errMsg = isJson ? (await res.json()).error : await res.text();
      console.error('Update error:', errMsg);
      toast.error('update error')
      return;
    }

    //update
    const updatedUser = isJson ? await res.json() : form; 
    toast.success('profile details updated')
     onSave(updatedUser);
     setIsEditing(false);
  } catch (err) {
    toast.error('update error')
    console.error('Profile update error:', err);
  }
};


  return (
    <>
      <section>
        <form onSubmit={submit} className="space-y-6 max-w-md">
          <h2 className="text-3xl font-bold mb-4">Profile</h2>

          {['first_name', 'last_name', 'email'].map((f) => (
            <div key={f}>
              <label className="block font-semibold mb-1 capitalize">
                {f.replace('_', ' ')}
              </label>
              <input
                name={f}
                value={form?.[f] || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border px-4 py-3 rounded-md transition ${
                  isEditing
                    ? 'border-black focus:ring-orange-400'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
            </div>
          ))}

          {/* azioni */}
          {isEditing ? (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setForm(user);        // RESET
                  setIsEditing(false);
                }}
                className="py-3 px-6 border border-gray-400 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Discard Changes
              </button>

              <button
                type="submit"
                className="custom-btn-usable gap-3 p-3 flex items-center justify-center cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="custom-btn-usable gap-3 p-3 flex items-center justify-center cursor-pointer"
            >
              Edit Profile
            </button>
          )}
        </form>
    </section>
    <section>
      <PasswordPane/>
    </section>
  </>
  );
};




/* --------------------- TICKETS PANE ------------------------ */
const TicketsPane = ({ orders, userInfo }) => {
  /* filtriamo gli item di tipo tickets */
  const ticketItems = orders.filter(o => o.category === 'ticket');

  if (ticketItems.length === 0)
    return <p className="text-gray-600">Non hai biglietti acquistati.</p>;

  /* gruppo per order_id */
  const grouped = ticketItems.reduce((acc, o) => {
    acc[o.order_id] ??= []; acc[o.order_id].push(o); return acc;
  }, {});

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">I tuoi biglietti</h2>

      {Object.entries(grouped).map(([id, items]) => (
        <div key={id} className="mb-6 rounded-lg shadow-lg p-6">
          <div className="flex justify-between mb-3 border-b pb-1">
            <span className="font-semibold">Ordine #{id}</span>
            <span className="text-sm text-gray-600">
              {new Date(items[0].order_date).toLocaleDateString('it-IT')}
            </span>
          </div>

          {/* immagine + elenco biglietti */}
          <div className="flex items-center gap-4">
            <img src="/images/Ticket.png" alt="tickets"
                 className="w-16 h-16 object-cover rounded-md" />
            <ul className="divide-y text-sm flex-grow">
              {items.map((it, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <span>{it.type} × {it.quantity}</span>
                  <span>€{(it.price * it.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => generatePdf(id, items, userInfo)}
            className="custom-btn-usable gap-3 p-3 flex items-center justify-center cursor-pointer"
          >
            PDF Download
          </button>
        </div>
      ))}
    </div>
  );
};

/* ---------------------- MERCH PANE ------------------------- */
const MerchPane = ({ orders }) => {
  const merchItems = orders.filter(o => o.category === 'merch');

  if (merchItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-3xl font-bold mb-4">Ordini Merch</h2>
        <p className="text-gray-600 max-w-sm">
          Non hai ancora acquistato articoli di merchandising.
        </p>
      </div>
    );

  const grouped = merchItems.reduce((acc, o) => {
    acc[o.order_id] ??= []; acc[o.order_id].push(o); return acc;
  }, {});

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">I tuoi ordini Merch</h2>

      {Object.entries(grouped).map(([id, items]) => (
        <div key={id} className="mb-6 rounded-lg shadow-lg p-6">
          <div className="flex justify-between mb-3 border-b pb-1">
            <span className="font-semibold">Ordine #{id}</span>
            <span className="text-sm text-gray-600">
              {new Date(items[0].order_date).toLocaleDateString('it-IT')}
            </span>
          </div>

          {/* immagine + elenco merch */}
          <div className="flex items-center gap-4">
            <img src="/images/Merch.png" alt="merch"
                 className="w-16 h-16 object-cover rounded-md" />
            <ul className="divide-y text-sm flex-grow">
              {items.map((it, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <span>{it.type} × {it.quantity}</span>
                  <span>€{(it.price * it.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------- DASHBOARD MAIN ----------------------- */
export default function ProfileDashboard() {
  const router       = useRouter();
  const [section , setSection ] = useState('profile');  // profile | tickets | merch
  const [user    , setUser    ] = useState(null);
  const [orders  , setOrders  ] = useState([]);
  const [drawer  , setDrawer  ] = useState(false);

  /* ---- fetch user + orders on mount ---- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/tickets/signin'); return; }

    fetch('http://localhost:3001/orders/getOrders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        console.log('getOrders response:', data);
        setOrders(data.orders || []);
        setUser(data.infoUser?.[0] || null);
      })
      .catch(err => { console.error(err); router.push('/tickets'); });
  }, [router]);

  /* ---- sidebar markup  (desktop & mobile drawer) ---- */
  const sidebar = (
    <>
      {/* user header */}
      {user && (
        <div className="mb-8">
          <p className="font-bold text-2xl leading-tight mb-2">
            Welcome&nbsp;back&nbsp;{user.first_name}
          </p>
          <span className="text-xs font-semibold text-gray-500">{user.email}</span>
        </div>
      )}

      {/* nav links */}
      <nav className="space-y-2">
        <NavButton icon={FiUser}    label="Profile" active={section==='profile'}
                   onClick={() => { setSection('profile'); setDrawer(false); }} />
        <NavButton icon={FiTag}     label="Tickets" active={section==='tickets'}
                   onClick={() => { setSection('tickets'); setDrawer(false); }} />
        <NavButton icon={FiPackage} label="Merch"   active={section==='merch'}
                   onClick={() => { setSection('merch'); setDrawer(false); }} />
        <NavButton icon={FiArrowLeft} label="Back to shop"
                   onClick={() => router.push('/shop/tickets')} />
      </nav>
    </>
  );

  /* ---- render ---- */
  return (
    <div className="min-h-screen bg-white text-[#2e2b28] flex">

      {/* -------- Desktop permanent sidebar -------- */}
      <aside className="hidden md:block w-80 shrink-0 border-r border-gray-200 bg-white p-6">
        {sidebar}
      </aside>

      {/* -------- Mobile slide-in drawer -------- */}
      <aside
        className={`fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-40 p-6
                    transform transition-transform duration-300
                    ${drawer ? 'translate-x-0' : '-translate-x-full'}
                    md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setDrawer(false)}
        >
          <FiX />
        </button>
        {sidebar}
      </aside>

      {/* -------- Page content -------- */}
      <main className="flex-1 p-8 pb-18 overflow-y-auto">
        {!user
          ? <p className="text-center text-gray-500">Loading…</p>
          : section==='profile' ? <ProfilePane user={user} onSave={setUser}/>
          : section==='tickets' ? <TicketsPane orders={orders} userInfo={user}/>
          : <MerchPane orders={orders}/>
        }
      </main>

      {/* -------- Mobile bottom icon bar -------- */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full flex justify-around
                   border-t border-gray-200 bg-white py-2 z-20"
      >
        <NavButton
          className="flex-col gap-1 text-xs items-center"
          icon={FiUser}
          label="Profile"
          active={section==='profile'}
          onClick={() => setSection('profile')}
        />
        <NavButton
          className="flex-col gap-1 text-xs items-center"
          icon={FiTag}
          label="Tickets"
          active={section==='tickets'}
          onClick={() => setSection('tickets')}
        />
        <NavButton
          className="flex-col gap-1 text-xs items-center"
          icon={FiPackage}
          label="Merch"
          active={section==='merch'}
          onClick={() => setSection('merch')}
        />
      </nav>
    </div>
  );
}