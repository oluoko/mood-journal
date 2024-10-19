import Image from 'next/image'
import creatorImage from '/public/creator.png'

const CreatorImage = () => {
  return (
    <Image
      src={creatorImage}
      alt="creator"
      width={50}
      height={50}
      className="rounded-1/2"
    />
  )
}

export default CreatorImage
