import React from "react";

export default function Card(props) {
  return (
    <div className='card__container'>
      <p>userId: {props.userId}</p>
      <p>id: {props.id}</p>
      <p>title: {props.title}</p>
    </div>
  );
};