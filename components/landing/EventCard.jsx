import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";
import MomentSchemaScript from "../meta/MomentSchemaScript";

const EventCard = ({ moment }) => {
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <MomentSchemaScript moment={moment} />
      <Image
        src={moment?.imageUrl}
        alt={moment?.name}
        className="w-full"
        width={500}
        height={500}
      />

      <div className="p-3">
        <Link href={`/details/${moment?.id}`} className="font-bold text-lg">
          {moment?.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{moment?.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{moment?.interested_ids?.length} Interested</span>
          <span className="mx-1">|</span>
          <span>{moment?.going_ids?.length} Going</span>
        </div>
        <ActionButtons
          momentId={moment?.id}
          interestedUserIds={moment?.interested_ids}
          goingUserIds={moment?.going_ids}
        />
      </div>
    </div>
  );
};

export default EventCard;
