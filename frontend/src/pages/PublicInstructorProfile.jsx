import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicInstructorProfile = () => {
  const { ins_id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ins_id) {
      setError("Invalid instructor ID.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:4000/api/instructor/${ins_id}`)
      .then((res) => setInstructor(res.data[0]))
      .catch(() => setError("Failed to fetch instructor."))
      .finally(() => setLoading(false));
  }, [ins_id]);

  if (loading)
    return <div className="text-center py-16 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-16">{error}</div>;
  if (!instructor)
    return (
      <div className="text-center text-gray-500 py-16">
        Instructor not found.
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-16 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-12">
        <img
          src={instructor.profilePic}
          alt={instructor.name}
          className="w-36 h-36 rounded-full mx-auto border-4 border-primary shadow-lg"
        />
        <h2 className="text-4xl font-extrabold text-primary mt-6">
          {instructor.name}
        </h2>
        <p className="text-2xl text-gray-700 font-medium mt-2">
          {instructor.position}
        </p>

        {/* Badges */}
        <div className="mt-5 flex justify-center gap-4 flex-wrap">
          {instructor.belt && (
            <span className="bg-primary text-accent text-sm px-5 py-2 rounded-full font-semibold shadow-sm">
              Belt: {instructor.belt}
            </span>
          )}
          {instructor.servingPeriod && (
            <span className="bg-accent text-primary text-sm px-5 py-2 rounded-full font-semibold shadow-sm">
              Serving Since: {instructor.servingPeriod}
            </span>
          )}
        </div>

        {/* About */}
        {instructor.about && (
          <p className="mt-8 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {instructor.about}
          </p>
        )}
      </div>

      {/* Contact Section */}
      <div className="grid sm:grid-cols-2 gap-8 text-lg text-gray-800 max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
        <div>
          <span className="font-semibold text-primary">📧 Email:</span>{" "}
          {instructor.email || "N/A"}
        </div>
        <div>
          <span className="font-semibold text-primary">📞 Phone:</span>{" "}
          {instructor.phone || "N/A"}
        </div>
      </div>
    </section>
  );
};

export default PublicInstructorProfile;
