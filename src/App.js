import React, { useState, useCallback, useRef } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer
} from '@react-google-maps/api'
import { formRelative } from 'date-fns'
import mapStyles from './mapStyles'

const App = () => {

  const [markers, setMarkers] = useState([])

  const onMapClick = useCallback((event) => {
    setMarkers(current => [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ])
  }, [])

  const mapRef = useRef()

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const libraries = ["places"]
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
  }
  const center = { 
    lat: 42.519539,
    lng: -70.896713
  }

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries
  })


  if (loadError) return "Error loading maps"
  if(!isLoaded) return "Loading Maps"
  return (
    <div>
      <h1> Sightings </h1>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >

          {
            markers.map((marker) => 
              <Marker 
                key={marker.time.toISOString()} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                  url: '/forest.svg',
                  scaledSize: new window.google.maps.Size(30,30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15)
                }}
              />)
          }
        </GoogleMap>
    </div>
  );
}

export default App;
