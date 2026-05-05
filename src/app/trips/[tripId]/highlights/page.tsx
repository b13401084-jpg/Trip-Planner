'use client';

import { useState } from 'react';
import HighlightCard from '@/components/Highlights/HighlightCard';

interface Highlight {
  id: string;
  name: string;
  category: string;
  description?: string;
  wikipedia?: string;
  operatingHours?: string;
  ticketUrl?: string;
  notes?: string;
}

const CATEGORIES = [
  'museum',
  'landmark',
  'park',
  'restaurant',
  'beach',
  'historic',
  'nature',
  'art',
  'shopping',
  'entertainment',
];

const SAMPLE_HIGHLIGHTS: Highlight[] = [
  {
    id: '1',
    name: 'Statue of Liberty',
    category: 'landmark',
    description: 'Iconic symbol of freedom and democracy',
    wikipedia: 'https://en.wikipedia.org/wiki/Statue_of_Liberty',
    operatingHours: '9:00 AM - 5:00 PM',
    ticketUrl: 'https://www.statuecruises.com',
    notes: 'Book tickets in advance. Allow 3-4 hours for visit.',
  },
  {
    id: '2',
    name: 'The Metropolitan Museum of Art',
    category: 'museum',
    description: 'World-famous art museum with extensive collections',
    wikipedia: 'https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art',
    operatingHours: '10:00 AM - 5:30 PM (Closed Mondays)',
    ticketUrl: 'https://www.metmuseum.org',
    notes: 'Allow at least 3-4 hours. Free suggested admission.',
  },
  {
    id: '3',
    name: 'Central Park',
    category: 'park',
    description: 'Large public park with lakes, meadows, and forests',
    wikipedia: 'https://en.wikipedia.org/wiki/Central_Park',
    operatingHours: '6:00 AM - 1:00 AM (Daily)',
    notes: 'Free entry. Great for picnics and outdoor activities.',
  },
];

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<Highlight[]>(SAMPLE_HIGHLIGHTS);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState<string>('all');
  const [newHighlight, setNewHighlight] = useState<Partial<Highlight>>({
    category: 'landmark',
  });

  const displayedHighlights =
    filteredCategory === 'all'
      ? highlights
      : highlights.filter((h) => h.category === filteredCategory);

  const handleAddHighlight = () => {
    if (!newHighlight.name || !newHighlight.category) {
      alert('Please fill in name and category');
      return;
    }

    const highlight: Highlight = {
      id: Date.now().toString(),
      name: newHighlight.name,
      category: newHighlight.category || 'landmark',
      description: newHighlight.description,
      wikipedia: newHighlight.wikipedia,
      operatingHours: newHighlight.operatingHours,
      ticketUrl: newHighlight.ticketUrl,
      notes: newHighlight.notes,
    };

    setHighlights((prev) => [...prev, highlight]);
    setNewHighlight({ category: 'landmark' });
    setIsAddingNew(false);
  };

  const handleDeleteHighlight = (id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  const handleViewWikipedia = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">🎯 Highlights & Attractions</h1>

        {/* Add Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isAddingNew ? '✕ Cancel' : '+ Add Highlight'}
          </button>
        </div>

        {/* Add Form */}
        {isAddingNew && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold mb-4">Add New Highlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Attraction name *"
                value={newHighlight.name || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({ ...prev, name: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <select
                value={newHighlight.category || 'landmark'}
                onChange={(e) =>
                  setNewHighlight((prev) => ({ ...prev, category: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={newHighlight.description || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Operating hours"
                value={newHighlight.operatingHours || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({
                    ...prev,
                    operatingHours: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="url"
                placeholder="Wikipedia URL (optional)"
                value={newHighlight.wikipedia || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({ ...prev, wikipedia: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="url"
                placeholder="Ticket URL (optional)"
                value={newHighlight.ticketUrl || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({
                    ...prev,
                    ticketUrl: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Notes"
                value={newHighlight.notes || ''}
                onChange={(e) =>
                  setNewHighlight((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded md:col-span-2"
                rows={3}
              />
            </div>
            <button
              onClick={handleAddHighlight}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              ✓ Add Highlight
            </button>
          </div>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilteredCategory('all')}
          className={`px-4 py-2 rounded transition ${
            filteredCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({highlights.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = highlights.filter((h) => h.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilteredCategory(cat)}
              className={`px-4 py-2 rounded transition capitalize ${
                filteredCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedHighlights.map((highlight) => (
          <HighlightCard
            key={highlight.id}
            {...highlight}
            onDelete={handleDeleteHighlight}
            onViewWikipedia={handleViewWikipedia}
          />
        ))}
      </div>

      {displayedHighlights.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No highlights in this category yet</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Attraction
          </button>
        </div>
      )}
    </div>
  );
}
