import { useState } from "react";
import karateImage from "../assets/SUST_Karate.jpg";

const About = () => {
  const [activeTab, setActiveTab] = useState("About Us");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto mt-16 px-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column: Image */}
        <div className="relative">
          <img
            src={karateImage}
            alt="SUST Karate"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column: Description & Tabs */}
        <div className="text-center md:text-left">
          {/* Tab Buttons */}
          <div className="flex justify-center md:justify-start gap-6 mb-6">
            {["About Us", "Mission", "Vision"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-lg font-semibold transition duration-200 ${
                  activeTab === tab
                    ? "text-primary border-b-4 border-accent"
                    : "text-gray-500 hover:text-primary"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-base md:text-lg text-gray-700 leading-relaxed">
            {activeTab === "About Us" && (
              <p>
                SUST Karate Club is a leading martial arts club dedicated to
                self-defense and athletic excellence. Since launching in 2019,
                the club has empowered students—especially women—with confidence
                and discipline through competitive and practical training.
              </p>
            )}
            {activeTab === "Mission" && (
              <p>
                Our mission is simple: “Learn karate, be confident, protect
                yourself.” We aim to equip SUST students with self-defense
                skills while excelling in national and international
                competitions.
              </p>
            )}
            {activeTab === "Vision" && (
              <p>
                We envision SUST standing tall as a leading name in the karate
                circuit. Our goal is to build a safe and confident student
                community that thrives in both security and sportsmanship.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
