import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-14 pb-0 px-1 ${inter.className}`}
    >
      <Navbar page="home" />
      <div className="mt-5 bg-fixed bg-cover bg-center w-full h-[91vh]" style={{ backgroundImage: 'url("/home.png")' }}>
        <p className='font-sans text-6xl font-bold align-middle mt-56 ml-[15%] text-white  relative' >HORSE RACING</p>
      </div>
    </main>
  )
}
