'use client';

import { useState } from 'react';
import MapContainer from '@/components/Map/MapContainer';
import RouteOptimizer from '@/components/Map/RouteOptimizer';

interface Waypoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

export default function TripMapPage() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: '1', lat: 40.7128, lng: -74.006, name: 'Start Point' },
  ]);

  const handleRouteChange = (route: any) => {
    console.log('Route updated:', route);
  };

  const handleOptimize = (optimizedWaypoints: Waypoint[]) => {
    setWaypoints(optimizedWaypoints);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📍 Trip Route Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main map area */}
        <div className="lg:col-span-3">
          <MapContainer
            center={{ lat: 40.7128, lng: -74.006 }}
            zoom={12}
            onRouteChange={handleRouteChange}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <RouteOptimizer waypoints={waypoints} onOptimize={handleOptimize} />

          {/* Waypoint List */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-4">📌 Waypoints ({waypoints.length})</h3>
            <ul className="space-y-2">
              {waypoints.map((wp, idx) => (
                <li
                  key={wp.id}
                  className="text-sm px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                >
                  {idx + 1}. {wp.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
