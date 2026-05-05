# 🚀 Setup and Testing Guide for Trip Planner

## ✅ Pre-Setup Checklist

Before you start, ensure you have:

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] Git installed
- [ ] A Google Cloud account
- [ ] A code editor (VS Code recommended)

---

## 📦 Step 1: Installation

### 1.1 Clone the Repository

```bash
git clone https://github.com/b13401084-jpg/Trip-Planner.git
cd Trip-Planner
```

### 1.2 Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added XXX packages, and audited XXX packages in Xm
```

### 1.3 Verify Installation

```bash
npm list react next typescript
```

Should show:
```
trip-planner@0.1.0 /path/to/Trip-Planner
├── next@14.0.0
├── react@18.2.0
└── typescript@5.3.0
```

---

## 🔑 Step 2: Google Maps API Setup

### 2.1 Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click "Select a Project" → "New Project"
   - Name: `Trip-Planner`
   - Click "Create"

3. Enable required APIs:
   - Click "APIs & Services" → "Library"
   - Search for "Maps JavaScript API"
   - Click "Enable"
   - Search for "Places API" (optional)
   - Click "Enable"

4. Create an API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

5. Set restrictions (recommended for production):
   - Click on your API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add: `localhost:3000` and your production domain
   - Under "API restrictions", select "Maps JavaScript API"

### 2.2 Configure Environment Variables

Create/update `.env.local`:

```bash
# Copy from example
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Trip Planner
```

**Replace `YOUR_API_KEY_HERE` with your actual API key**

### 2.3 Verify Configuration

```bash
# Check if .env.local exists
ls -la .env.local

# Verify the file contains your API key
grep GOOGLE_MAPS .env.local
```

---

## ▶️ Step 3: Run Development Server

### 3.1 Start the Server

```bash
npm run dev
```

**Expected Output:**
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in XXXms
```

### 3.2 Open in Browser

Visit: **http://localhost:3000**

You should see the application loading.

---

## 🧪 Step 4: Test Each Feature

### 4.1 Map Integration (`feature/map-integration`)

```bash
git checkout feature/map-integration
```

**Access:** http://localhost:3000/trips/1/map

**What to Test:**
- [ ] Map loads without errors
- [ ] Can click on map to add waypoints
- [ ] Waypoint markers appear on map
- [ ] "Calculate Route" button works
- [ ] Route displays on map with directions
- [ ] Distance and duration show correctly
- [ ] "Clear" button resets the map

**Expected Functionality:**
- Click on map → marker appears
- Click "Calculate Route" → directions show
- Route optimization available

---

### 4.2 Daily Itinerary (`feature/daily-itinerary`)

```bash
git checkout feature/daily-itinerary
```

**Access:** http://localhost:3000/trips/1/itinerary

**What to Test:**
- [ ] Sample itinerary displays in table
- [ ] "Add Activity" button opens form
- [ ] Can fill in date, time, location, theme
- [ ] Can assign activity to team member (@mention)
- [ ] Activities sort by date and time
- [ ] Can delete activities
- [ ] Form validation works

**Expected Functionality:**
- Add activity → appears in sorted table
- Delete activity → removed immediately
- Assignments show with @mention formatting

---

### 4.3 Highlights & Attractions (`feature/highlights-attractions`)

```bash
git checkout feature/highlights-attractions
```

**Access:** http://localhost:3000/trips/1/highlights

**What to Test:**
- [ ] Attractions display in grid
- [ ] Category filter buttons work
- [ ] "Add Highlight" form works
- [ ] Can add new attraction with all fields
- [ ] Wikipedia link opens in new tab
- [ ] Ticket URL button works
- [ ] Expandable card details work
- [ ] Delete button removes attraction

**Expected Functionality:**
- Filter by category → shows only that category
- Add attraction → appears in grid
- Learn More → opens Wikipedia
- Operating hours and notes display when expanded

---

### 4.4 Return to Main Branch

After testing features, return to main:

```bash
git checkout main
```

---

## 🔍 Step 5: Code Quality Checks

