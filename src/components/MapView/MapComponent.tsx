import * as React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../../styles/GettingHereView.css";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCO1ZvSmneWHpLAljJnjRIF0oNcCiJYy6M",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <ShowMap />;
}

const center = { lat: 49.473848765892576, lng: 8.534416887116084 };

function ShowMap() {
  return (
    <GoogleMap zoom={17} center={center} mapContainerClassName="Map-Container">
      <Marker position={center} />
    </GoogleMap>
  );
}