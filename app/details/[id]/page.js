import HeroSection from "@/components/details/HeroSection"
import EventDetails from "@/components/details/EventDetails"
import EventVenue from "@/components/details/EventVenue"

import { getEventById } from "@/db/queries";

const EventDetailsPage = async ({params: {id}}) => {
  const momentInfo = await getEventById(id);

  console.log(momentInfo);
  return (
    <>
      <HeroSection momentInfo={momentInfo} />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={momentInfo?.details} swags={momentInfo?.swags}/>
          <EventVenue location={momentInfo?.location}/>
        </div>
      </section>
    </>
  )
}

export default EventDetailsPage