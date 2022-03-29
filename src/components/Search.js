import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Search = ({ onClick, onChange, address, classes }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="search-wrapper">
      <form onSubmit={(e) => onSubmit(e)} className="search-container">
        <input type="text" value={address} placeholder="Enter location" onChange={(e) => onChange(e.target.value)}/>
        <button onClick={onClick} className="btn"><BsSearch /></button>
      </form>
    </div>
  )
}

export default Search