### 5.1 Type Checking

```bash
npm run type-check
```

**Expected:** Should complete without errors

```
✓ No TypeScript errors
```

### 5.2 Linting

```bash
npm run lint
```

**Expected:** Should pass or show only warnings

```
✓ Created ESLint configuration
```

### 5.3 Build Check

```bash
npm run build
```

**Expected Output:**
```
✓ Creating an optimized production build
✓ Compiled successfully
```

---

## 📋 Step 6: Verify Directory Structure

Ensure these files exist:

```bash
# Check main files
ls -la package.json tsconfig.json tailwind.config.ts next.config.js

# Check components
ls -la src/components/Map/
ls -la src/components/Itinerary/
ls -la src/components/Highlights/

# Check pages
ls -la src/app/trips/
```

---

## 🐛 Step 7: Browser DevTools Testing

### 7.1 Check Console

1. Open DevTools (F12 or right-click → Inspect)
2. Go to "Console" tab
3. Should be **clean with no red errors**

### 7.2 Check Network

1. Go to "Network" tab
2. Refresh the page
3. Check that:
   - [ ] Main page loads (200 status)
   - [ ] No 404 errors
   - [ ] API calls are successful (if any)

### 7.3 Check Performance

1. Go to "Lighthouse" tab
2. Click "Analyze page load"
3. Should show reasonable scores

---

## ⚠️ Common Issues & Fixes

### Issue 1: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is undefined"

**Cause:** Missing or incorrect environment variable

**Fix:**
```bash
# 1. Check .env.local exists
cat .env.local

# 2. Verify the key is correct
# 3. Restart dev server (Ctrl+C, then npm run dev)
```

### Issue 2: "Module not found" errors

**Cause:** Dependencies not installed

**Fix:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Port 3000 already in use

**Cause:** Another app using port 3000

**Fix:**
```bash
# Use different port
npm run dev -- -p 3001
# Visit http://localhost:3001
```

### Issue 4: Map doesn't display

**Cause:** Invalid API key or API not enabled

**Fix:**
1. Verify API key is correct in `.env.local`
2. Check Maps JavaScript API is enabled in Google Cloud
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+F5)

### Issue 5: TypeScript errors

**Cause:** Type mismatches in code

**Fix:**
```bash
# Check specific errors
npm run type-check

# Fix the errors shown in the output
```

---

## 🚀 Step 8: Ready for Development

Once all tests pass:

1. ✅ Create feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. ✅ Make your changes

3. ✅ Commit frequently
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

4. ✅ Push to GitHub
   ```bash
   git push origin feature/your-feature-name
   ```

5. ✅ Create Pull Request on GitHub

---

## 📱 Testing Checklist

- [ ] Development server starts without errors
- [ ] All pages load and render correctly
- [ ] Map integration loads Google Maps
- [ ] Itinerary table displays sample data
- [ ] Highlights grid shows attractions
- [ ] Buttons and forms are interactive
- [ ] No console errors or warnings
- [ ] TypeScript builds without errors
- [ ] Tailwind CSS styles are applied
- [ ] Responsive design works on mobile

---

## 🔧 Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production build
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check

# Git
git checkout main                    # Switch to main
git checkout feature/branch-name     # Switch to feature
git status                          # Check status
git log --oneline                   # View commits
git diff                            # See changes
```

---

## 📞 Need Help?

1. Check this guide again
2. Review console errors
3. Check `.env.local` configuration
4. Clear cache: `rm -rf .next`
5. Reinstall dependencies: `npm install`
6. Restart dev server: `Ctrl+C` then `npm run dev`

---

## 🎯 Next Steps

After successful setup:

1. **Implement remaining features** (Transportation, Authentication, etc.)
2. **Add database integration** (PostgreSQL/MongoDB)
3. **Implement real-time sync** (Socket.io or WebSocket)
4. **Add authentication** (NextAuth.js)
5. **Deploy to production** (Vercel, Heroku, etc.)

---

**Last Updated:** 2026-05-05  
**Status:** ✅ Ready for Development
