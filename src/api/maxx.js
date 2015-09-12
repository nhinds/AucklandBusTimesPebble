var ajax = require('ajax/facade');

function parseDate(date) {
  if (date.indexOf('/Date(') === 0 && date.indexOf(')/') === date.length - 2) {
    var dateString = date.substring(6, date.length - 2);
    return new Date(parseInt(dateString));
  }
}

function timeOf(date) {
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return date.getHours() + ':' + minutes;
}

function fetchStop(stopCode, success, error) {
  ajax({url: 'http://api.maxx.co.nz/RealTime/v2/Departures/Stop/' + stopCode + '?hours=6', type: 'json'},
       function(response) {
         console.log('Response: ' + JSON.stringify(response));
         if (response.Error) {
           error(response.Error.Description || response.Error);
         } else {
           var movements = response.Movements;
           if (!movements.length) {
             error('No Data');
           } else {
             var buses = movements.map(function(movement) {
               var scheduledArrival = parseDate(movement.ActualArrivalTime);
               var scheduledTime = timeOf(scheduledArrival);
               var arrivalHint;
               if (movement.ExpectedArrivalTime) {
                 var expectedArrival = parseDate(movement.ExpectedArrivalTime);
                 var now = new Date();
                 var remainingMinutes = Math.floor((expectedArrival - now) / 60 / 1000);
                 if (remainingMinutes < 1) {
                   arrivalHint = '*';
                 } else {
                   arrivalHint = remainingMinutes;
                 }
               } else {
                 arrivalHint = '';
               }
               return {
                 route: movement.Route,
                 destination: movement.DestinationDisplay,
                 scheduled: scheduledTime,
                 arrivalHint: arrivalHint
               };
             });
             success(buses);
           }
         }
       },
       function(e) {
         error(e);
       });
}

this.exports.fetchStop = fetchStop;