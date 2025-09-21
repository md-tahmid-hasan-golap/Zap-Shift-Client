import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React-Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

const Coverage = () => {
  // Example: Dhaka city coordinates
  const position = [23.8103, 90.4125]; // lat, lng

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          We are available in 64 districts
        </h2>

        {/* Map */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            {/* Map layer */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Example marker */}
            <Marker position={position}>
              <Popup>
                <span className="font-semibold">Dhaka</span> <br />
                Our central delivery hub.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
