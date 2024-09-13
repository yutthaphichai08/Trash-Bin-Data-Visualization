"use client";


import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
  latitude: number;
  longitude: number;
}

interface MapProps {
  bins: TrashBin[];
}

const Map: React.FC<MapProps> = ({ bins }) => {
  const map = useMap();

  useEffect(() => {
    // Optionally, set the map center and zoom level dynamically
    if (bins.length > 0) {
      const latitudes = bins.map(bin => bin.latitude);
      const longitudes = bins.map(bin => bin.longitude);
      const centerLat = latitudes.reduce((a, b) => a + b) / latitudes.length;
      const centerLng = longitudes.reduce((a, b) => a + b) / longitudes.length;

      map.setView([centerLat, centerLng], 13);
    }
  }, [bins, map]);

  return (
    <MapContainer style={{ height: '500px', width: '100%' }} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bins.map((bin) => {
        const color = bin.fillLevel >= 80 ? 'red' : 'blue'; // Change color based on fill level
        return (
          <Marker
            key={bin.id}
            position={[bin.latitude, bin.longitude]}
            icon={L.icon({
              iconUrl: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`, // Marker color
              iconSize: [32, 32]
            })}
          >
            <Popup>
              <div>
                <strong>Location:</strong> {bin.location}<br />
                <strong>Fill Level:</strong> {bin.fillLevel}%
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
