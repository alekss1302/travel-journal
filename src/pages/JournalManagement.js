import React, { useState, useEffect } from "react";
import axios from "axios";
import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";

const JournalManagement = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchEntries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.REACT_APP_JOURNAL_RETRIEVE_URL);
            const data = Array.isArray(response.data) ? response.data : [];
            setEntries(data);
            setFilteredEntries(data);
            setMessage("");
        } catch (error) {
            console.error("Error fetching entries:", error);
            setMessage("Failed to fetch journal entries.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    useEffect(() => {
        const filtered = entries.filter((entry) =>
            entry.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEntries(filtered);
    }, [searchQuery, entries]);

    const handleFormSubmit = async (entry) => {
        try {
            if (entry.entryID) {
                await axios.put(`${process.env.REACT_APP_JOURNAL_UPDATE_URL}/${entry.entryID}`, entry);
                setMessage("Journal entry updated successfully!");
            } else {
                await axios.post(process.env.REACT_APP_JOURNAL_CREATE_URL, entry);
                setMessage("Journal entry created successfully!");
            }
            fetchEntries();
            setEditingEntry(null);
        } catch (error) {
            console.error("Error saving journal entry:", error);
            setMessage("Failed to save journal entry.");
        }
    };

    const handleEdit = (entry) => setEditingEntry(entry);

    const handleDelete = async (entryID) => {
        if (window.confirm("Are you sure you want to delete this journal entry?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_JOURNAL_DELETE_URL}/${entryID}`);
                setMessage("Journal entry deleted successfully!");
                fetchEntries();
            } catch (error) {
                console.error("Error deleting journal entry:", error);
                setMessage("Failed to delete journal entry.");
            }
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>Journal Entries</h1>
            {message && (
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: message.includes("Failed") ? "red" : "green",
                    }}
                >
                    {message}
                </div>
            )}
            <div style={{ maxWidth: "500px", margin: "0 auto 20px" }}>
                <input
                    type="text"
                    placeholder="Search journal entries by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            </div>
            {loading ? <p>Loading...</p> : <JournalList entries={filteredEntries} onEdit={handleEdit} onDelete={handleDelete} />}
            <JournalForm onSubmit={handleFormSubmit} initialData={editingEntry} />
        </div>
    );
};

export default JournalManagement;
