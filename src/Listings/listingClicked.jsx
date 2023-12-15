import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function ListingClicked(props) {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [img_src, setImageSrc] = useState('');
  const [rate_str, setRateStr] = useState('');

  const [didHaveInterest, setDidHaveInterest] = useState(false)

  function retrieveImg(img_id) {
    let url = `/api/img/${img_id}`;
    fetch(url, { method: "get" })
      .then((response) => response.json())
      .then((image) => {
        setImageSrc(`data:${image.mimetype};base64,${image.buffer}`);
      });
  }

  function getMe() {
    let url = "/api/user/me";
    fetch(url, { method: "get" })
      .then((response) => response.json())
      .then((json_res) => {
        console.log(json_res);
        if (json_res.status == 200) localStorage.setItem("userId", json_res.userId)
      });
  }

  function imInterested() {
    console.log("INTERST!");
    let url = `/api/listing/interest/${listingId}`;
    fetch(url, { method: "get" })
      .then((response) => response.json())
      .then((json_res) => {
        console.log(json_res);
        if (json_res.status == 200) setDidHaveInterest(true);
      });
  }

  useEffect(() => {
    if (listing == null) { return; }
    if (listing.rate_amt !== "*") {
      setRateStr("$" + listing.rate_amt.toString() + "/" + listing.rate_unit);
    } else {
      setRateStr("Variable Price");
    }  
  }, [listing]);

  useEffect(() => {
    let url = `/api/listingID/${listingId}`;
    fetch(url, { method: "get" })
      .then((response) => response.json())
      .then((json_res) => {
        console.log(json_res);
        setListing(json_res);
        retrieveImg(json_res['imgs'][0]);
      });
    
    getMe();
  }, []);

  return (
    <div>
      {listing !== null && didHaveInterest == false && (<>
        <h1>{ listing.title }</h1>
        <img src={ img_src }/>
        <p>{ listing.description }</p>
        <h3>{ listing.location }</h3>
        <h2>{ rate_str }</h2>
        { listing.owner_id !== localStorage.getItem("userId") && (
          <button onClick={ imInterested }>I'm Interested!</button>
        )}
      </>)}
      {didHaveInterest && (<>
        <h3>Interest was recorded!</h3>
        <p>You can message the owner of this service on the Services tab</p>
      </>)}
    </div>
  )
}