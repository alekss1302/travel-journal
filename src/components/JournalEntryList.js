import React from "react";

const JournalEntryList = ({ entries, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Media</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.entryID}>
                        <td>{entry.title}</td>
                        <td>{entry.description}</td>
                        <td>{entry.location}</td>
                        <td>
                            {entry.mediaUrl && (
                                <img
                                    src={entry.mediaUrl}
                                    alt="Media"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                            )}
                        </td>
                        <td>
                            <button onClick={() => onEdit(entry)}>Edit</button>
                            <button onClick={() => onDelete(entry.entryID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JournalEntryList;
