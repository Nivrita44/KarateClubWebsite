import event1 from "../assets/event1.jpg";
// import event2 from "../assets/event2.jpg";
// import event3 from "../assets/event3.jpg";

const upcomingEvents = [
  {
    id: 1,
    title: "Inter Karate Tournament",
    description:
      "1st Shahjalal University of Science and Technology, Sylhet Inter Karate Tournament will be held on December 2022.",
        date: { day: "1", month: "Dec", year: "2022" },
    image:
      event1,
  },
  {
    id: 2,
    title: "Project Rokkhi Fall 2022",
    description:
      "Shahjalal University of Science and Technology, Sylhet is organizing Project Rokkhi Fall 2022 from Nov 15-20 in the campus.",
    date: { day: "15", month: "Nov", year: "2022" },
  },
  {
    id: 3,
    title: "Project Rokkhi Summer 2022",
    description:
      "Shahjalal University of Science and Technology, Sylhet is organizing Project Rokkhi Summer 2022 from June 22-25 in the campus.",
    date: { day: "22", month: "Jun", year: "2022" },
  },
];

const UpcomingEvents = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-gray-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold">{event.date.day}</span>
                <span className="text-sm">{event.date.month}</span>
                <span className="text-sm">{event.date.year}</span>
              </div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
