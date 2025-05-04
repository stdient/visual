import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import DataSet from '../../components/DataSet/DataSet';
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment
} from '../../api/comments';
import { useOptimistic } from 'react';
import './Comments.css';

const commentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  body: Yup.string().required('Body is required'),
});

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [error, loading, execute] = useOptimistic([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (err) {
        console.error('Error loading comments:', err);
      }
    };
    loadComments();
  }, []);

  const handleAdd = async (values, { resetForm }) => {
    try {
      await execute(
        () => addComment(values),
        (currentData) => [...currentData, { ...values, id: Date.now() }]
      );
      resetForm();
      setIsAdding(false);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await execute(
        () => updateComment(values),
        (currentData) => currentData.map(c => c.id === values.id ? values : c)
      );
      setEditingComment(null);
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedComments.length) return;

    try {
      await Promise.all(
        selectedComments.map(id =>
          execute(
            () => deleteComment(id),
            (currentData) => currentData.filter(c => c.id !== id)
          )
        )
      );
      setSelectedComments([]);
    } catch (err) {
      console.error('Error deleting comments:', err);
    }
  };

  return (
    <div className="comments-container">
      <h1>Comments</h1>

      <div className="comments-actions">
        <button
          className="btn-add"
          onClick={() => setIsAdding(true)}
        >
          Add Comment
        </button>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={!selectedComments.length}
        >
          Delete Selected
        </button>
      </div>

      {isAdding && (
        <div className="comment-form-container">
          <h2>Add New Comment</h2>
          <Formik
            initialValues={{ name: '', email: '', body: '' }}
            validationSchema={commentSchema}
            onSubmit={handleAdd}
          >
            {({ isSubmitting }) => (
              <Form className="comment-form">
                <div className="form-group">
                  <label>Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <Field as="textarea" name="body" />
                  <ErrorMessage name="body" component="div" className="error" />
                </div>
                <div className="form-actions">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setIsAdding(false)}>
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {editingComment && (
        <div className="comment-form-container">
          <h2>Edit Comment</h2>
          <Formik
            initialValues={editingComment}
            validationSchema={commentSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <Form className="comment-form">
                <div className="form-group">
                  <label>Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <Field as="textarea" name="body" />
                  <ErrorMessage name="body" component="div" className="error" />
                </div>
                <div className="form-actions">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                  <button type="button" onClick={() => setEditingComment(null)}>
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <DataSet
          data={comments}
          headers={[
            { key: 'name', title: 'Name' },
            { key: 'email', title: 'Email' },
            { key: 'body', title: 'Body' },
          ]}
          onRowSelect={setSelectedComments}
        />
      )}
    </div>
  );
};

export default Comments;