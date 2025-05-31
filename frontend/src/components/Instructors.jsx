import axios from "axios"; // Make sure axios is installed
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]); // State to store instructors
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  const navigate = useNavigate();

  // Fetch instructor data when the component mounts
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/instructors"
        ); // API call to fetch instructors
        setInstructors(response.data); // Set the fetched instructors data to state
      } catch (err) {
        setError("Failed to fetch instructors.");
      } finally {
        setLoading(false); // Stop loading when the request is complete
      }
    };

    fetchInstructors();
  }, []); // Empty dependency array ensures this runs only once after component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">All Instructors</h1>
      <p className="sm:w-1/3 text-center text-sm text-red-800">
        Browse through our list of skilled instructors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
        {instructors.map((instructor) => (
          <div
            key={instructor.id} // Unique key for each instructor
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500"
            onClick={() => navigate(`/instructor-profile/${instructor.id}`)} // Navigate to instructor profile page
          >
            <img
              className="bg-blue-50"
              src={instructor.profilePic} // Profile picture
              alt={instructor.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">
                {instructor.name}
              </p>
              <p className="text-gray-600 text-sm">{instructor.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
{
  /* <button
  onClick={() => {
    navigate("/instructors");
    scrollTo(0, 0);
  }}
  className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">
  more
</button>; */
}
