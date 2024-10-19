'use client'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import ShinyButton from '@/components/ShinyButton'

export default function Home() {
  const { userId } = useAuth()
  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-300 flex flex-col justify-center items-center gap-10 md:gap-15">
      <div className="w-full max-w-[90%] md:max-w-[70%] mx-auto">
        <Image
          src="/Reflectify W logo.gif"
          alt="Reflectify Logo"
          width={320}
          height={180}
          className="w-80 md:w-[500px]"
        />
        <div className="text-4xl md:text-5xl font-bold mb-4">
          The Best Journal app out there
        </div>
      </div>
      <div className="w-full max-w-[90%] md:max-w-[70%] mx-auto">
        <p className="text-xl md:text-2xl text-slate-300/50 mb-4">
          This is the best place to keep track of your mood throughout your
          life. All you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <div className="w-[120px] md:w-[250px] rounded-lg bg-slate-700/40">
              <ShinyButton text={'get started'} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
