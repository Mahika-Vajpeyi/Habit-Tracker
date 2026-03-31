import React, {useState, useEffect} from "react";

//Generates IDs for habits
function uid() {
    return Math.random().toString(36).slice(2, 10);
}

export default function HabitPanel({max = 10}){
    const [habits, setHabits] = useState(() => {
        const stored = localStorage.getItem("habits");
        try{
            return JSON.parse(stored);
        } catch {
            return [];
        }
    });

    const [value, setValue] = useState("");
    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);

    const disabled = (habits.length) >= max;
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

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayKey = makeDateKey(currentYear, currentMonth, today.getDate());
    const [viewDate, setViewDate] = useState(() => new Date(currentYear, currentMonth, 1));

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();

    const daysInMonth = new Date(year, monthIndex+1, 0).getDate();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();

    const blankTiles = Array.from({ length: firstWeekday });
    const daysInMonthTiles = Array.from({ length: daysInMonth }, (_, i) => i + 1 );

    function makeDateKey(year, monthIndex, dayNumber){
        dayNumber = Number(dayNumber) < 10 ? "0" + dayNumber : dayNumber;
        const month = Number(monthIndex + 1) < 10 ? "0" + (monthIndex+1) : (monthIndex+1);

        const formatted_date = year + "-" + month + "-" + dayNumber;
        return formatted_date;
    }

    //Handles addition of a new habit to the list
    function handleSubmit(e) {
        e.preventDefault(); //prevents browser's default behavior which is to reload the page

        const name = value.trim();
        if (!name) return;
        if (disabled) return;

        const newHabit = {
            id: uid(),
            name, //do not need name: because the property and variable name are the same
            createdAt: new Date().toISOString(),
            entries: {}, //records calendar toggles
        };

        setHabits((prev) => [...prev, newHabit]);
        setValue("");
        setCount((prev) => prev+1);
    }

    function handleDelete(id) {
        setHabits((prev) => prev.filter((h) => h.id !== id));
        setCount((prev) => prev-1);
    }

    function toggleEntry(habitId, dateKey){
        setHabits(prevHabits => prevHabits.map(h => {
            if(h.id != habitId) return h;
            else {
                const entries = { ...h.entries };
                console.log(entries);
                
                if(entries[dateKey]){
                    console.log("date present: ", entries[dateKey])
                    delete entries[dateKey];
                } else {
                    console.log("adding date: ", entries[dateKey])
                    entries[dateKey] = true;
                }
                console.log("toggled", habitId, dateKey, entries)

                console.log(entries)
                return { ...h, entries };
            }
        }))
    }

    return(
        <section className="habit-panel">
        {/*Form*/}
            <form className="habit-form" onSubmit={handleSubmit}>
                <input 
                    className="habit-input"
                    type="text"
                    id="habitName"
                    value = {value}
                    maxLength={50}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disabled}
                    aria-label="Habit name"
                    required
                />

                <button className="btn" type="submit" disabled={disabled}>
                    Add
                </button>     
            </form>

            {disabled && (
                <p className="hint muted" aria-live="polite">
                You have reached the limit of {max} habits.
                </p>
            )}

            {/*List*/}
            <div className="month-year-bar">
                <button type="button" className="btn-prev" onClick={() => 
                    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
                Prev
                </button>
                <div className="month-label">
                    {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                </div>
                <button type="button" className="btn-next" onClick={() => 
                        setViewDate(next => new Date(next.getFullYear(), next.getMonth() + 1, 1))}>
                Next
                </button>
            </div>
            <div className="habit-list">
                {habits.length=== 0 ? (
                    <p className="muted">You have no habits yet</p>
                    ) : (
                        habits.map((h) => (
                            <div key={h.id} className="habit-item">
                            <div className = "habit-title">{h.name}</div>
                            <div className = "habit-actions">
                                <button className="btn-delete" onClick={() => handleDelete(h.id)}>
                                    Delete
                                </button>
                            </div>
                            <div className="habit-calendar">
                                    <div className='calendar-weekdays'>
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div className='calendar-days' key={day}>{day}</div>
                                    ))}
                                    </div>

                                    <div className='calendar-grid'>
                                        {blankTiles.map((_, i) => (
                                            <div className='calendar-cell' key={`${h.id}-blank-${i}`} />
                                        ))}
                                        {daysInMonthTiles.map((day) => {
                                            const currDate = makeDateKey(year, monthIndex, day);
                                            const isDone = Boolean(h.entries[currDate]);
                                            const isFuture = Boolean(currDate > todayKey);
                                            return (<div 
                                                className={isFuture ? 'calendar-cell future' : isDone ? 'calendar-cell completed': 'calendar-cell'} 
                                                key={`${h.id}-day-${day}`} 
                                                onClick={() => {
                                                    if(!isFuture) toggleEntry(h.id, currDate)}
                                                }>
                                                {day}
                                                </div>);
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }

            </div>
        </section>
    );
}


