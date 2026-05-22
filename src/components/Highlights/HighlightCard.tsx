'use client';

import { useState } from 'react';

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

interface HighlightCardProps extends Highlight {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewWikipedia?: (url: string) => void;
}

export default function HighlightCard({
  id,
  name,
  category,
  description,
  wikipedia,
  operatingHours,
  ticketUrl,
  notes,
  onEdit,
  onDelete,
  onViewWikipedia,
}: HighlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryEmoji: Record<string, string> = {
    museum: '🏛️',
    landmark: '🗽',
    park: '🌳',
    restaurant: '🍽️',
    beach: '🏖️',
    historic: '🏰',
    nature: '⛰️',
    art: '🎨',
    shopping: '🛍️',
    entertainment: '🎭',
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-3xl">{categoryEmoji[category] || '📍'}</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600 capitalize">{category}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              >
                ✏️ Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {description && (
          <p className="text-gray-700 text-sm mb-3">{description}</p>
        )}

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-gray-200">
            {operatingHours && (
              <div>
                <p className="text-xs font-semibold text-gray-600">⏰ Operating Hours</p>
                <p className="text-sm text-gray-700">{operatingHours}</p>
              </div>
            )}

            {notes && (
              <div>
                <p className="text-xs font-semibold text-gray-600">📝 Notes</p>
                <p className="text-sm text-gray-700">{notes}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {ticketUrl && (
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  🎫 Buy Tickets
                </a>
              )}
              {wikipedia && onViewWikipedia && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewWikipedia(wikipedia);
                  }}
                  className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
                >
                  📖 Learn More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
