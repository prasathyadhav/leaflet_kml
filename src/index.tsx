import * as React from "react";
import { render } from "react-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";

function App() {
  const [kml, setKml] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        console.log(kml);
        setKml(kml);
      });
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={17}
        center={[-37.422, -122.084]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
