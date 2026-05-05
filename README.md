# 🗺️ Trip Planner

A collaborative web application for multi-user synchronized trip planning.

## Overview

Trip Planner enables users to:
- Plan trips together in real-time
- View and manage routes on interactive maps (Google Maps)
- Create daily itineraries with time and location details
- Track attractions and highlights
- Manage transportation methods and tickets
- Organize important documents and files
- Split expenses and manage budgets
- Get AI-assisted planning suggestions

## Core Features

1. **Homepage** - Multiple trip plans hub
2. **Map Functionality** - Google Maps integration with route planning and waypoint management
3. **Daily Itinerary** - Schedule tables with time, location, and themes
4. **Attractions & Highlights** - Track must-see places and artwork
5. **Transportation** - Mode selection and ticket management
6. **Document Folder** - Store tickets, PDFs, and important files

## Advanced Features

1. **Route Optimization** - Auto-optimize travel routes
2. **Task Assignment** - Assign responsibilities with @mentions and voting
3. **Wikipedia Integration** - Auto-populate attraction information
4. **Expense Splitting** - Track shared costs and budget management
5. **QR Code Support** - Upload QR codes for tickets
6. **AI Assistance** - Planning suggestions and recommendations

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS
- **Maps**: Google Maps API
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/b13401084-jpg/Trip-Planner.git
cd Trip-Planner

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
# - Google Maps API Key
# - Other required credentials
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Run TypeScript type check
npm run type-check
```

## Project Structure

```
Trip-Planner/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── pages/            # API routes
│   ├── store/            # Zustand state management
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Environment Variables

See `.env.example` for all required environment variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `DATABASE_URL` - Database connection string
- `NEXT_AUTH_SECRET` - Authentication secret
- Other third-party API keys

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For questions or issues, please open a GitHub issue.
