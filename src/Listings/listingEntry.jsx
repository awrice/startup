import React, { useEffect } from 'react';
import { useState } from 'react'
import './listings.css'

let cachedImgs = {};

export function ListingEntry({ listing, click_func }) {
  const [img_src, setImageSrc] = useState('');

  let url = `/api/img/${listing['imgs'][0]}`;
  useEffect(() => {
    console.log(cachedImgs);
    let img_id = listing['imgs'][0];
    if (img_id in cachedImgs) {
      setImageSrc(cachedImgs[img_id]);
    } else {
      fetch(url, { method: "get" })
        .then((response) => response.json())
        .then((image) => {
          cachedImgs[img_id] = `data:${image.mimetype};base64,${image.buffer}`
          setImageSrc(cachedImgs[img_id]);
        });
    }
  }, []);

  let rate_str = '';
  if (listing['rate_amt'] !== "*") {
    rate_str = "$" + listing['rate_amt'].toString() + "/" + listing['rate_unit'];
  } else {
    rate_str = "Variable Price";
  }

  return (
    <li className='listing' onClick={ click_func } >
      <img src={ img_src } />
      <h2>{ listing['title'] }</h2>
      <p>{ listing['description'] }</p>
      <h4>{ listing['location'] }</h4>
      <h3>{ rate_str }</h3>
    </li>
  )
}
  