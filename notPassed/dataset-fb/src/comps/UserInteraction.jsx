import { useState } from 'react';

export default
  function UserInteraction({ url, addOptimisticComment }) {
  const [isOpen, setOpen] = useState(false);
  const [newElement, setNewElement] = useState({
    name: '',
    email: '',
    body: '',
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '30vw',
    margin: '2em',
    marginTop: '1em',
  }

  const btnStyle = {
    backgroundColor: '#4188D2',
    margin: '1em',
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAddComment = async (e) => {
    e.preventDefault();
    const tempId = Date.now();
    const optimisticComment = { ...newElement, id: tempId };

    addOptimisticComment({ type: "add", comment: optimisticComment });

    const res = fetch(url, {
      method: 'POST',
      body: JSON.stringify(newElement),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!res.ok) throw new Error('failed to fetch');

    const data = await res.json();
    setNewElement((prev) => [...prev, data]);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', }}>
          <button
            onClick={() => setOpen(!isOpen)}
            style={btnStyle}>
            {isOpen ? 'Cancel' : 'Add Element'}
          </button>

          <button style={btnStyle}>
            Delete Selected
          </button>
        </div>

        {
          isOpen &&
          <form onSubmit={handleAddComment} style={formStyle}>
            <label>name:</label>
            <input name="name" value={newElement.name} onChange={handleInput}></input>

            <label>email:</label>
            <input name="email" value={newElement.email} onChange={handleInput}></input>

            <label>body:</label>
            <input name="body" value={newElement.body} onChange={handleInput}></input>

            <button type='submit'>отправить</button>
          </form>
        }
      </div>
    </div>
  );
}