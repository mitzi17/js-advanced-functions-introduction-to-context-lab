// Your code here

function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [ ],
        timeOutEvents: [ ]
    }
}

function createEmployeeRecords (arrOfArrays) {
    return arrOfArrays.map( arr => createEmployeeRecord(arr))
}

function createTimeInEvent (recordObj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    recordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return recordObj
}

function createTimeOutEvent (recordObj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    recordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return recordObj
}

function hoursWorkedOnDate(employee, soughtDate) {
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}