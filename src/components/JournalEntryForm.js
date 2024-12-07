import React, { useState } from "react";
import axios from "axios";

const JournalEntryForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        location: initialData?.location || "",
        media: initialData?.media || null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, media: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
        try {
            if (formData.entryID) {
                await axios.put(`${process.env.REACT_APP_ENTRY_UPDATE_URL}/entries/${formData.entryID}`, formDataToSend);
            } else {
                await axios.post(`${process.env.REACT_APP_ENTRY_CREATE_URL}/entries`, formDataToSend);
            }
            onSubmit(); // Refresh list or close form
        } catch (error) {
            console.error("Error submitting journal entry:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Media:</label>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default JournalEntryForm;
