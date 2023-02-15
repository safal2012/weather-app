const request = require('request');

const forecast =  (long, lat, callback)=>{
  const url = `http://api.weatherapi.com/v1/current.json?key=a22c3eacfeab4e26bbb171110211811&q='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&aqi=no`;

  request({url:url, json:true}, (err, res)=>{
    let error = new Error();
    if(err || res.body.error)
    {
      error.status=404.
      error.message = res.body.error?res.body.error.message:"Sorry, We are Unable to find weather."
      return callback(error, undefined);
    }
    else
    {
      const data ={};
      data.temp = res.body.current.temp_c;
      data.feelsLike = res.body.current.temp_c;
      return callback(undefined, data);
    }
  })
}
module.exports = forecast;

