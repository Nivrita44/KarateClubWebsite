import React, { useEffect, useState } from "react";
import axios from "axios";

const beltColors = {
  "White Belt": "bg-gray-200 text-gray-800",
  "Yellow Belt": "bg-yellow-300 text-yellow-900",
  "Orange Belt": "bg-orange-400 text-white",
  "Green Belt": "bg-green-400 text-white",
  "Blue Belt": "bg-blue-400 text-white",
  "Purple Belt": "bg-purple-400 text-white",
  "Brown Belt": "bg-amber-600 text-white",
  "Black Belt": "bg-black text-white",
};

const beltOptions = Object.keys(beltColors);

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkBelt, setBulkBelt] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleBeltChange = (id, newBelt) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, belt: newBelt } : s))
    );
  };

  const handleCertificateUpload = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("certificate", file);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/upload-certificate",
        formData
      );
      const certificateUrl = res.data.url;
      setStudents((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, certificate: certificateUrl } : s
        )
      );
    } catch {
      alert("Upload failed");
    }
  };

  const handleSave = async (id) => {
    const student = students.find((s) => s.id === id);
    try {
      await axios.put(`http://localhost:4000/api/students/${id}`, {
        belt: student.belt,
        certificate: student.certificate,
      });
      setToast("Student updated");
      setTimeout(() => setToast(""), 3000);
    } catch {
      alert("Failed to update student");
    }
  };

  const handleBulkUpdate = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.put(`http://localhost:4000/api/students/${id}`, {
            belt: bulkBelt,
          })
        )
      );
      fetchStudents();
      setToast("Bulk belt update complete");
      setSelectedIds([]);
      setBulkBelt("");
      setTimeout(() => setToast(""), 3000);
    } catch {
      alert("Bulk update failed");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading students...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      {toast && (
        <div className="bg-green-100 text-green-800 py-2 px-4 mb-4 rounded">
          {toast}
        </div>
      )}

      {/* Search & Bulk Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={bulkBelt}
          onChange={(e) => setBulkBelt(e.target.value)}
          className="border px-3 py-2 rounded">
          <option value="">Assign belt to selected</option>
          {beltOptions.map((belt) => (
            <option key={belt} value={belt}>
              {belt}
            </option>
          ))}
        </select>
        <button
          onClick={handleBulkUpdate}
          disabled={!bulkBelt || selectedIds.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
          Apply to {selectedIds.length} students
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-red-100 text-red-700 text-left">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.length === students.length}
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? students.map((s) => s.id) : []
                    )
                  }
                />
              </th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Belt</th>
              <th className="px-4 py-2">Certificate</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(student.id)}
                    onChange={() => toggleSelect(student.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={student.imageUrl}
                    className="w-10 h-10 rounded-full"
                    alt={student.name}
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      beltColors[student.belt] || "bg-gray-100 text-gray-600"
                    }`}>
                    {student.belt || "Unassigned"}
                  </span>
                  <select
                    className="mt-1 block w-full border px-2 py-1 rounded"
                    value={student.belt || ""}
                    onChange={(e) =>
                      handleBeltChange(student.id, e.target.value)
                    }>
                    <option value="">Change belt</option>
                    {beltOptions.map((belt) => (
                      <option key={belt} value={belt}>
                        {belt}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  {student.certificate ? (
                    <a
                      href={student.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline">
                      View
                    </a>
                  ) : (
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleCertificateUpload(e, student.id)}
                      className="text-xs"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSave(student.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
