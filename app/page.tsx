import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-950 flex justify-center items-center text-slate-300">
      <div className="w-full max-w-[320px] md:max-w-[600px] mx-auto">
        <h1 className="text-4xl md:text-6xl mb-[30px] md:mb-[70px]">
          The Best Journal app out there
        </h1>
        <p className="text-xl md:text-2xl text-slate-300/50 mb-4">
          This is best place to keep track of you mood though out your life. All
          you have to do is be honest
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-lg md:text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
