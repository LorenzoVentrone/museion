"use client";

import Image from "next/image";
import { Button } from "../components/Button";
import { Navbar } from "../components/navBar";
import { useRouter } from "next/navigation"; // Importa il router di Next.js

export default function Home() {
  const router = useRouter(); // Inizializza il router

  return (
    <main className="bg-[#ede7db] text-[#1E1E1E] min-h-screen font-['EB_Garamond']">
      {/* Header */}
      <Navbar>
        <Button 
        className="outline text-gray-600 border-2 boarder-gray-600 mr-10 hover:text-[#9c7933]"
        onClick={() => router.push("/Ticket")}>
          Acquista Biglietto
        </Button>
      </Navbar>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-auto pt-[70px]">
        <div className="absolute inset-0">
          <Image 
            src="/images/Homepage_cover.png" 
            alt="Hero Art" 
            layout="fill" 
            className="object-cover object-top z-0 opacity-90"
          />
        </div>
        <div className="z-10 max-w-2xl px-4">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Dove l'arte prende vita</h2>
          <p className="mb-6 text-white">Un viaggio tra arte classica e contemporanea</p>
          <div className="space-x-4">
            <Button className="outline  text-white border-2 boarder-white hover:text-[#d1c9b2]">Scopri il museo</Button>
            <Button 
              className="outline text-white border-2 boarder-white hover:text-[#d1c9b2]"
              onClick={() => router.push("/virtualTour")}>
              Tour Virtuale
            </Button>
          </div>
        </div>
      </section>

      {/* Collezioni */}
      <section id="collections" className="py-16 px-6">
        <h3 className="text-3xl text-black font-semibold text-center mb-12">Collezioni principali</h3>
        <div className="flex gap-8 overflow-x-auto px-4">
          {[
            { title: "Rinascimento", image: "/images/rinascimento.png", link: "/rinascimento" }, //add page
            { title: "Arte Moderna", image: "/images/Vincent_van_Gogh.jpg", link: "/arte-moderna" }, //add page
            { title: "Contemporanea", image: "/images/Geometric-Abstract-Art.jpg", link: "/contemporanea" }, //add page
            { title: "Sculture", image: "/images/Michelangelo.jpg", link: "/sculture" },
          ].map((collection) => (
            <a 
              key={collection.title} 
              href={collection.link} 
              className="min-w-[300px] text-gray-600 shadow-lg rounded-2xl overflow-hidden custom-scroll bg-[#f5f2e7] hover:shadow-xl opacity-85 hover:opacity-100 transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src={collection.image} 
                  alt={collection.title} 
                  layout="fill" 
                  className="object-cover rounded-t-2xl" // Usa la classe Tailwind "object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-medium mb-2">{collection.title}</h4>
                <p className="text-sm text-gray-600">
                  Esplora la nostra selezione curata di {collection.title.toLowerCase()}.
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Mostre */}
      <section id="exhibitions" className="py-16 px-6">
        <h3 className="text-3xl text-black font-semibold text-center mb-12">Mostre ed eventi</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="shadow rounded-2xl p-6 bg-[#f5f2e7]">
              <h4 className="text-xl text-gray-600 font-medium mb-2">Mostra speciale {i}</h4>
              <p className="text-gray-600 mb-4">Descrizione breve della mostra. Data, luogo e artisti in evidenza.</p>
              <Button variant="link">Scopri di più →</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Visita */}
      <section id="visit" className="py-16 px-6 text-center grid place-items-center">
        <h3 className="text-3xl text-black font-semibold mb-6">Pianifica la tua visita</h3>
        <p className="mb-4 text-gray-600">Scopri orari, prezzi e come raggiungerci.</p>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 px-6 text-center bg-black">
        <p className="mb-2">© 2025 Museion. Tutti i diritti riservati.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Newsletter</a>
        </div>
      </footer>
    </main>
  );
}
