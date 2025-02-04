import { getAllMoments } from "@/db/queries";
import EventCard from "./EventCard";

const EventList = async ({query}) => {
  const allMoments = await getAllMoments(query);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {allMoments.map((moment) => (
        <EventCard key={moment?.id} moment={moment} />
      ))}
    </div>
  );
};

export default EventList;
