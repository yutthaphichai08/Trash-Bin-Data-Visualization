import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  bins: TrashBin[];
}

const MapComponent: React.FC<MapComponentProps> = ({ bins }) => {
  // console.log(bins);
  if (bins.length === 0) return null;

  const getColor = (fillLevel: number) => {
    if (fillLevel > 80000) return "red";
    return "blue";
  };

  return (
    <MapContainer
      center={[bins[0]?.lat || 0, bins[0]?.lng || 0]}
      zoom={1}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bins.map((bin) =>
        bin.lat !== undefined && bin.lng !== undefined ? (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={L.divIcon({
              className: "custom-icon",
              html: `<div style="background-color: ${getColor(
                bin.fillLevel
              )}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
            })}
          >
            <Popup>
              <strong>{bin.location}</strong>
              <br />
              Fill Level: {bin.fillLevel}%
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapComponent;
