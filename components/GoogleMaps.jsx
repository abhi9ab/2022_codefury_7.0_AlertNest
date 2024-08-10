'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '560px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const GoogleMaps = () => {
    const [allPosts, setAllPosts] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
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
    <div className="w-full h-96 md:w-[1000px] md:h-[560px] my-10 ">
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
          <MarkerF 
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