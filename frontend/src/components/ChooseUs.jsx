import React from "react";

const ChooseUs = () => {
  return (
    <section className="choose-us-container flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-white">
      <div className="choose-content w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Self Defense */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Self Defense</h3>
              <p className="text-gray-600">
                Karate is an effective martial art for self-defense as well as
                being an exciting dynamic sport.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <i className="fas fa-lock text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Security</h3>
              <p className="text-gray-600">
                Karate also improves muscle strength and speed enabling you to
                react faster in life-threatening situations.
              </p>
            </div>
          </div>

          {/* Fitness */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <i className="fas fa-heartbeat text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fitness</h3>
              <p className="text-gray-600">
                Being fit and healthy and enjoying regular exercise helps to
                improve the mood and can make you feel happier.
              </p>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Confidence</h3>
              <p className="text-gray-600">
                Karate improves general well-being and vitality whilst
                encouraging assertiveness and self-confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* * Right-side Image * */}
      <div className="choose-image w-full md:w-1/2 mt-10 md:mt-0">
        <img
          src="/assets/image.png"
          alt="Karate Training"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default ChooseUs;
