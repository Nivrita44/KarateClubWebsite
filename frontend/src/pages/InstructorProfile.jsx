import axios from "axios";
import { useEffect, useState } from "react";

const beltOptions = [
  "White Belt",
  "Yellow Belt",
  "Orange Belt",
  "Green Belt",
  "Blue Belt",
  "Purple Belt",
  "Brown Belt",
  "Black Belt",
];

const InstructorProfile = () => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [instructor, setInstructor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/instructor/${userId}`
        );
        setInstructor(response.data[0]);
        setPreview(response.data[0].profilePic);
      } catch (err) {
        console.error("Failed to load instructor profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && role === "instructor") fetchInstructor();
  }, [userId, role]);

  const handleChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:4000/api/upload", formData)
      .then((res) => {
        setInstructor({ ...instructor, profilePic: res.data.url });
      })
      .catch(() => alert("Image upload failed."));
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = { ...instructor };
      if (password) payload.password = password;

      await axios.put(
        `http://localhost:4000/api/instructor/${userId}`,
        payload
      );
      setIsEdit(false);
      setPassword("");
      setConfirmPassword("");
      setToast("Profile updated successfully!");

      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      alert("Failed to save profile.");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!instructor)
    return <div className="text-center py-10 text-red-600">Unauthorized</div>;

  return (
    <section className="max-w-4xl mx-auto mt-12 bg-background shadow-lg rounded-xl p-8 font-formal text-primary">
  {toast && (
    <div className="mb-4 text-center bg-green-100 text-green-700 py-2 px-4 rounded shadow">
      {toast}
    </div>
  )}

  <div className="flex flex-col items-center gap-4">
    <img
      src={preview}
      alt="Profile"
      className="w-36 h-36 rounded-full border-4 border-accent shadow-lg"
    />
    {isEdit && (
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm mt-2"
      />
    )}
    <h1 className="text-3xl font-semibold">{instructor.name}</h1>
    <p className="text-primary font-semibold">{instructor.position}</p>
  </div>

  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[
      { label: "Email", name: "email" },
      { label: "Phone", name: "phone" },
      { label: "Study Background", name: "studyBackground" },
      { label: "Achievements", name: "achievements" },
      { label: "Serving Period", name: "servingPeriod" },
    ].map(({ label, name }) => (
      <div key={name}>
        <label className="block text-sm font-medium text-primary">{label}</label>
        {isEdit ? (
          <input
            type="text"
            name={name}
            value={instructor[name] || ""}
            onChange={handleChange}
            className="w-full mt-1 border border-accent bg-white rounded-lg px-4 py-2 text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        ) : (
          <p className="mt-1">{instructor[name] || "—"}</p>
        )}
      </div>
    ))}

    <div>
      <label className="block text-sm font-medium text-primary">Belt</label>
      {isEdit ? (
        <select
          name="belt"
          value={instructor.belt || ""}
          onChange={handleChange}
          className="w-full mt-1 border border-accent bg-white rounded-lg px-4 py-2 text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent">
          <option value="">Select Belt</option>
          {beltOptions.map((belt) => (
            <option key={belt} value={belt}>
              {belt}
            </option>
          ))}
        </select>
      ) : (
        <p className="mt-1">{instructor.belt || "—"}</p>
      )}
    </div>

    <div className="flex justify-center mt-4">
      <button
        className="bg-accent text-primary px-5 py-2 rounded-lg hover:brightness-110 transition"
        onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? "Cancel" : "Edit Profile"}
      </button>
    </div>

    {isEdit && (
      <>
        <div>
          <label className="block text-sm font-medium text-primary">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 border border-accent rounded-lg px-4 py-2 text-primary shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 border border-accent rounded-lg px-4 py-2 text-primary shadow-sm"
          />
        </div>
      </>
    )}
  </div>

  {isEdit && (
    <div className="mt-8 text-center">
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
        Save Changes
      </button>
    </div>
  )}
</section>

  );
};

export default InstructorProfile;
