import React, { useState } from 'react';

const Tour = ({tours,removeTour}) => {
  const [readmore,setreadmore] = useState(false);
  return (
    <section>
      <div className='title'>
        <h2>ours tours</h2>
        <div className='underline'></div>
      </div>
      <div>
        {tours.map((tour)=>{
          const {id,image,info,price,name} = tour;
          return (
            <article  key={id} className='single-tour'>
              <img src={image} alt={name} />
              <footer>
                <div className='tour-info'>
                  <h4>{name}</h4>
                  <h4 className='tours-price'>${price}</h4>
                </div>
                <p>
                  {readmore?info:`${info.substring(0,200)}...`}
                  <button onClick={()=>setreadmore(!readmore)}>
                    {readmore?'show less':'read more'}
                  </button>
                  </p>
                <button className='delete-btn ' onClick={()=>removeTour(id)}>
                  Not Interested
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Tour;
