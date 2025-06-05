import axios from "axios";
import { useEffect, useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchAll = async () => {
    const res = await axios.get("http://localhost:4000/api/announcements");
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.content) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.file) {
      formData.append("attachment", form.file);
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:4000/api/announcements/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:4000/api/announcements", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ title: "", content: "", file: null });
      setEditingId(null);
      fetchAll();
    } catch (err) {
      console.error("Announcement submission failed:", err);
      alert("Failed to post announcement");
    }
  };

  const handleEdit = (announcement) => {
    setForm({ title: announcement.title, content: announcement.content });
    setEditingId(announcement.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/announcements/${id}`);
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto p-6" style={{ backgroundColor: "#E8E3DD" }}>
      <h1 className="text-2xl font-bold mb-4 text-black border-b border-black pb-2">
        Manage Announcements
      </h1>

      <div className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <input
          className="w-full border p-2 rounded text-sm"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded text-sm"
          placeholder="Content"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          className="w-full border p-2 rounded text-sm"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-[#F3E8A8] px-4 py-2 rounded hover:opacity-90 transition text-sm"
        >
          {editingId ? "Update Announcement" : "Post Announcement"}
        </button>
      </div>

      <ul className="divide-y bg-white p-4 rounded shadow">
        {announcements.map((a) => (
          <li key={a.id} className="py-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg text-black">{a.title}</h3>
                <p className="text-gray-800 text-sm">{a.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-black underline hover:opacity-70"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-black underline hover:opacity-70"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
