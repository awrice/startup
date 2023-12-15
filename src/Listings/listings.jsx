import React from 'react';
import { useState, useEffect } from 'react'
import { ListingEntry } from './listingEntry';
import './listings.css'
import { useNavigate } from 'react-router-dom';

export function Listings() {
  const [sortBy, setSortBy] = useState('rate');
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  let url = `/api/listing/${searchQuery}`;
  if (searchQuery == null || searchQuery.trim() === "") { url = "/api/listing/null"; }
  useEffect(() => {
    fetch(url, { method: "get" })
      .then((response) => response.json())
      .then((listings_res) => {
        setListings(listings_res);
      });
  }, [searchQuery]);

  return (
    <div>
      <input 
        type="search"
        id="search"
        name="varSearch"
        value={ searchQuery }
        onChange={(e) => setSearchQuery(e.target.value) }
        placeholder="Search"
      />
      <h1>Available Listings</h1>
      <label htmlFor="sortBy">Sort by </label>
      <select id="sortBy" name="varSelect">
        <option value="rate">Price</option>
        <option value="title">Name</option>
        <option value="location">Location</option>
      </select>
      <ul id="listingsOL">
        {listings.map((listing) => (
          <ListingEntry 
            key={listing['_id']} 
            listing={ listing } 
            click_func={() => {
              navigate(`/listing/${listing['_id']}`);
            }}
          />
        ))}
      </ul>
    </div>
  )
}