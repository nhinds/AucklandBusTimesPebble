var CONTENTS = [
  {
    url: 'http://api.maxx.co.nz/RealTime/v2/Departures/Stop/7747?hours=6',
    data: {"Error":null,"Extensions":[],"Movements":[
      {"ActualArrivalTime":"\/Date(1436577360000)\/","ActualDepartureTime":"\/Date(1436577360000)\/","ArrivalBoardingActivity":"alighting","ArrivalPlatformName":null,"ArrivalStatus":"noReport","DepartureBoardingActivity":"boarding","DeparturePlatformName":null,"DestinationDisplay":"UPLAND RD","ExpectedArrivalTime":"\/Date("+(new Date().getTime() + 30 * 1000)+")\/","ExpectedDepartureTime":"\/Date(1436577427000)\/","InCongestion":false,"Monitored":true,"Route":"606","Stop":"7747","TimeStamp":"\/Date(1436576019802)\/","VehicleJourneyName":null},
      {"ActualArrivalTime":"\/Date(1436578020000)\/","ActualDepartureTime":"\/Date(1436578020000)\/","ArrivalBoardingActivity":"alighting","ArrivalPlatformName":null,"ArrivalStatus":"noReport","DepartureBoardingActivity":"boarding","DeparturePlatformName":null,"DestinationDisplay":"CIVIC CTR","ExpectedArrivalTime":"\/Date("+(new Date().getTime() + 15 * 60 * 1000)+")\/","ExpectedDepartureTime":null,"InCongestion":false,"Monitored":false,"Route":"606","Stop":"7747","TimeStamp":"\/Date(1436576019802)\/","VehicleJourneyName":null},
      {"ActualArrivalTime":"\/Date(1436581980000)\/","ActualDepartureTime":"\/Date(1436581980000)\/","ArrivalBoardingActivity":"alighting","ArrivalPlatformName":null,"ArrivalStatus":"noReport","DepartureBoardingActivity":"boarding","DeparturePlatformName":null,"DestinationDisplay":"UPLAND RD","ExpectedArrivalTime":null,"ExpectedDepartureTime":null,"InCongestion":false,"Monitored":false,"Route":"606","Stop":"7747","TimeStamp":"\/Date(1436576019802)\/","VehicleJourneyName":null},
      {"ActualArrivalTime":"\/Date(1436582520000)\/","ActualDepartureTime":"\/Date(1436582520000)\/","ArrivalBoardingActivity":"alighting","ArrivalPlatformName":null,"ArrivalStatus":"noReport","DepartureBoardingActivity":"boarding","DeparturePlatformName":null,"DestinationDisplay":"CIVIC CTR","ExpectedArrivalTime":null,"ExpectedDepartureTime":null,"InCongestion":false,"Monitored":false,"Route":"606","Stop":"7747","TimeStamp":"\/Date(1436576019802)\/","VehicleJourneyName":null},
      {"ActualArrivalTime":"\/Date(1436586480000)\/","ActualDepartureTime":"\/Date(1436586480000)\/","ArrivalBoardingActivity":"alighting","ArrivalPlatformName":null,"ArrivalStatus":"noReport","DepartureBoardingActivity":"boarding","DeparturePlatformName":null,"DestinationDisplay":"UPLAND RD","ExpectedArrivalTime":null,"ExpectedDepartureTime":null,"InCongestion":false,"Monitored":false,"Route":"606","Stop":"7747","TimeStamp":"\/Date(1436576019802)\/","VehicleJourneyName":null}
    ]}
  },
  {
    url: 'https://api.at.govt.nz/v1/time/epoch?api_key=a471a096baaa08c893f48a909d0ae3d3',
    data: {"status":"OK","response":{"type":"epoch","time":1442052987},"error":null}
  },
  {
    url: /https:\/\/api\.at\.govt\.nz\/v1\/public-restricted\/departures\/7747\?api_key=c2799f9d4f593eb7d77f2ccf6a509521&api_sig=[a-z0-9]*&hours=6&rowCount=3/,
    data: {"extensions":[],"movements":[
      {"scheduledArrivalTime":"2015-07-11T01:16:00+00:00","scheduledDepartureTime":"2015-07-11T01:16:00+00:00","arrivalBoardingActivity":"alighting","arrivalPlatformName":null,"arrivalStatus":"noReport","departureBoardingActivity":"boarding","departurePlatformName":null,"destinationDisplay":"UPLAND RD","expectedArrivalTime":new Date(new Date().getTime() + 30 * 1000).toISOString(),"expectedDepartureTime":"2015-07-11T01:17:07.000Z","inCongestion":false,"monitored":false,"route_short_name":"606","stop_code":"7747","timestamp":"2015-07-11T00:53:39.802Z","vehicleJourneyName":null},
      {"scheduledArrivalTime":"2015-07-11T01:27:00+00:00","scheduledDepartureTime":"2015-07-11T01:27:00+00:00","arrivalBoardingActivity":"alighting","arrivalPlatformName":null,"arrivalStatus":"noReport","departureBoardingActivity":"boarding","departurePlatformName":null,"destinationDisplay":"CIVIC CTR","expectedArrivalTime":new Date(new Date().getTime() + 15 * 60 * 1000).toISOString(),"expectedDepartureTime":"2015-07-11T01:17:07.000Z","inCongestion":false,"monitored":false,"route_short_name":"606","stop_code":"7747","timestamp":"2015-07-11T00:53:39.802Z","vehicleJourneyName":null},
      {"scheduledArrivalTime":"2015-07-11T02:33:00+00:00","scheduledDepartureTime":"2015-07-11T02:33:00+00:00","arrivalBoardingActivity":"alighting","arrivalPlatformName":null,"arrivalStatus":"noReport","departureBoardingActivity":"boarding","departurePlatformName":null,"destinationDisplay":"UPLAND RD","expectedArrivalTime":null,"expectedDepartureTime":null,"inCongestion":false,"monitored":false,"route_short_name":"606","stop_code":"7747","timestamp":"2015-07-11T00:53:39.802Z","vehicleJourneyName":null},
      {"scheduledArrivalTime":"2015-07-11T02:42:00+00:00","scheduledDepartureTime":"2015-07-11T02:42:00+00:00","arrivalBoardingActivity":"alighting","arrivalPlatformName":null,"arrivalStatus":"noReport","departureBoardingActivity":"boarding","departurePlatformName":null,"destinationDisplay":"CIVIC CTR","expectedArrivalTime":null,"expectedDepartureTime":null,"inCongestion":false,"monitored":false,"route_short_name":"606","stop_code":"7747","timestamp":"2015-07-11T00:53:39.802Z","vehicleJourneyName":null},
      {"scheduledArrivalTime":"2015-07-11T03:48:00+00:00","scheduledDepartureTime":"2015-07-11T03:48:00+00:00","arrivalBoardingActivity":"alighting","arrivalPlatformName":null,"arrivalStatus":"noReport","departureBoardingActivity":"boarding","departurePlatformName":null,"destinationDisplay":"UPLAND RD","expectedArrivalTime":null,"expectedDepartureTime":null,"inCongestion":false,"monitored":false,"route_short_name":"606","stop_code":"7747","timestamp":"2015-07-11T00:53:39.802Z","vehicleJourneyName":null}
    ]}
  }
];

function ajax(options, success, failure) {
  console.log('Fake AJAX call for ' + JSON.stringify(options));
  var stubs = CONTENTS.filter(function(stub) {return (typeof stub.url == 'string') ? options.url == stub.url : options.url.match(stub.url);});
  if (stubs.length > 0) {
    success(stubs[0].data);
  } else {
    failure('URL ' + options.url + ' is not stubbed');
  }
}

this.exports = ajax;