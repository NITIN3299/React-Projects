import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb,weight,index,hexColor}) => { 
  const [alert,setalert] = useState(false);
  const bcg=rgb.join(',');
  const hex=rgbToHex(...rgb);
  const hexValue=`#${hexColor}`
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setalert(false)
    },3000)
    return ()=>clearTimeout(timeout);
  },[alert])
  return (
    <article className={`color ${index>9 && 'color-light'}`} 
    style={{backgroundColor:`rgb(${bcg})`}} 
    onClick={()=>{
      setalert(true);
      navigator.clipboard.writeText(hexValue);
    }}>
     <p className='percent-value'>{weight}%</p>
     <p className='color-value'>{hexValue}</p>
     { alert && <p className='alert'>copied to clipboard</p>}
    </article>
  );
}

export default SingleColor
