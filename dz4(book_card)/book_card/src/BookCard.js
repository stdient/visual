import React from 'react'
import { useState } from 'react';

function BookCard(props) {
  if (!props.authors)
    props.authors.push('Unknown');

  let [imgSrc, setImgSrc] = useState(null);
  if (props.img) {
    let blobURL = URL.createObjectURL(props.img);
    setImgSrc(blobURL);
  }

  let authors = props.authors.map((author, index) => {
    let devide_symbol = ', ';
    if (index === props.authors.length - 1)
      devide_symbol = '';
    if (!(author === null || author === undefined || author === ''))
      return <span className='book_author'>{author}{devide_symbol}</span>
  })

  return (
    <div class='book_container'>
      <img src={imgSrc} alt='обложка'></img>
      <p className='book_name'>{props.title}</p>
      {authors}
    </div>
  );
};

export default BookCard;