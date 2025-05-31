import axios from "axios";
import { useEffect, useState } from "react";

export default function AllAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/announcements")
      .then((res) => setAnnouncements(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Club Announcements</h1>
      <ul className="divide-y">
        {announcements.map((a) => (
          <li key={a.id} className="py-4">
            <h2 className="text-lg font-semibold">{a.title}</h2>
            <p>{a.content}</p>
            {a.attachmentUrl && (
              <a
                href={a.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 underline text-sm">
                📎 View Attachment
              </a>
            )}

            <p className="text-xs text-gray-400 mt-1">
              {new Date(a.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
