'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const center = {
  lat: -3.745,
  lng: -38.523
};


const GoogleMaps = ({ googleMapsApiKey }) => {

    const [allPosts, setAllPosts] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    setAllPosts(data);

  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return isLoaded ? (
    <div className="w-full h-96 md:w-[1150px] md:h-[560px] my-10 ">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            streetViewControl: false,
            mapTypeControl: false
        }}
      >
        {allPosts.map((post) => (
          <Marker 
            key={post._id} 
            position={{ lat: post.latitude, lng: post.longitude }} 
            title={post.description} 
          />
        ))}
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
  ) : <></>;
};


export default GoogleMaps;