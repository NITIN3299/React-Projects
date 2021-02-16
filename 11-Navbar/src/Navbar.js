import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showlinks,setshowlinks]=useState(false);
  const linkscontainerref=useRef(null);
  const linksref = useRef(null);

  useEffect(()=>{
    const linkheight = linksref.current.getBoundingClientRect().height 
    if(showlinks){
      linkscontainerref.current.style.height=`${linkheight}px`
    }else{
      linkscontainerref.current.style.height='0px'
    }
  },[showlinks])
  return (
    <>
      <nav>
        <div className='nav-center'>
          <div className='nav-header'>
            <img src={logo} alt='logo' />
            <button className='nav-toggle' onClick={()=>setshowlinks(!showlinks)}>
              <FaBars />
            </button>
          </div>
            <div className='links-container' ref={linkscontainerref}>
            <ul className='links' ref={linksref}>
              {links.map((linkitem)=>{
                const {id,url,text}=linkitem;
                return <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              })}
            </ul>
          </div>
          <ul className='social-icons'>
            {social.map((linkitem)=>{
                const {id,url,icon}=linkitem;
                return <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
