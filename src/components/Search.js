import React from 'react'
import { BsSearch } from 'react-icons/bs';
import { MdMyLocation } from 'react-icons/md';

const Search = ({ onClick, onChange, address, contentState }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={ contentState.toLowerCase() === 'blank' ? "search-wrapper search-wrapper-blank" : "search-wrapper" }>
      <form onSubmit={(e) => onSubmit(e)} className="search-container">
        <input type="text" value={address} placeholder="Enter location" onChange={(e) => onChange(e.target.value)}/>
        <button onClick={() => onClick()} className="btn"><BsSearch /></button>
      </form>
      <form onSubmit={onSubmit} className="search-container-utils">
        <span id="getLocationBtn" className="btn" onClick={() => onClick('getLocation')}>
          <span>Location</span>
          <span>{<MdMyLocation size={31}/>}</span> 
        </span>
      </form>
    </div>
  )
}

export default Search