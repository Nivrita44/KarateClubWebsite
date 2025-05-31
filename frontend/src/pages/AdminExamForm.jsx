import axios from "axios";
import { useState } from "react";

const AdminExamForm = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    belt: "",
    examiner: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/exams", form);
      setMessage("Exam routine added successfully");
      setForm({ date: "", time: "", belt: "", examiner: "", location: "" });
    } catch {
      setMessage("Failed to add exam routine");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Exam Routine</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="belt"
          placeholder="Belt Level (e.g. Green Belt)"
          value={form.belt}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="examiner"
          placeholder="Examiner"
          value={form.examiner}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-red-800 text-white px-4 py-2 rounded">
          Save Exam
        </button>
      </form>
    </div>
  );
};

export default AdminExamForm;
