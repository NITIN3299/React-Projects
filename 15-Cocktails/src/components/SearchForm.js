import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setsearchterm} = useGlobalContext();
  const searchvalue = React.useRef('');

  React.useEffect(()=>{
    searchvalue.current.focus();
  },[])
  const handlechange = () =>{
    setsearchterm(searchvalue.current.value);
  }
  const handlesubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handlesubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search yout favourite cocktail</label>
          <input type='text' id='name' ref={searchvalue} onChange={handlechange} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
