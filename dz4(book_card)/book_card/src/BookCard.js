import React from 'react'

function BookCard(props) {
  return (
    <div>
      <img src={props.img} alt='обложка книги'></img>
      <p className='book_name'>{props.title}</p>
      <p className='book_autor'>{props.autor}</p>
    </div>
  );
};

export default BookCard;