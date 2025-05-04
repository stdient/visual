const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchAlbums = async () => {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return response.json();
};

export const addAlbum = async (album) => {
  const response = await fetch(`${BASE_URL}/albums`, {
    method: 'POST',
    body: JSON.stringify(album),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to add album');
  return response.json();
};

export const updateAlbum = async (album) => {
  const response = await fetch(`${BASE_URL}/albums/${album.id}`, {
    method: 'PATCH',
    body: JSON.stringify(album),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update album');
  return response.json();
};

export const deleteAlbum = async (id) => {
  const response = await fetch(`${BASE_URL}/albums/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete album');
  return id;
};