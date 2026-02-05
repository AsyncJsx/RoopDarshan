import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MyMap() {
  const lat = 17.6861093;   // replace with your latitude
  const lng =  73.9888914;   // replace with your longitude

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
