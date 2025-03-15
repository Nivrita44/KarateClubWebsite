import { useState } from "react";

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
            src="images/hover-photo.jpg"
            alt="Main Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column: Description & Tabs */}
        <div className="text-center md:text-left">
          {/* Horizontal Tab Links */}
          <div className="flex justify-center gap-6 mb-6">
            <button
              onClick={() => handleTabChange("About Us")}
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === "About Us"
                  ? "text-blue-500 border-b-4 border-blue-600"
                  : "text-gray-600"
              } rounded-lg`}
            >
              About Us
            </button>
            <button
              onClick={() => handleTabChange("Mission")}
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === "Mission"
                  ? "text-blue-500 border-b-4 border-blue-600"
                  : "text-gray-600"
              } rounded-lg`}
            >
              Mission
            </button>
            <button
              onClick={() => handleTabChange("Vision")}
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === "Vision"
                  ? "text-blue-500 border-b-4 border-blue-600"
                  : "text-gray-600"
              } rounded-lg`}
            >
              Vision
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "About Us" && (
            <div className="tab-contents">
              <p className="text-lg text-gray-700">
                SUST Karate Club is one of the most active clubs at Daffodil
                International University. Launched in July 2019 to ensure the
                safety of the students, especially girls, the club has already
                won Gold, Silver, and Bronze multiple times for Daffodil
                International University by participating in national-level
                karate competitions.
              </p>
            </div>
          )}

          {activeTab === "Mission" && (
            <div className="tab-contents">
              <p className="text-lg text-gray-700">
                We are working on the theme "Learn karate, be confident &
                protect yourself". The main goal of the Karate-Do Club is to
                provide self-defense training to Daffodil students. Winning
                national and international competitions and spreading the
                reputation of Daffodil International University in the field of
                karate.
              </p>
            </div>
          )}

          {activeTab === "Vision" && (
            <div className="tab-contents">
              <p className="text-lg text-gray-700">
                We want our university's reputation to spread in the karate
                arena and to emerge as a strong competitor in the competition.
                Besides, let the students of our university stay safe at all
                times by learning self-defense.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
