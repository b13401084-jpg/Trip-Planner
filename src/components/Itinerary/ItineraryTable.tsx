'use client';

import { useState } from 'react';

interface ItineraryItem {
  id: string;
  date: string;
  time: string;
  location: string;
  theme: string;
  description?: string;
  assignedTo?: string;
}

interface ItineraryTableProps {
  items?: ItineraryItem[];
  onAddItem?: (item: ItineraryItem) => void;
  onDeleteItem?: (id: string) => void;
  onUpdateItem?: (id: string, item: ItineraryItem) => void;
}

export default function ItineraryTable({
  items = [],
  onAddItem,
  onDeleteItem,
  onUpdateItem,
}: ItineraryTableProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(items);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItem>>({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    location: '',
    theme: '',
  });

  const handleAddItem = () => {
    if (!newItem.date || !newItem.time || !newItem.location || !newItem.theme) {
      alert('Please fill in all required fields');
      return;
    }

    const item: ItineraryItem = {
      id: Date.now().toString(),
      date: newItem.date!,
      time: newItem.time!,
      location: newItem.location!,
      theme: newItem.theme!,
      description: newItem.description,
      assignedTo: newItem.assignedTo,
    };

    setItinerary((prev) => [...prev, item]);
    if (onAddItem) onAddItem(item);

    setNewItem({
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      location: '',
      theme: '',
    });
    setIsAddingNew(false);
  };

  const handleDeleteItem = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
    if (onDeleteItem) onDeleteItem(id);
  };

  const sortedItinerary = [...itinerary].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">📅 Daily Itinerary</h2>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isAddingNew ? '✕ Cancel' : '+ Add Activity'}
        </button>
      </div>

      {isAddingNew && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                value={newItem.date || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Time</label>
              <input
                type="time"
                value={newItem.time || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g., Central Park"
                value={newItem.location || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Theme</label>
              <input
                type="text"
                placeholder="e.g., Sightseeing"
                value={newItem.theme || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, theme: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Description</label>
              <input
                type="text"
                placeholder="Add notes (optional)"
                value={newItem.description || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Assign To</label>
              <input
                type="text"
                placeholder="@mention someone (optional)"
                value={newItem.assignedTo || ''}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, assignedTo: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            onClick={handleAddItem}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            ✓ Add Activity
          </button>
        </div>
      )}

      {sortedItinerary.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Theme</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Assigned To</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedItinerary.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{item.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{item.time}</td>
                  <td className="px-4 py-3 text-sm text-blue-600">{item.location}</td>
                  <td className="px-4 py-3 text-sm">{item.theme}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.description || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.assignedTo ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        @{item.assignedTo}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No activities yet</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Your First Activity
          </button>
        </div>
      )}
    </div>
  );
}
