import React from 'react'

function BookCard(props) {
  if (!props.authors)
    props.authors.push('Unknown');

  let authors = props.authors.map((author, index) => {
    let devide_symbol = ', ';
    if (index === props.authors.length - 1)
      devide_symbol = '';
    if (!(author === null || author === undefined || author === ''))
      return <span className='book_author'>{author}{devide_symbol}</span>
    else return <></>;
  })

  return (
    <div className='book_container'>
      <img src={props.img} alt='обложка'></img>
      <p className='book_name'>{props.title}</p>
      {authors}
    </div>
  );
};

export default BookCard;