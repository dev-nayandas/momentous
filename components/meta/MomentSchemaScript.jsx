const EventSchemaScript = ({ moment }) => {
    const momentName = encodeURIComponent(moment?.name);


    const formattedData = {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: momentName,
      startDate: new Date(),
      endDate: new Date(),
      description: moment?.details,
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: moment?.location
      },
      image: [moment?.imageUrl],
      organizer: {
        "@type": "Organization",
        name: "Momentous",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(formattedData),
          }}
        />
      </>
    );
  };

  export default EventSchemaScript;
