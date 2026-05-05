'use client';

import { useState } from 'react';

interface Waypoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

interface RouteOptimizerProps {
  waypoints: Waypoint[];
  onOptimize?: (optimizedWaypoints: Waypoint[]) => void;
}

export default function RouteOptimizer({
  waypoints,
  onOptimize,
}: RouteOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedOrder, setOptimizedOrder] = useState<string[]>([]);

  // Simple nearest neighbor algorithm for route optimization
  const optimizeRoute = () => {
    if (waypoints.length < 2) return;

    setIsOptimizing(true);

    setTimeout(() => {
      const unvisited = new Set(waypoints.map((wp) => wp.id));
      const optimized: string[] = [waypoints[0].id];
      unvisited.delete(waypoints[0].id);

      while (unvisited.size > 0) {
        const current = waypoints.find((wp) => wp.id === optimized[optimized.length - 1])!;
        let nearest: string | null = null;
        let minDistance = Infinity;

        for (const id of unvisited) {
          const wp = waypoints.find((w) => w.id === id)!;
          const distance = Math.sqrt(
            Math.pow(current.lat - wp.lat, 2) + Math.pow(current.lng - wp.lng, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            nearest = id;
          }
        }

        if (nearest) {
          optimized.push(nearest);
          unvisited.delete(nearest);
        }
      }

      setOptimizedOrder(optimized);
      const optimizedWaypoints = optimized.map(
        (id) => waypoints.find((wp) => wp.id === id)!
      );

      if (onOptimize) {
        onOptimize(optimizedWaypoints);
      }

      setIsOptimizing(false);
    }, 500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold mb-4">🚗 Route Optimizer</h3>
      <button
        onClick={optimizeRoute}
        disabled={isOptimizing || waypoints.length < 2}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 transition"
      >
        {isOptimizing ? 'Optimizing...' : '✨ Optimize Route'}
      </button>

      {optimizedOrder.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Optimized Order:</h4>
          <ol className="space-y-1">
            {optimizedOrder.map((id, index) => {
              const wp = waypoints.find((w) => w.id === id);
              return (
                <li key={id} className="text-sm text-gray-700">
                  {index + 1}. {wp?.name}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
