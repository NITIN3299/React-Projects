import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getlocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  return []
}

function App() {
  const [name,setname]=useState('');
  const [list,setlist]=useState(getlocalStorage());
  const [isedit,setisedit]=useState(false);
  const [editid,seteditid]=useState(null);
  const [alert,setalert]=useState({show:false,msg:'',type:''});
  const handlesubmit =(e)=>{
    e.preventDefault();
    if(!name){
      showalert(true,'danger','please enter value')
    }else if(name && isedit){
      showalert(true,'success','item edited');
       setlist(
         list.map((item)=>{
           if(item.id===editid){
             return {...item,title:name}
           }
           return item;
         })
       )
       setname('');
       seteditid(null);
       setisedit(false);
    }else {
      const newitem={id:new Date().getTime().toString(),title:name};
      setlist([...list,newitem]);
      showalert(true,'success','item added to list');
      setname('');

    }
  }
  const showalert=(show=false,type='',msg='')=>{
    setalert({show,type,msg});
  }
  const clearlist =()=>{
    showalert(true,'success','empty list');
    setlist([]);
  }
  const removeitem = (id)=>{
    showalert(true,'danger','item removed');
    setlist(list.filter((item)=>item.id!==id))
  }
  const edititem = (id)=>{
   const specificitem=list.find((item)=>item.id===id);
   seteditid(id);
   setisedit(true);
   setname(specificitem.title);
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handlesubmit}>
        {alert.show && <Alert {...alert} removealert={showalert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
        <input type='text' className='grocery' placeholder='e.g. eggs'
            value={name} onChange={(e)=>setname(e.target.value)} />
            <button type='submit' className='submit-btn'>
              {isedit?'edit':'submit'}
            </button>   
        </div>
      </form>
      {list.length>0 && <div className='grocery-container'>
         <List items={list} removeitem={removeitem} edititem={edititem}/>
         <button className='clear-btn' onClick={clearlist}>clear items</button>
      </div> }
      
    </section>
  )
}

export default App
