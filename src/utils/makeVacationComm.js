export function makeVacation(vacation) {
    const requestParam = {
        "username": vacation.values.username,
        "vacationtype": vacation.values.vacationtype,
        "officialholiday": vacation.values.officialholiday,
        "startdate": vacation.values.startdate,
        "enddate": vacation.values.enddate,
        "title": vacation.values.title,
        "body": vacation.values.body
    }

    return requestParam;
}