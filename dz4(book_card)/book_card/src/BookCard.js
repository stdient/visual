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

  return (
    <div>
      <img src={imgSrc} alt='обложка'></img>
      <p className='book_name'>{props.title}</p>
      {
        props.authors.map(author => {
          return <p className='book_author'>{author}</p>
        })
      }
    </div>
  );
};

export default BookCard;