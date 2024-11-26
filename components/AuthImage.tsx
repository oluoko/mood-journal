import Image from 'next/image'

const AuthImage = ({ textColor }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={`text-xl md:text-3xl font-bold w-2/3 mb-4 text-${textColor}`}
      >
        An AI Powered Journal app that helps you reflect on your life, analysing
        your mood and emotions.
      </div>
      <Image
        src="/Reflectify W logo.gif"
        alt="Reflectify Logo"
        width={320}
        height={180}
        className="w-2/5"
      />
    </div>
  )
}

export default AuthImage
