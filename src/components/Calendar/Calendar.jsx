import { useEffect, useState } from "react";

export default function Calendar({
    date,
    rooms,
    days,
    setDays,
    currentDay,
    currentMonth,
    currentMonthLong,
    currentYear,
    dayOfWeek,
    widthLi,
    dateMax,
    currentDate,
    isBtnDisabled,
    setIsBtnDisabled,
}) {
    // Trouver l'index de l'objet avec le plus grand tableau "availableTime"
    const maxIndex = rooms.reduce((maxIndex, currentRoom, currentIndex) => {
        if (
            currentRoom.availableTime.length >
            rooms[maxIndex].availableTime.length
        ) {
            return currentIndex;
        } else {
            return maxIndex;
        }
    }, 0);

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
                return {
                    ...day,
                    numberDay: currentDay + index,
                    nameMonth: currentMonthLong,
                    numberMonth: currentMonth,
                    year: currentYear,
                };
            });

            return week;
        });
    }, [date]);

    const previousWeek = () => {
        setIsBtnDisabled({ previous: false, next: false });
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

        const previousWeekDate = new Date(
            days[0].year,
            days[0].numberMonth - 1,
            days[0].numberDay - 7
        );

        if (previousWeekDate.getTime() < currentDate.getTime()) {
            setIsBtnDisabled({ previous: true, next: false });
        }
    };

    const nextWeek = () => {
        setIsBtnDisabled({ previous: false, next: false });
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

        const nextWeekDate = new Date(
            days[6].year,
            days[6].numberMonth - 1,
            days[6].numberDay + 7
        );

        if (nextWeekDate.getTime() > dateMax.getTime())
            setIsBtnDisabled({ previous: false, next: true });
    };

    return (
        <section className="flex flex-col items-center w-[90%] max-w-[1400px] m-auto">
            <div className="flex flex-col items-center w-full">
                <div className="flex w-64 justify-between items-center mb-2 mt-8">
                    <button
                        onClick={previousWeek}
                        className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 disabled:bg-gray-600"
                        disabled={isBtnDisabled.previous}
                    >
                        <img
                            src="/img/chevron-left.svg"
                            alt="Semaine précédente"
                            className="w-4"
                        />
                    </button>
                    <h2 className="text-center font-bold text-2xl">
                        {days[0].year === days[6].year
                            ? days[0].year
                            : `${days[0].year}/${days[6].year}`}
                    </h2>
                    <button
                        onClick={nextWeek}
                        className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 disabled:bg-gray-600"
                        disabled={isBtnDisabled.next}
                    >
                        <img
                            src="/img/chevron-right.svg"
                            alt="Semaine suivante"
                            className="w-4"
                        />
                    </button>
                </div>
                <div className="flex flex-wrap justify-center text-center w-full">
                    {days.map((day) => (
                        <div key={day.id} className="border">
                            <div className="font-bold">
                                <span>
                                    {day.nameDay}
                                    <br />
                                    {day.numberDay} {day.nameMonth}
                                </span>
                            </div>
                            <ul className="border flex">
                                {rooms.map((room) => (
                                    <li
                                        key={`${day.id}-${room.id}`}
                                        className={`border ${widthLi} flex justify-center items-center`}
                                    >
                                        <img
                                            src={room.iconUrl}
                                            alt={`Salle ${room.name}`}
                                            className="w-6 h-6 min-w-2 min-h-2 m-auto"
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="flex">
                                {rooms.map((room) => (
                                    <ul key={room.id} className="flex flex-col">
                                        {rooms[maxIndex].availableTime.map(
                                            (_, timeIndex) => (
                                                <li
                                                    key={`${room.id}-${timeIndex}`}
                                                    className={`border ${widthLi} flex justify-center items-center`}
                                                >
                                                    <p>
                                                        {room.availableTime[
                                                            timeIndex
                                                        ]
                                                            ? room
                                                                  .availableTime[
                                                                  timeIndex
                                                              ]
                                                            : "-"}
                                                    </p>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
