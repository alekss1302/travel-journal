import React, { useState, useEffect } from "react";
import axios from "axios";
import JournalEntryForm from "../components/JournalEntryForm";
import JournalEntryList from "../components/JournalEntryList";

const JournalEntries = () => {
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENTRY_RETRIEVE_URL}/entries`);
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching entries:", error);
        }
    };

    const handleCreateOrUpdate = async () => {
        fetchEntries(); // Refresh the list after creating or updating an entry
        setEditingEntry(null); // Clear editing state
    };

    const handleEdit = (entry) => setEditingEntry(entry);

    const handleDelete = async (entryID) => {
        try {
            await axios.delete(`${process.env.REACT_APP_ENTRY_DELETE_URL}/entries/${entryID}`);
            fetchEntries(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting entry:", error);
        }
    };

    return (
        <div>
            <h1>Journal Entries</h1>
            <JournalEntryForm
                onSubmit={handleCreateOrUpdate}
                initialData={editingEntry || {}}
            />
            <JournalEntryList entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default JournalEntries;
