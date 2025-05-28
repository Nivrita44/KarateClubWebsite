import React, { useEffect, useState } from "react";
import axios from "axios";

const EditAboutClub = () => {
  const [content, setContent] = useState({
    about: "",
    mission: "",
    vision: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/api/about").then((res) => {
      const loaded = { about: "", mission: "", vision: "" };
      res.data.forEach((item) => (loaded[item.section] = item.content));
      setContent(loaded);
    });
  }, []);

  const handleChange = (section, value) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:4000/api/about", content);
      alert("About Club content updated.");
    } catch {
      alert("Failed to update.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit About Club</h1>

      {["about", "mission", "vision"].map((section) => (
        <div key={section} className="mb-4">
          <label className="block font-semibold capitalize mb-1">
            {section}
          </label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={content[section]}
            onChange={(e) => handleChange(section, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditAboutClub;
