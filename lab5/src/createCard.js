import React from 'react'

export default function Card(props) {
  return (
    <div className='card'>
      <p className='card-text'><strong>id:</strong> {props.id}</p>
      <p className='card-text'><strong>Full name:</strong>  {props.full_name}</p>
      <p className='card-text'><strong>Name:</strong> </p>
      <div className='tab-container'>
        <p className='card-text card-text-tab'><strong>First name:</strong>  {props.first_name}</p>
        <p className='card-text card-text-tab'><strong>Last name:</strong>  {props.last_name}</p>
      </div>
      <p className='card-text'><strong>Address:</strong> </p>
      <div className='tab-container'>
        <p className='card-text card-text-tab'><strong>Line:</strong>  {props.line}</p>
        <p className='card-text card-text-tab'><strong>Town:</strong>  {props.town}</p>
        <p className='card-text card-text-tab'><strong>County:</strong>  {props.county}</p>
        <p className='card-text card-text-tab'><strong>Country:</strong>  {props.country}</p>
      </div>
      <p className='card-text'><strong>Email:</strong> {props.email}</p>
    </div>
  );
};