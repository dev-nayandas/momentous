import Image from 'next/image';
import ActionButtons from '../ActionButtons';
import { getBlurData } from '@/utils/blur-generator';

const HeroSection = async ({momentInfo}) => {
  const { base64 } = await getBlurData(momentInfo?.imageUrl);

  return (
    <section className="container">
      <div className="bg-gradient-to-b from-slate-200/20 to-slate-800/30">
        <Image
          src={momentInfo?.imageUrl}
          alt="Event 1"
          className="h-[450px] mx-auto"
          width={900}
          height={900}
          placeholder="blur"
          blurDataURL={base64}
          />
      </div>


      <div className="flex items-end">
        <div className="flex-auto py-4">
          <h1 className="font-bold text-2xl">{momentInfo?.name}</h1>
          <p className="text-[#9C9C9C] text-base mt-1">{momentInfo?.location}</p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{momentInfo?.interested_ids?.length} Interested</span>
            <span className="mx-2">|</span>
            <span>{momentInfo?.going_ids?.length} Going</span>
          </div>
        </div>

        <ActionButtons momentId={momentInfo?.id} interestedUserIds={momentInfo?.interested_ids} goingUserIds={momentInfo?.going_ids} fromDetails={true}/>
      </div>
    </section>
  )
}

export default HeroSection