var months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

function monthNameToNum(monthname) {
    var month = months.indexOf(monthname);
    return month ? month : 0;
}

document.addEventListener('DOMContentLoaded', () => {
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const monthYearElement = document.getElementById('month-month');
    const yearElement = document.getElementById('year');
    const calendarDaysElement = document.getElementById('calendar-days');

    let currentDate = new Date();
    console.log(currentDate);

    const events = {
        '2024-08-15': 'MSA Meeting at 5 PM',
        '2024-08-20': 'Community Iftar at 7 PM',
        '2024-09-01': 'Charity Fundraiser at 10 AM'
    };

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const totalDaysInMonth = lastDayOfMonth.getDate();

        calendarDaysElement.innerHTML = '';
        
        // Fill in the empty days before the first of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarDaysElement.innerHTML += `<div class="calendar-day"></div>`;
        }

        // Fill in the days of the month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const currentDay = new Date(year, month, day);
            const dateString = currentDay.toISOString().split('T')[0];
            const event = events[dateString] ? `<div class="event">${events[dateString]}</div>` : '';
            calendarDaysElement.innerHTML += `<div class="calendar-day">${day}${event}</div>`;
        }

        // monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
        monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })}`;
        yearElement.textContent = `${year}`;
    }

    const selectedMonth = document.querySelectorAll(".month");
    const selectedYear = document.querySelectorAll(".year");

    selectedMonth.forEach(month => {
        month.addEventListener('click', () => {
            monthYearElement.innerHTML = month.textContent;
            const monthName = month.textContent
            const monthNum = monthNameToNum(monthName);
            currentDate.setMonth(monthNum);
            renderCalendar(currentDate);
        })
    })

    selectedYear.forEach(year => {
        year.addEventListener('click', () => {
            monthYearElement.innerHTML = year.textContent;
            const yearNum = year.textContent
            currentDate.setFullYear(yearNum);
            renderCalendar(currentDate);
        })
    })

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        // console.log(`This is from the prev button${renderCalendar(currentDate)}`);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);


});
