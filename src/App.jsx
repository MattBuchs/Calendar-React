import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";

function App() {
    const [date, setDate] = useState(new Date());
    const currentDate = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const dayOfWeek = date.toLocaleString("fr-FR", { weekday: "long" });
    const currentMonthLong = date.toLocaleString("fr-FR", { month: "long" });
    const dateMax = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 6,
        currentDate.getDate()
    );
    const maxDay = dateMax.getDate();
    const maxMonth = dateMax.getMonth() + 1;
    const maxYear = dateMax.getFullYear();
    const minDay = currentDate.getDate();
    const minMonth = currentDate.getMonth() + 1;
    const minYear = currentDate.getFullYear();

    const [isBtnDisabled, setIsBtnDisabled] = useState({
        previous: true,
        next: false,
    });

    const [rooms, setRooms] = useState([
        {
            id: 1,
            name: "Agents H98 Absinthe",
            iconUrl: "/img/absinthe.svg",
            availableTime: ["14:00", "16:00", "18:00"],
        },
        {
            id: 2,
            name: "Le Dragon de l'île mystérieuse",
            iconUrl: "/img/dragon.svg",
            availableTime: ["14:00", "16:00", "18:00"],
        },
        {
            id: 3,
            name: "Sherlock Holmes",
            iconUrl: "/img/magnifying-glass.svg",
            availableTime: ["13:45", "16:00", "18:15", "20:30"],
        },
        {
            id: 4,
            name: "Les Pirates",
            iconUrl: "/img/pirate.svg",
            availableTime: ["13:45", "16:00", "18:15", "20:30"],
        },
        {
            id: 5,
            name: "Magie & Sorcellerie",
            iconUrl: "/img/magic.svg",
            availableTime: ["14:00", "16:00", "18:00"],
        },
    ]);

    const [days, setDays] = useState([
        {
            id: 1,
            nameDay: "lundi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 2,
            nameDay: "mardi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 3,
            nameDay: "mercredi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 4,
            nameDay: "jeudi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 5,
            nameDay: "vendredi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 6,
            nameDay: "samedi",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
        {
            id: 7,
            nameDay: "dimanche",
            numberDay: null,
            nameMonth: currentMonthLong,
            numberMonth: currentMonth,
            year: currentYear,
        },
    ]);

    const [displayRooms, setDisplayRooms] = useState(rooms);
    const [widthLi, setWidthLi] = useState("w-14 h-9");

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setWidthLi("w-14 h-9");
            return setDisplayRooms(rooms);
        }

        setWidthLi("w-28 h-12");
        setDisplayRooms(rooms.filter((room) => room.id === Number(value)));
    };

    const handleDate = (e) => {
        const value = e.target.value;

        if (value === "") {
            const previousWeekDate = new Date(
                days[0].year,
                days[0].numberMonth - 1,
                days[0].numberDay - 7
            );

            const nextWeekDate = new Date(
                days[6].year,
                days[6].numberMonth - 1,
                days[6].numberDay + 7
            );

            if (previousWeekDate.getTime() < currentDate.getTime())
                setIsBtnDisabled({ previous: true, next: false });
            else if (nextWeekDate.getTime() > dateMax.getTime())
                setIsBtnDisabled({ previous: false, next: true });
            else setIsBtnDisabled({ previous: false, next: false });

            return setDate(new Date());
        }

        const day = value.slice(8, 10);
        const month = Number(value.slice(5, 7)) - 1;
        const year = value.slice(0, 4);

        setDate(new Date(year, month, day));

        const previousWeekDate = new Date(year, month, day - 7);
        const nextWeekDate = new Date(year, month, day + 7);

        if (previousWeekDate.getTime() < currentDate.getTime())
            setIsBtnDisabled({ previous: true, next: false });
        else if (nextWeekDate.getTime() > dateMax.getTime())
            setIsBtnDisabled({ previous: false, next: true });
        else setIsBtnDisabled({ previous: false, next: false });
    };

    return (
        <div className="bg-slate-300 min-h-screen">
            <h1 className="text-4xl font-bold text-center py-3">Calendar</h1>

            <div className="text-center">
                <select
                    name="choice-room"
                    onChange={handleChange}
                    className="text-center"
                >
                    <option value="">Toutes les salles</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-center mt-3">
                <input
                    type="date"
                    name="date-search"
                    min={`${minYear}-${
                        minMonth < 10 ? "0" + minMonth : minMonth
                    }-${minDay}`}
                    max={`${maxYear}-${
                        maxMonth < 10 ? "0" + maxMonth : maxMonth
                    }-${maxDay}`}
                    onChange={handleDate}
                />
            </div>

            <Calendar
                date={date}
                rooms={displayRooms}
                days={days}
                setDays={setDays}
                currentDay={currentDay}
                currentMonthLong={currentMonthLong}
                currentYear={currentYear}
                dayOfWeek={dayOfWeek}
                widthLi={widthLi}
                dateMax={dateMax}
                currentDate={currentDate}
                isBtnDisabled={isBtnDisabled}
                setIsBtnDisabled={setIsBtnDisabled}
            />
        </div>
    );
}

export default App;
