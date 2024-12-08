import React, { useState, useEffect } from "react";
import * as atlas from "azure-maps-control";

const JournalForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    entryID: "",
    userID: "",
    title: "",
    description: "",
    location: { latitude: 51.505, longitude: -0.09 }, // Default location
    fileContent: "",
    fileName: "",
  });

  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        location: initialData.location || { latitude: 51.505, longitude: -0.09 },
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (!mapRef.current) {
      const map = new atlas.Map("azureMapContainer", {
        center: [formData.location.longitude, formData.location.latitude],
        zoom: 12,
        showZoomButtons: true,
        authOptions: {
          authType: "subscriptionKey",
          subscriptionKey: process.env.REACT_APP_AZURE_MAPS_SUBSCRIPTION_KEY,
        },
      });

      // Add a marker to indicate the selected location
      const marker = new atlas.HtmlMarker({
        position: [formData.location.longitude, formData.location.latitude],
      });
      map.markers.add(marker);
      markerRef.current = marker;

      // Update location on map click
      map.events.add("click", (event) => {
        const { position } = event;
        if (position) {
          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position[1].toFixed(6),
              longitude: position[0].toFixed(6),
            },
          }));

          // Update marker position
          marker.setOptions({ position });
        }
      });

      mapRef.current = map;
    } else {
      // Re-center map and update marker position
      mapRef.current.setCamera({
        center: [formData.location.longitude, formData.location.latitude],
      });
      if (markerRef.current) {
        markerRef.current.setOptions({
          position: [formData.location.longitude, formData.location.latitude],
        });
      }
    }
  }, [formData.location]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch(process.env.REACT_APP_BLOB_UPLOAD_URL, {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          fileContent: data.blobUrl,
          fileName: file.name,
        }));
      } else {
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      entryID: "",
      userID: "",
      title: "",
      description: "",
      location: { latitude: 51.505, longitude: -0.09 },
      fileContent: "",
      fileName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="text-center mb-4">{formData.entryID ? "Edit Journal Entry" : "Create Journal Entry"}</h2>
      <div className="mb-3">
        <label className="form-label">Title *</label>
        <input
          type="text"
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description *</label>
        <textarea
          className="form-control"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Latitude</label>
        <input type="number" className="form-control" value={formData.location.latitude} readOnly />
      </div>
      <div className="mb-3">
        <label className="form-label">Longitude</label>
        <input type="number" className="form-control" value={formData.location.longitude} readOnly />
      </div>
      <h5 className="text-center mb-3">Select a Location</h5>
      <div
        id="azureMapContainer"
        style={{
          height: "400px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white", // Prevents browser highlighting behavior
        }}
      ></div>
      <div className="mb-3">
        <label className="form-label">Upload File *</label>
        <input type="file" className="form-control" onChange={handleFileUpload} required />
      </div>
      {formData.fileContent && (
        <div className="mb-3">
          <label className="form-label">Preview:</label>
          {formData.fileName.endsWith(".mp4") ? (
            <video controls width="100%">
              <source src={formData.fileContent} type="video/mp4" />
            </video>
          ) : (
            <img src={formData.fileContent} alt="Preview" style={{ width: "100%", height: "auto" }} />
          )}
        </div>
      )}
      <button type="submit" className="btn btn-primary w-100">
        {formData.entryID ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default JournalForm;
