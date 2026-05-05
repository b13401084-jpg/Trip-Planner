'use client';

import { useEffect, useRef, useState } from 'react';

interface MapContainerProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  onRouteChange?: (route: RouteData) => void;
}

interface RouteData {
  waypoints: { lat: number; lng: number }[];
  distance: string;
  duration: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function MapContainer({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
  onRouteChange,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [waypoints, setWaypoints] = useState<{ lat: number; lng: number }[]>([]);

  // Initialize Google Map
  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      zoom: zoom,
      center: center,
      mapTypeControl: true,
      fullscreenControl: true,
    });

    const newDirectionsService = new window.google.maps.DirectionsService();
    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
    newDirectionsRenderer.setMap(newMap);

    setMap(newMap);
    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);

    // Add click listener to add waypoints
    newMap.addListener('click', (event: any) => {
      addWaypoint({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    });
  }, []);

  const addWaypoint = (point: { lat: number; lng: number }) => {
    setWaypoints((prev) => [...prev, point]);
    addMarker(point);
  };

  const addMarker = (point: { lat: number; lng: number }) => {
    if (!map) return;

    new window.google.maps.Marker({
      position: point,
      map: map,
      title: `Waypoint ${waypoints.length + 1}`,
    });
  };

  const calculateRoute = async () => {
    if (!directionsService || waypoints.length < 2) {
      alert('Please add at least 2 waypoints');
      return;
    }

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const stops = waypoints.slice(1, -1).map((wp) => ({
      location: new window.google.maps.LatLng(wp.lat, wp.lng),
      stopover: true,
    }));

    try {
      const result = await directionsService.route({
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        waypoints: stops,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      directionsRenderer.setDirections(result);

      const route = result.routes[0];
      const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
      const duration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0);

      if (onRouteChange) {
        onRouteChange({
          waypoints,
          distance: `${(distance / 1000).toFixed(2)} km`,
          duration: `${Math.round(duration / 60)} mins`,
        });
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error calculating route');
    }
  };

  const clearRoute = () => {
    setWaypoints([]);
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
    if (map) {
      map.setZoom(zoom);
      map.setCenter(center);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={calculateRoute}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          📍 Calculate Route
        </button>
        <button
          onClick={clearRoute}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          🔄 Clear
        </button>
        <span className="text-sm text-gray-600 self-center">
          Click on map to add waypoints ({waypoints.length})
        </span>
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-gray-300 shadow-lg"
      />
    </div>
  );
}
