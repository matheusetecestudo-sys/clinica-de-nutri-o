import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -23.56134967880004,
  lng: -46.65889022466981
};

const LeafletMap = () => {
  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={16} 
        style={containerStyle}
        scrollWheelZoom={false}
        className="z-0 leaflet-noir"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletMarker position={[center.lat, center.lng]}>
          <Popup>
            <div className="p-1 min-w-[180px] font-sans">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h3 className="font-bold text-secondary text-sm">DUNO Nutri</h3>
              </div>
              <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">
                Av. Paulista, 1000 - Sala 1205<br />
                Bela Vista, São Paulo - SP
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=-23.56134967880004,-46.65889022466981" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-[11px] font-bold hover:underline"
              >
                Como chegar
              </a>
            </div>
          </Popup>
        </LeafletMarker>
      </MapContainer>
      
      {/* Visual Overlay to refine the Noir look */}
      <div className="absolute inset-0 pointer-events-none bg-primary/5 mix-blend-multiply z-10" />
      
      <style>{`
        .leaflet-noir {
          filter: grayscale(100%) invert(90%) contrast(90%) brightness(110%);
        }
        .leaflet-tile-pane {
          filter: brightness(0.8) contrast(1.2);
        }
      `}</style>
    </div>
  );
};

const InteractiveMap = () => {
  const apiKey = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || ""
  });

  const [selectedMarker, setSelectedMarker] = useState<boolean>(false);

  const onMarkerClick = useCallback(() => {
    setSelectedMarker(true);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(false);
  }, []);

  if (!apiKey || loadError) {
    return <LeafletMap />;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
        Carregando mapa...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        styles: [
          { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
          { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
          { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
          { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
          { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
          { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
          { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
          { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
          { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
          { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
          { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
          { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
          { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
          { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
          { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
          { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
          { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
          { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
          { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
          { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
          { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
        ]
      }}
    >
      <Marker
        position={center}
        onClick={onMarkerClick}
        title="DUNO Nutri"
        animation={google.maps.Animation.DROP}
      />

      {selectedMarker && (
        <InfoWindow
          position={center}
          onCloseClick={onInfoWindowClose}
        >
          <div className="p-3 min-w-[220px] font-sans">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <h3 className="font-bold text-secondary text-sm">DUNO Nutri</h3>
            </div>
            <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
              Av. Paulista, 1000 - Sala 1205<br />
              Bela Vista, São Paulo - SP<br />
              CEP: 01310-100
            </p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=-23.56134967880004,-46.65889022466981" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-[11px] font-bold hover:underline flex items-center gap-1"
              >
                Como chegar
              </a>
              <span className="text-[10px] text-gray-400">Aberto até às 20h</span>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default InteractiveMap;
