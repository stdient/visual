import React, { useState, useEffect } from 'react';
import DataSet from './DataSet';
import '../App.css'

const CommentsApp = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [optimisticUpdates, setOptimisticUpdates] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleRowSelect = (rowId, isCtrlPressed) => {
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);

      if (isCtrlPressed) {

        if (newSelected.has(rowId)) {
          newSelected.delete(rowId);
        } else {
          newSelected.add(rowId);
        }
      } else {

        if (newSelected.has(rowId)) {
          newSelected.clear();
        } else {
          newSelected.clear();
          newSelected.add(rowId);
        }
      }

      return newSelected;
    });
  };


  const handleAddComment = async () => {
    const tempId = Date.now();
    const commentToAdd = { ...newComment, id: tempId };


    setComments(prev => [...prev, commentToAdd]);
    setOptimisticUpdates(prev => [...prev, tempId]);
    setNewComment({ name: '', email: '', body: '' });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(commentToAdd),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Failed to add comment');

      const data = await response.json();


      setComments(prev => prev.map(c => c.id === tempId ? data : c));
    } catch (err) {
      console.error('Error adding comment:', err);

      setComments(prev => prev.filter(c => c.id !== tempId));
    } finally {
      setOptimisticUpdates(prev => prev.filter(id => id !== tempId));
    }
  };


  const handleDeleteSelected = async () => {
    if (selectedRows.size === 0) return;

    const rowsToDelete = Array.from(selectedRows);
    const originalComments = [...comments];


    setComments(prev => prev.filter(c => !selectedRows.has(c.id)));
    setSelectedRows(new Set());

    try {
      await Promise.all(
        rowsToDelete.map(id =>
          fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE'
          })
        )
      );
    } catch (err) {
      console.error('Error deleting comments:', err);

      setComments(originalComments);
    }
  };


  const handleUpdateComment = async (id, updatedData) => {
    const originalComments = [...comments];


    setComments(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Failed to update comment');
    } catch (err) {
      console.error('Error updating comment:', err);

      setComments(originalComments);
    }
  };


  const handleCellChange = (row, column, value) => {
    handleUpdateComment(row.id, { [column.key]: value });
  };


  const renderCell = (row, column) => {
    if (column.key === 'id') return row.id;

    return (
      <input
        type="text"
        value={row[column.key]}
        onChange={(e) => handleCellChange(row, column, e.target.value)}
        style={{
          width: '100%',
          border: 'none',
          background: 'transparent'
        }}
      />
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="comments-app">
      <h1>Comments</h1>

      <div className="controls">
        <div className="add-comment">
          <h3>Add New Comment</h3>
          <input
            type="text"
            placeholder="Name"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newComment.email}
            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
          />
          <textarea
            placeholder="Body"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>

        <button
          onClick={handleDeleteSelected}
          disabled={selectedRows.size === 0}
        >
          Delete Selected ({selectedRows.size})
        </button>
      </div>

      <DataSet
        data={comments}
        columns={[
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          { key: 'body', title: 'Body' }
        ]}
        renderHeader={(column) => <strong>{column.title}</strong>}
        renderCell={renderCell}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        rowKey="id"
      />

      {optimisticUpdates.length > 0 && (
        <div className="optimistic-notice">
          Processing updates for {optimisticUpdates.length} items...
        </div>
      )}
    </div>
  );
};

export default CommentsApp;