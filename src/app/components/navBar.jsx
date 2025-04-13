import Image from "next/image";

export function Navbar({children}){
    return(
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-1 border-b border-gray-100 z-50 shadow-md bg-[#ede7db]">
              <div className="flex items-center gap-2">
                <a href="/">
                  <Image 
                    src={"/images/Museion_Logo.png"}
                    width={150}
                    height={70}
                    alt="Museion Logo"
                  />
                </a>
              </div>
                <nav className="space-x-6 flex-1 flex justify-center">
                  <a href="#collections" className="hover:underline text-gray-600">Collezioni</a>
                  <a href="#exhibitions" className="hover:underline text-gray-600">Mostre</a>
                  <a href="#visit" className="hover:underline text-gray-600">Visita</a>
                  <a href="#contact" className="hover:underline text-gray-600">Contatti</a>
                </nav>

                <div className="flex items-center">
                    {children}
                </div>
        </header>
    )
}