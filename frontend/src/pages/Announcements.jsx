import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>

      <div className="space-y-4 mb-6">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Announcement" : "Post Announcement"}
        </button>
      </div>

      <ul className="divide-y">
        {announcements.map((a) => (
          <li key={a.id} className="py-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <p className="text-gray-700">{a.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:underline">
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
