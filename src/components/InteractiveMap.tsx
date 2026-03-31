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
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={16} 
      style={containerStyle}
      scrollWheelZoom={false}
      className="z-0"
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
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#ffffff" }]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#ffffff" }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#eeeeee" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#7b7b7b" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#ffffff" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{ "visibility": "simplified" }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#c8d7d4" }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#070707" }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#ffffff" }]
          }
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
