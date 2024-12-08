import React from "react";

const JournalList = ({ entries, onEdit, onDelete }) => {
  if (!entries.length) return <p className="text-center">No journal entries found.</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {entries.map((entry) => (
          <div className="col-md-4 mb-4" key={entry.entryID}>
            <div className="card">
              {entry.fileContent && (
                <img
                  src={entry.fileContent}
                  className="card-img-top"
                  alt={entry.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <p className="card-text">{entry.description}</p>
                <p>
                  <strong>Location:</strong> {entry.location.latitude}, {entry.location.longitude}
                </p>
                <button className="btn btn-warning me-2" onClick={() => onEdit(entry)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(entry.entryID)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalList;
