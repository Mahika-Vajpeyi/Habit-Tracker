# Habit Tracker

A simple, interactive habit tracker built with React. Users can create habits, track daily completion using a calendar view, and persist data locally in the browser.

## Features

- Add and delete habits
- Monthly calendar view for each habit
- Toggle daily completion by clicking calendar cells
- Prevent toggling future dates
- Navigate between months (Prev / Next)
- Data persistence using localStorage
- Clean and responsive grid layout

## Tech Stack

- React (functional components + hooks)
- JavaScript (ES6+)
- CSS (grid + flexbox)
- Browser Local Storage

## Project Structure

```
habit-tracker/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  └─ HabitPanel.jsx
│  ├─ styles/
│  │  └─ main.css
│  └─ index.js
├─ package.json
└─ README.md
```

## How It Works

### State Management

- `habits`: array of habit objects
- Each habit:

```json
{
  "id": "string",
  "name": "string",
  "createdAt": "ISO string",
  "entries": {
    "YYYY-MM-DD": true
  }
}
```

### Date Handling

- Dates are stored as strings in `YYYY-MM-DD` format
- Enables easy comparison and lookup
- Monthly grid is computed dynamically based on the number of days in the month and the first weekday offset

### Calendar Interaction

- Clicking a day toggles completion
- Future dates are disabled
- Each habit maintains its own independent state

## Local Storage Persistence

- Data is loaded on initial render using a lazy `useState` initializer
- Data is saved whenever `habits` changes using `useEffect`

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm start
```

3. Open in browser

```
http://localhost:3000
```

## Future Improvements

- Yearly heatmap view (GitHub-style)
- Streak tracking per habit
- Highlight current day
- Disable editing past a certain range
- Drag to fill multiple days
- Backend sync (Firebase / Supabase)