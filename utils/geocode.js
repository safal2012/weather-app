const request = require('request')

const geocode =  (location, callback)=>{
  const data={};
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYXBpLXVzZXIiLCJhIjoiY2t3aTJ4dWlpMTRxZjJ2cXZ3eDR6eHR2dSJ9.VIyZMxM9djQ12C7nTR_8Lw&limit=1`;
  request({url, json:true}, (err, res)=>{

    if(!err && res.body.features.length!=0)
    {
      data.long = res.body.features[0].center[0];
      data.lat = res.body.features[0].center[1];
      data.place = res.body.features[0].place_name;
      // console.log(data);
      callback(undefined, data);
    }
    else
    {
      let error = new Error();
      error.status = 404;
      if(!err && res.body.features.length==0)
        error.message="Please enter a valid location.";
      else  
        error.message="Unable to find location cordinates. Please check your internet connection";
      callback(error, undefined);
    }
  })
  //console.log(data);
}

module.exports = geocode;