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
  }
];

function ajax(options, success, failure) {
  var stubs = CONTENTS.filter(function(stub) {return (typeof stub.url == 'string') ? options.url == stub.url : options.url.match(stub.url);});
  if (stubs.length > 0) {
    success(stubs[0].data);
  } else {
    failure('URL ' + options.url + ' is not stubbed');
  }
}

this.exports = ajax;