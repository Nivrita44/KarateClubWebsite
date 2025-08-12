import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/instructors"
        );
        setInstructors(response.data);
      } catch (err) {
        setError("Failed to fetch instructors.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="flex flex-col items-center gap-4 py-16 px-4 md:px-12 text-gray-900">
      <h1 className="text-4xl font-bold text-primary mb-2">All Instructors</h1>
      <p className="sm:w-1/3 text-center text-sm text-primary mb-8">
        Browse through our list of skilled instructors.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white border border-blue-100 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.03]"
            onClick={() => navigate(`/instructor-public/${instructor.id}`)}>
            <img
              className="w-full h-52 object-cover bg-blue-50 rounded-t-xl"
              src={instructor.profilePic}
              alt={instructor.name}
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                <span>On Service</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {instructor.name}
              </p>
              <p className="text-sm text-gray-600">{instructor.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
