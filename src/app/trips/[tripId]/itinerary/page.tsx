'use client';

import { useState } from 'react';
import ItineraryTable from '@/components/Itinerary/ItineraryTable';

interface ItineraryItem {
  id: string;
  date: string;
  time: string;
  location: string;
  theme: string;
  description?: string;
  assignedTo?: string;
}

const SAMPLE_ITINERARY: ItineraryItem[] = [
  {
    id: '1',
    date: '2026-06-15',
    time: '09:00',
    location: 'Hotel Lobby',
    theme: 'Breakfast',
    description: 'Meet at the hotel lobby for breakfast',
    assignedTo: 'John',
  },
  {
    id: '2',
    date: '2026-06-15',
    time: '10:30',
    location: 'Statue of Liberty',
    theme: 'Sightseeing',
    description: 'Visit the iconic Statue of Liberty',
    assignedTo: 'Sarah',
  },
  {
    id: '3',
    date: '2026-06-15',
    time: '13:00',
    location: 'Times Square',
    theme: 'Lunch & Shopping',
    description: 'Lunch and souvenir shopping',
  },
];

export default function DailyItineraryPage() {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(SAMPLE_ITINERARY);

  const handleAddItem = (item: ItineraryItem) => {
    setItinerary((prev) => [...prev, item]);
    console.log('Item added:', item);
  };

  const handleDeleteItem = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
    console.log('Item deleted:', id);
  };

  const handleUpdateItem = (id: string, item: ItineraryItem) => {
    setItinerary((prev) =>
      prev.map((prevItem) => (prevItem.id === id ? item : prevItem))
    );
    console.log('Item updated:', id, item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ItineraryTable
        items={itinerary}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </div>
  );
}
