import React, { useState, useEffect } from "react";


const UserForm = ({ onSubmit, initialData }) => {
  const [user, setUser] = useState({
      id: "",
      name: "",
      email: "",
      bio: "",
  });

  useEffect(() => {
      if (initialData) {
          setUser(initialData);
      }
  }, [initialData]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (user.name && user.email) {
          onSubmit(user);
          setUser({ id: "", name: "", email: "", bio: "" }); // Clear form after submission
      }
  };

  return (
      <form
          onSubmit={handleSubmit}
          style={{
              maxWidth: "500px",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
          }}
      >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              {initialData ? "Edit User" : "Create User"}
          </h3>
          <div style={{ marginBottom: "15px" }}>
              <label
                  htmlFor="name"
                  style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
              >
                  Name *
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                  style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                  }}
              />
          </div>
          <div style={{ marginBottom: "15px" }}>
              <label
                  htmlFor="email"
                  style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
              >
                  Email *
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                  }}
              />
          </div>
          <div style={{ marginBottom: "15px" }}>
              <label
                  htmlFor="bio"
                  style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
              >
                  Bio
              </label>
              <textarea
                  id="bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                  }}
              />
          </div>
          <button
              type="submit"
              style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
              }}
          >
              {initialData ? "Update" : "Submit"}
          </button>
      </form>
  );
};

export default UserForm;
