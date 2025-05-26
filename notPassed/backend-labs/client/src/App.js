import React, { useState, useOptimistic, useEffect } from "react";
import DataSet from "./comps/DataSet";

const App = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, action) => {
      switch (action.type) {
        case "add":
          return [...state, action.comment];
        case "delete":
          return state.filter((comment) => !action.ids.includes(comment.id));
        case "update":
          return state.map((comment) =>
            comment.id === action.comment.id ? action.comment : comment
          );
        default:
          return state;
      }
    }
  );

  const API_URL = 'http://localhost:5018/comments';

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments()
  }, []);

  const handleAddComment = async (newComment) => {
    setShowAddModal(false);
    const tempId = Date.now();
    const optimisticComment = { ...newComment, id: tempId };

    addOptimisticComment({ type: "add", comment: optimisticComment });

    try {
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to add comment");

      const data = await response.json();
      setComments((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
      setComments((prev) => prev.filter((comment) => comment.id !== tempId));
    }
  };

  const handleDeleteComments = async (selectedRows) => {
    const idsToDelete = Array.from(selectedRows).map(
      (index) => optimisticComments[index].id
    );

    addOptimisticComment({ type: "delete", ids: idsToDelete });

    try {
      const deletePromises = idsToDelete.map((id) =>
        fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        })
      );

      const responses = await Promise.all(deletePromises);
      const allOk = responses.every((response) => response.ok);

      if (!allOk) throw new Error("Some deletions failed");

      setComments((prev) =>
        prev.filter((comment) => !idsToDelete.includes(comment.id))
      );
    } catch (err) {
      setError(err.message);
      fetchComments();
    }
  };

  const handleUpdateComment = async (index, updatedComment) => {
    const originalComment = optimisticComments[index];

    addOptimisticComment({
      type: "update",
      comment: { ...originalComment, ...updatedComment },
    });

    try {
      const response = await fetch(
        `${API_URL}/${originalComment.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedComment),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update comment");

      const data = await response.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === originalComment.id ? data : comment
        )
      );
    } catch (err) {
      setError(err.message);
      fetchComments();
    }
  };

  const header = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "body", title: "Comment" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: '20px' }}>
      {showAddModal && (
        <AddCommentModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddComment}
        />
      )}

      <DataSet
        data={optimisticComments}
        header={header}
        renderHeader={(header) => <strong>{header}</strong>}
        renderCell={(cell) => cell}
        onDeleteSelected={handleDeleteComments}
        onUpdateItem={handleUpdateComment}
        setShowAddModal={setShowAddModal}
      />
    </div>
  );
};

const AddCommentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      email: formData.email,
      body: formData.body,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Comment:
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                minHeight: "100px",
              }}
              required
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;