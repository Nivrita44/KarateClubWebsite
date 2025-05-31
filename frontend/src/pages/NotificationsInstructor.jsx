import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [newNotification, setNewNotification] = useState("");
    const [notificationType, setNotificationType] = useState("announcement");
    const [editingId, setEditingId] = useState(null);
    const [editMessage, setEditMessage] = useState("");


  useEffect(() => {
    fetchStudents();
    fetchNotifications();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:4000/api/students");
    setStudents(res.data);
  };

  const fetchNotifications = async () => {
    const res = await axios.get("http://localhost:4000/api/notifications");
    setAnnouncements(res.data);
  };

  const sendNotification = async () => {
    if (!newNotification.trim()) return;

    try {
      await axios.post("http://localhost:4000/api/notifications", {
        message: newNotification,
        type: notificationType,
        studentId: selectedStudentId || null,
      });

      setNewNotification("");
      setSelectedStudentId("");
      setNotificationType("announcement");
      fetchNotifications();
    } catch {
      alert("Failed to send notification");
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditMessage(note.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/notifications/${id}`, {
        message: editMessage,
        type: "announcement",
      });
      fetchNotifications();
      cancelEdit();
    } catch {
      alert("Failed to update announcement");
    }
  };
    
  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    try {
      await axios.delete(`http://localhost:4000/api/notifications/${id}`);
      fetchNotifications();
    } catch {
      alert("Failed to delete announcement");
    }
  };
  
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Send Notifications</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <select
          className="w-full border p-2 rounded mb-2"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}>
          <option value="">All Students</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} (ID: {s.id})
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 rounded mb-2"
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}>
          <option value="announcement">Announcement</option>
          <option value="belt">Belt Update</option>
          <option value="certificate">Certificate Uploaded</option>
          <option value="payment">Payment Success</option>
        </select>

        <textarea
          rows={3}
          placeholder="Write your message..."
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={sendNotification}
          className="bg-red-800 text-white px-4 py-2 rounded mt-2 hover:bg-red-700">
          Send Notification
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Previous Notifications</h2>
      <ul className="bg-white p-4 rounded shadow divide-y">
        {announcements.map((note) => (
          <li key={note.id} className="py-2 text-sm text-gray-700">
            {editingId === note.id ? (
              <div>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full border p-2 mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded">
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <p>📣 {note.message}</p>
                  <div className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(note)}
                    className="text-red-500 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(note.id)}
                    className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
