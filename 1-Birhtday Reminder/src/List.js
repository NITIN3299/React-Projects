import React from 'react';

const List = ({value}) => {
  return (
    <>
      {value.map((person)=>{
        const {id,name,age,img}=person;
        return (
          <article key={id} className='person'>
            <img src={img} alt={name} ></img>
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
