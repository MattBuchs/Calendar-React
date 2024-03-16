import { useEffect, useState } from "react";

function App() {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const dayOfWeek = date.toLocaleString("fr-FR", { weekday: "long" });
    const currentMonthLong = date.toLocaleString("fr-FR", { month: "long" });

    const [numberRooms, setNumberRooms] = useState(3);
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

    useEffect(() => {
        setDays((prevState) => {
            const today = date.getDay();
            const startingDay = currentDay - today + 1;

            const updatedDays = prevState.map((obj) => {
                let dayNumber = startingDay + obj.id - 1;

                if (dayNumber <= 0) {
                    dayNumber += daysInMonth;
                } else if (dayNumber > daysInMonth) {
                    dayNumber -= daysInMonth;
                }

                return { ...obj, numberDay: dayNumber };
            });

            // Trouver l'index du jour actuel
            const currentDayIndex = updatedDays.findIndex(
                (day) => day.nameDay === dayOfWeek
            );

            // Décaler les jours pour mettre le jour actuel en première position
            const shiftedDays = [
                ...updatedDays.slice(currentDayIndex),
                ...updatedDays.slice(0, currentDayIndex),
            ];

            // Tri des jours par leur id pour réorganiser dans l'ordre naturel
            shiftedDays.sort((a, b) => a.id - b.id);

            return shiftedDays;
        });
    }, []);

    const previousWeek = () => {
        setDays((prevState) => {
            return prevState.map((obj) => {
                let newNumberDay = obj.numberDay - 7;
                let newMonth = obj.nameMonth;
                let newNumberMonth = obj.numberMonth;
                let newYear = obj.year;

                // Si le nouveau jour est en dehors du mois actuel
                if (newNumberDay < 1) {
                    newNumberMonth -= 1;
                    if (newNumberMonth < 1) {
                        console.log("newNumberMonth", newNumberMonth);
                        // Si le nouveau mois est janvier, passer à l'année précédente
                        newNumberMonth = 12;
                        newYear -= 1;
                    }

                    // Mise à jour du nombre si on recule d'un mois
                    const previousMonthDays = new Date(
                        currentYear,
                        newNumberMonth,
                        0
                    ).getDate();
                    newNumberDay += previousMonthDays;

                    // Mise à jour du mois si on recule d'un mois
                    newMonth = new Date(
                        currentYear,
                        newNumberMonth - 1,
                        1
                    ).toLocaleString("fr-FR", { month: "long" });
                }

                return {
                    ...obj,
                    numberDay: newNumberDay,
                    nameMonth: newMonth,
                    numberMonth: newNumberMonth,
                    year: newYear,
                };
            });
        });
    };

    const nextWeek = () => {
        setDays((prevState) => {
            return prevState.map((obj) => {
                let newNumberDay = obj.numberDay + 7;
                let newMonth = obj.nameMonth;
                let newNumberMonth = obj.numberMonth;
                let newYear = obj.year;

                // Si le nouveau jour est en dehors du mois actuel
                const daysInCurrentMonth = new Date(
                    newYear,
                    newNumberMonth,
                    0
                ).getDate();
                if (newNumberDay > daysInCurrentMonth) {
                    newNumberDay -= daysInCurrentMonth;
                    newNumberMonth += 1;

                    if (newNumberMonth > 12) {
                        // Si le nouveau mois est janvier, passer à l'année suivante
                        newNumberMonth = 1;
                        newYear += 1;
                    }

                    // Mise à jour du mois si on avance d'un mois
                    newMonth = new Date(
                        newYear,
                        newNumberMonth - 1,
                        1
                    ).toLocaleString("fr-FR", { month: "long" });
                }

                return {
                    ...obj,
                    numberDay: newNumberDay,
                    nameMonth: newMonth,
                    numberMonth: newNumberMonth,
                    year: newYear,
                };
            });
        });
    };

    // console.log(date);
    return (
        <div className="bg-slate-300 h-screen">
            <div className="w-[80%] m-auto">
                <h1 className="text-4xl font-bold text-center py-3">
                    Calendar
                </h1>

                <div>
                    <button
                        onClick={previousWeek}
                        className="bg-blue-600 px-4 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                        <img
                            src="/img/chevron-left.svg"
                            alt="Semaine précédente"
                            className="w-4"
                        />
                    </button>
                    <button
                        onClick={nextWeek}
                        className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                    >
                        <img
                            src="/img/chevron-right.svg"
                            alt="Semaine suivante"
                            className="w-4"
                        />
                    </button>
                </div>

                <table>
                    <thead>
                        <tr className="border">
                            <th colSpan={7 * numberRooms}>
                                {days[0].year === days[6].year
                                    ? days[0].year
                                    : `${days[0].year}/${days[6].year}`}
                            </th>
                        </tr>
                        <tr>
                            {days.map((day) => (
                                <th
                                    key={day.id}
                                    className="border p-2"
                                    colSpan={numberRooms}
                                >
                                    <span>
                                        {day.nameDay}
                                        <br />
                                        {day.numberDay} {day.nameMonth}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* {days.map((day, index) => (
                            <td key={index}>{day}</td>
                        ))} */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
