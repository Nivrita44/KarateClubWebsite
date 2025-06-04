import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstructorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
          "http://localhost:4000/api/instructor-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

        const data = await response.json();
        

      if (response.ok) {
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role); // ✅ store role

        navigate("/instructor-dashboard");
        window.location.reload();
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Instructor Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-primary text-accent px-6 py-2 rounded-lg hover:bg-accent hover:text-primary transition duration-200 disabled:opacity-50"
              disabled={loading}>
              {loading ? "Logging in..." : "Login as Instructor"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InstructorLogin;
