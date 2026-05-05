# 🗺️ Trip Planner

A multi-user synchronized trip planning web application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- 📍 **Map Integration** - Google Maps with route planning
- 📅 **Daily Itinerary** - Schedule activities and assign tasks
- 🎯 **Highlights & Attractions** - Discover and track must-see places
- 🚗 **Transportation** - Manage travel modes and tickets
- 📁 **Document Storage** - Store files and tickets
- 🤝 **Real-time Sync** - Multi-user collaboration
- 💰 **Expense Splitting** - Track and divide costs
- 🤖 **AI Assistant** - Get planning suggestions
- 📊 **Route Optimization** - Optimize your travel routes
- 🔐 **Authentication** - Secure multi-user system

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Google Maps API Key

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/b13401084-jpg/Trip-Planner.git
cd Trip-Planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then update with your values:

```env
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Trip Planner
```

**Getting Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Maps JavaScript API
4. Create an API Key
5. Add it to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Trip-Planner/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── Map/         # Map integration components
│   │   ├── Itinerary/   # Itinerary components
│   │   ├── Highlights/  # Attractions components
│   │   └── Transportation/ # Transport components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand store
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── styles/          # Global styles
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind config
└── next.config.js       # Next.js config
```

## 🏗️ Development

### Feature Branches

Project uses feature branches for development:

```bash
# Map Integration
git checkout feature/map-integration

# Daily Itinerary
git checkout feature/daily-itinerary

# Highlights & Attractions
git checkout feature/highlights-attractions

# And more...
```

### Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 🧪 Testing

```bash
npm run test
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Tech Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Maps**: Google Maps API
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Build Tool**: Next.js

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## 📝 License

MIT

## 👨‍💻 Author

Fang (b13401084-jpg)

## 📞 Support

For issues and questions, please open a GitHub issue.
