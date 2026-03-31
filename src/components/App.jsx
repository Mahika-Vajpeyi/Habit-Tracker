import React from "react";
import Header from "./Header";
import HabitPanel from "./HabitPanel";
import {useEffect, useState} from "react";

function App() {
const handleShare = () => console.log("Share clicked!");
const handleReset = () => console.log("Reset clicked!");

const countHabit = 0;
const maxHabit = 10;
// const [habits, setHabits] = useState([]);

const [currHabitCount, setCount] = useState(() => {
        const storedHabits = localStorage.getItem("habitCount");
        try{
            return JSON.parse(storedHabits);
        } catch {
            return 0;
        }
    });

    useEffect(() => {
        localStorage.setItem("habitCount", JSON.stringify(currHabitCount));
    }, [currHabitCount]);
// const [selectedHabitId, setSelectedHabit] = useState("");

// useEffect(() => {
//     if (habits.length === 0) {
//         setSelectedHabit(null);
//     } else if (habits.some(h => h.id !== selectedHabitId)) {
//         setSelectedHabit(habits[0].id);
//     }
// }, [habits, selectedHabitId]);

    return (
        <div className="app">
        <Header 
            count = {currHabitCount} 
            max = {maxHabit} 
            onShare = {handleShare} 
            onReset={handleReset}
        />
        <main style = {{padding: "1rem 0"}}>
        <HabitPanel max = {10} />
        </main>
        </div>
    );
}

export default App;