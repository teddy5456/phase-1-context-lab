function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesInfo) {
    return employeesInfo.map(function(employeeInfo) {
      return createEmployeeRecord(employeeInfo);
    });
  }
  
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(function(event) {
      return event.date === date;
    });
    let timeOut = employee.timeOutEvents.find(function(event) {
      return event.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(function(event) {
      return event.date;
    });
    let payable = datesWorked.reduce(function(totalPayable, date) {
      return totalPayable + wagesEarnedOnDate(employee, date);
    }, 0);
    return payable;
  }
  
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(function(employee) {
      return employee.firstName === firstNameString;
    });
  }
  
  function calculatePayroll(employees) {
    let payroll = employees.reduce(function(totalPayroll, employee) {
      return totalPayroll + allWagesFor(employee);
    }, 0);
    return payroll;
  }
  
// 11880
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


