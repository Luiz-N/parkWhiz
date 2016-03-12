import Ember from 'ember';
import gps2zip from 'npm:gps2zip';

export default Ember.Route.extend(gps2zip,{

  // model () {
  //   let cities = [
  //       {id: "chicago", name:"Chicago", code: "Chicago", hub:2, lat:41.875848 , lng: -87.625494, parkWhizUrl: ''},
  //       {id: "new-york", name:"New York", code: "NY", hub:1, lat:40.712784, lng: -74.005941, parkWhizUrl: ''},
  //       {id: "san-francisco", name:"San Francisco", code: "SF", hub:3, lat:37.774929, lng: -122.419416, parkWhizUrl: ''},
  //       {id: "denver", name:"Denver", code: "Denver", hub:15, lat:39.739236, lng: -104.990251, parkWhizUrl: ''},
  //       {id: "dc", name:"D.C.", code: "DC", hub:152, lat:38.907192, lng: -77.036871, parkWhizUrl: ''}
  //     ];
  //   // let date = new Date;
  //   // cities.forEach(
  //   //   (city) => {
  //   //     let record = this.store.createRecord("city", city);
  //   //     record.save();
  //   //   });
  //     // let cityObject = DS.PromiseObject.create({
  //   //   //   promise: this.store.createRecord("city", city).save()
  //   //   // })
  //     // return cityObject.then(function(record) {
  //   //   //   debugger;
  //   //   //   return record
  //   //   // })

  //   //   let dayRecord = this.store.createRecord("day", {
  //   //     date: date
  //   //   });
  //   //   let cityRecord = this.store.createRecord("city", city);
  //   //   cityRecord.get('days').addObject(dayRecord);
  //   //   dayRecord.save().then(function() {
  //   //     return cityRecord.save();
  //   //   })
  //   // this.store.find('city', city.id)
  //     // this.store.find("city", city.id).then(function(record){record.save()});
  //     // cityRecord.save();
  //   // })


  //   return this.store.findAll('city');
  // },

  // setupController(controller, model) {
  //   // debugger;
  //   // controller.set('cities', 'model');
  // }

  // model (x, y) {
  //   let store = this;
  //   // let getZipCodes = this.get('getZipCodes');

  //   return Ember.$.get('http://crossorigin.me/http://www.parkwhiz.com/search/table/?f=2&hub_id=1').then(function(resp) {
  //     let firstKeyPos = resp.indexOf("log = ");
  //     let secondKeyPos = resp.indexOf("</script>");
  //     let str = resp.slice(firstKeyPos + 6,secondKeyPos-2);
  //     let jsonObj = eval("(" + str + ")");
  //     debugger;
  //     return jsonObj;
  //   });

    // return Ember.$.getJSON('http://crossorigin.me/http://spothero.com/api/v1/facilities/rates/?latitude=41.88214&longitude=-87.63240&sort=distance&distance__gt=10&distance__lt=10000');
  // },


  // setupController(controller, model) {
  //   debugger;
  //   let spots = model.data.results;
  //   let gps2zip = this.get('gps2zip');
  //   let zips = {};
  //   // for (var i = 0; i < spots.length; i++) {
  //   // let zips = Ember.RSVP.Promise(function(resolve) {
  //   let records = spots.map(
  //       (spot) => {
  //         let gps2zip = this.get('gps2zip');
  //         let zip = gps2zip(spot.latitude, spot.longitude).zip_code;
  //         return {
  //           zip: String(zip),
  //           price: Math.round(spot.highest_price/100)
  //         }
  //     });
  //   controller.set('model', records);
  // }
      // console.log(zips);
      // resolve()
    // });

    // let mod = spots.map( (spot) => {
    //   // let spot = spots[i];
    //   let latString = spot.latitude.toFixed(4).replace(".","");
    //   let lonString = spot.longitude.toFixed(4).replace(".","");
    //   let zipId = latString + lonString;
    //   console.log('searching for zip' + zipId);
    //   //  this.store.createRecord('zip', {
    //   //   coordID: zipId,
    //   //   name: 'something'
    //   // }).save()
    //   // debugger;
    //   // zip.save();
    //   let id = this.store.query('zip', {coordID: zipId}).then(function(resp) {
    //     debugger;
    //     return resp.get('id');
    //   });
    //   // return {id: id};
    //   // debugger;
    // });


    // spots.forEach(
    //   (spot) => {
    //   debugger;
    // })







});
