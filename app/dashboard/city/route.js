import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    // Ember.$.ajaxSetup({
    //   headers : {
    //     'x-requested-with' : 'XMLHttpRequest'
    //   }
    // });
  },

  model(params) {
    let city = this.store.find('city', params.city_id);
    debugger;
    return city
    //   .then(function(city){
    //     let lastUpdate = city.get('lastUpdate');
    //     if (!lastUpdate || lastUpdate.toDateString() != (new Date).toDateString()) {
    //       let lat = city.get('lat');
    //       let lng = city.get('lng');
    //       let promiseObject = DS.PromiseObject.create({
    //         // https://cors-anywhere.herokuapp.com/
    //         promise: Ember.$.getJSON('https://crossorigin.me/http://spothero.com/api/v1/facilities/rates/?latitude='+lat+'&longitude='+lng+'&sort=distance&distance__gt=10&distance__lt=10000')
    //       });
    //       return promiseObject.then((resp)=>{return resp.data.results;});
    //     }
    //   }).then((spotHeroRawData) => {
    //     if (spotHeroRawData) {
    //       city.set('spotHeroRawData', spotHeroRawData);
    //     }
    //     let lastUpdate = city.get('lastUpdate');
    //     if (!lastUpdate || lastUpdate.toDateString() != (new Date).toDateString()) {
    //       let hub = city.get('hub');
    //       // let url = 'https://cors-anywhere.herokuapp.com/http://www.parkwhiz.com/search/table/?f=1&timezone=America%2FChicago&start_date=3%2F3%2F2016&start_time=4%3A30pm&end_date=3%2F3%2F2016&end_time=7%3A30pm&bounds%5B0%5D%5B%5D=41.98169858761585&bounds%5B0%5D%5B%5D=-87.47323800965353&bounds%5B1%5D%5B%5D=41.84808289211652&bounds%5B1%5D%5B%5D=-87.47323800965353&bounds%5B2%5D%5B%5D=41.84808289211652&bounds%5B2%5D%5B%5D=-87.78772165223165&bounds%5B3%5D%5B%5D=41.98169858761585&bounds%5B3%5D%5B%5D=-87.78772165223165&lat_rad=0.73091096684422&lng_rad=-1.5294285014482&lat_rad_root=0.73091096684422&lng_rad_root=-1.5294285014482&hub_id=2'
    //       let url = 'https://crossorigin.me/http://www.parkwhiz.com/search/table/?f=2&hub_id='+hub;
    //       if (city.get('name') === "Denver") {
    //         url = 'https://crossorigin.me/http://www.parkwhiz.com/search/table/?f=1&timezone=America%2FDenver&start_date=3%2F3%2F2016&start_time=11%3A00am&end_date=3%2F3%2F2016&end_time=2%3A00pm&bounds%5B0%5D%5B%5D=40.006781336823&bounds%5B0%5D%5B%5D=-104.05418738452147&bounds%5B1%5D%5B%5D=39.477748792846675&bounds%5B1%5D%5B%5D=-104.05418738452147&bounds%5B2%5D%5B%5D=39.477748792846675&bounds%5B2%5D%5B%5D=-105.31212195483397&bounds%5B3%5D%5B%5D=40.006781336823&bounds%5B3%5D%5B%5D=-105.31212195483397&lat_rad=0.69376402816265&lng_rad=-1.8324965177084&lat_rad_root=0.69376402816265&lng_rad_root=-1.8324965177084&hub_id='+hub;
    //       }

    //       let promiseObject = DS.PromiseObject.create({
    //         promise: Ember.$.get(url)
    //       });

    //       return promiseObject.then(
    //         (resp) => {
    //           let firstKeyPos = resp.indexOf("log = ");
    //           let secondKeyPos = resp.indexOf("</script>");
    //           let str = resp.slice(firstKeyPos + 6,secondKeyPos-2);
    //           let jsonObj = eval("(" + str + ")");
    //           return jsonObj;
    //         })
    //     }
    //   }).then((parkWhizRawData) => {
    //     if (parkWhizRawData) {
    //       city.set('parkWhizRawData', parkWhizRawData);
    //     }
    //     return city;
    //   })
  },

  // setupController(controller, model) {
    // if (model.get('dirtyType')) {
    //   model.set('lastUpdate', new Date);
    //   model.save();
    // }
    // controller.set('model', model);
    // return Ember.RSVP.promise(function(resolve) {

    // })
    // if (!model.get('spotHeroSpots') || !model.get('parkWhizSpots')) {
    //   let lat = model.get('lat');
    //   let lng = model.get('lng');
    //   return Ember.$.getJSON('http://crossorigin.me/http://spothero.com/api/v1/facilities/rates/?latitude='+lat+'&longitude='+lng+'&sort=distance&distance__gt=10&distance__lt=12000')
    //     .then(function(resp) {
    //       debugger;
    //     })
    // }
  // }
});
