import React from 'react';

const PersonComponent = ({ render }) => {
  const person =
  {
    name: 'Volodia',
    age: 10,
    email: 'vovasuper@yandex.ru',
    pet: [
      {
        name: 'bob',
        age: 505
      }
    ]
  };

  return (
    <div>
      {render(person)}
    </div>
  )
};

export default PersonComponent;