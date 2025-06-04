import img1 from "../assets/img1.jpg";

const ChooseUs = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-background">
      {/* Left Column */}
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-8 text-primary">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "fa-shield-alt",
              title: "Self Defense",
              desc: "Karate is an effective martial art for self-defense as well as being an exciting dynamic sport.",
            },
            {
              icon: "fa-lock",
              title: "Security",
              desc: "Karate improves muscle strength and reaction time in life-threatening situations.",
            },
            {
              icon: "fa-heartbeat",
              title: "Fitness",
              desc: "Regular training improves your mood and physical well-being.",
            },
            {
              icon: "fa-check-circle",
              title: "Confidence",
              desc: "Karate boosts vitality, assertiveness, and self-confidence.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-primary p-4 rounded-full text-accent shadow-lg">
                <i className={`fas ${item.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
        <img
          src={img1}
          alt="Karate Training"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default ChooseUs;
