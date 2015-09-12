var ajax = require('ajax/facade');
var hmacsha1 = require('hmacsha1');

var EPOCH_KEY = 'a471a096baaa08c893f48a909d0ae3d3'; // Yes, really - AT requires a signature to get the epoch if we use the other key, but we can't provide a signature until we have an epoch o.0
var API_KEY = 'c2799f9d4f593eb7d77f2ccf6a509521';
var API_SECRET = 'da999252e5b90e7dee0e69a735ec23df';

// We need to know much our time differs from the server time, since signatures are time-based
function calculateDrift(callback, error) {
  // Assumed not to change while the watch is displayed
  if (calculateDrift._drift) {
    callback(calculateDrift._drift);
  } else {
    var startTime = Math.floor(new Date().getTime() / 1000);
    ajax({url: 'https://api.at.govt.nz/v1/time/epoch?api_key=' + EPOCH_KEY, type: 'json'},
         function(response) {
           calculateDrift._drift = response.response.time - startTime;
           console.log('Clock difference from AT servers: ' + calculateDrift._drift+'s');
           callback(calculateDrift._drift);
         }, error);
  }
}

// Signature = HMAC-SHA1(<SECRET>, <current time><KEY>)
//  -- that's right, we sign the *time*, not the url, so the same signature can be used for any request we like until it times out
//     (experiments suggest signatures are valid for 10-15 seconds either side of their timestamp)
function sign(callback, error) {
  calculateDrift(function(drift) {
    var unixTimestampSeconds = Math.floor(new Date().getTime() / 1000) - drift;
    callback(hmacsha1.hex_hmac_sha1(API_SECRET, unixTimestampSeconds + API_KEY));
  }, error);
}

function fetchStop(stopCode, success, error) {
  sign(function(signature) {
    ajax({url: 'https://api.at.govt.nz/v1/public-restricted/departures/' + stopCode + '?api_key=' + API_KEY + '&api_sig=' + signature + '&hours=6&rowCount=3', type: 'json'},
         function(response) {
           console.log('Response: ' + JSON.stringify(response));
           var movements = response.response.movements;
           if (!movements.length) {
             error('No Data');
           } else {
             var buses = movements.map(function(movement) {
               var scheduledArrival = new Date(movement.scheduledArrivalTime);
               var expectedArrival;
               if (movement.expectedArrivalTime) {
                 expectedArrival = new Date(movement.expectedArrivalTime);
               } else {
                 expectedArrival = null;
               }
               return {
                 route: movement.route_short_name,
                 destination: movement.destinationDisplay,
                 scheduled: scheduledArrival,
                 expected: expectedArrival
               };
             });
             success(buses);
           }
         },
         error);
  }, error);
}

this.exports.fetchStop = fetchStop;