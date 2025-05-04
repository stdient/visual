const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to add todo');
  return response.json();
};

export const updateTodo = async (todo) => {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return id;
};