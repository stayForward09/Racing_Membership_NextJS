import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-14 pb-0 px-1 ${inter.className}`}
    >
      <Navbar page="home" />
      <div className="row">
        <p className='font-sans text-[#001449] text-5xl font-bold align-middle mt-64 text-center relative' >{"WELCOME TO TPR'S RACING DASHBOARD"}</p>
      </div>
    </main>
  )
}
