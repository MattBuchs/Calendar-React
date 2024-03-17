import React, { useEffect, useState } from "react";

function App() {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const dayOfWeek = date.toLocaleString("fr-FR", { weekday: "long" });
    const currentMonthLong = date.toLocaleString("fr-FR", { month: "long" });

    const [numberRooms, setNumberRooms] = useState(5);
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
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
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

    // function adjustDay(day) {
    //     const currentDayIndex = date.getDay();
    //     return day === "dimanche" && currentDayIndex === 0 ? 7 : date.getDay();
    // }

    useEffect(() => {
        setDays((prevState) => {
            // Trouver l'index du jour actuel
            const currentDayIndex = prevState.findIndex(
                (day) => day.nameDay === dayOfWeek
            );

            // Décaler les jours pour mettre le jour actuel en première position
            const shiftedDays = [
                ...prevState.slice(currentDayIndex),
                ...prevState.slice(0, currentDayIndex),
            ];

            const week = shiftedDays.map((day, index) => {
                return { ...day, numberDay: currentDay + index };
            });

            return week;
        });
    }, []);

    const previousWeek = () => {
        setDays((prevState) => {
            const startOfWeek = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
            );
            const mondayOfSecondWeek = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - date.getDay() + (date.getDay() === 0 ? 1 : 8)
            );

            return prevState.map((obj) => {
                let newNumberDay = obj.numberDay - 7;
                let newMonth = obj.nameMonth;
                let newNumberMonth = obj.numberMonth;
                let newYear = obj.year;

                // Si le nouveau jour est en dehors du mois actuel
                if (newNumberDay < 1) {
                    newNumberMonth -= 1;
                    if (newNumberMonth < 1) {
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

                // Créez une nouvelle date avec les valeurs mises à jour
                const newDate = new Date(
                    newYear,
                    newNumberMonth - 1,
                    newNumberDay
                );

                // Si la nouvelle date est antérieure au début de la semaine actuelle, retournez l'objet actuel
                if (newDate < startOfWeek) {
                    setIsBtnDisabled(true);
                    return obj;
                }

                if (newDate < mondayOfSecondWeek) setIsBtnDisabled(true);

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
        setIsBtnDisabled(false);
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

    return (
        <div className="bg-slate-300 h-screen">
            <div className="w-[90%] m-auto">
                <h1 className="text-4xl font-bold text-center py-3">
                    Calendar
                </h1>

                <div>
                    <button
                        onClick={previousWeek}
                        className="bg-blue-600 px-4 py-1 rounded mr-2 hover:bg-blue-700 disabled:bg-gray-600"
                        disabled={isBtnDisabled}
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
                                    className="border min-w-12 h-10"
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
                        <tr>
                            {days.map((day) => {
                                return (
                                    <React.Fragment key={day.id}>
                                        {rooms.map((room) => (
                                            <th
                                                key={`${day.id}-${room.id}`}
                                                className="border min-w-12 h-10"
                                            >
                                                <img
                                                    src={room.iconUrl}
                                                    alt={`Salle ${room.name}`}
                                                    className="w-6 h-6 min-w-2 min-h-2 m-auto"
                                                />
                                            </th>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rooms[2].availableTime.map((_, timeIndex) => (
                            <tr key={timeIndex}>
                                {days.map((day) => {
                                    return (
                                        <React.Fragment
                                            key={`${timeIndex}-${day.id}`}
                                        >
                                            {rooms.map((room) => (
                                                <td
                                                    key={`${timeIndex}-${day.id}-${room.id}`}
                                                    className="border min-w-12 h-10"
                                                >
                                                    {day.id <= 2 && (
                                                        <p className="flex justify-center">
                                                            -
                                                        </p>
                                                    )}
                                                    {day.id > 2 && (
                                                        <p className="flex justify-center">
                                                            {room.availableTime[
                                                                timeIndex
                                                            ]
                                                                ? room
                                                                      .availableTime[
                                                                      timeIndex
                                                                  ]
                                                                : "-"}
                                                        </p>
                                                    )}
                                                </td>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
