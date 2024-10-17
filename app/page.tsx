import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const { userId } = await auth()
  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-slate-950  text-slate-300 flex flex-col justify-center items-center gap-10 md:gap-15">
      <div className="w-full max-w-[90%] md:max-w-[70%] mx-auto ">
        <Image
          src="/Reflectify W logo.gif"
          alt="Reflectify Logo"
          width={320}
          height={180}
          className="w-80 md:w-[500px] "
        />
        <div className="text-4xl md:text-5xl font-bold mb-4">
          The Best Journal app out there
        </div>
      </div>
      <div
        className="w-full max-w-[90%] md:max-w-[70%] mx-auto
    "
      >
        <p className="text-xl md:text-2xl text-slate-300/50 mb-4">
          This is best place to keep track of you mood though out your life. All
          you have to do is be honest
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-lg md:text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
