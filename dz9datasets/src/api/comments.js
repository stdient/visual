const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchComments = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const addComment = async (comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to add comment');
  return response.json();
};

export const updateComment = async (comment) => {
  const response = await fetch(`${BASE_URL}/comments/${comment.id}`, {
    method: 'PATCH',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};

export const deleteComment = async (id) => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete comment');
  return id;
};