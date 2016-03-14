import Ember from 'ember';

export default Ember.Component.extend({

  mapSideWidth: null,
  mapSideHeight: null,
  halfScreenWidth: null,
  halfScreenHeight: null,
  currentlyLoading: true,
  url: null,
  cityName: null,
  code: null,
  zoom:6,
  // colors: ['#99C6F2', '#FF9999'],
  colors: ['rgba(1,112,223,.4)', 'rgba(255,0,0,.4)'],

  isToday: Ember.computed.equal('date.id', 'today'),
  isYesterday: Ember.computed.equal('date.id', 'yesterday'),

  eastCoastDate: Ember.computed('date',
    function() {
      if (this.get('isToday')) {
        return moment.utc().utcOffset(-5).format('ddd MMM Do');
      }
      return moment.utc().utcOffset(-5).subtract(1, 'days').format('ddd MMM Do');
    }
  ),

  cfData: Ember.computed('date', function() {
    let data = this.get('date.spots');

    // data.forEach((d) => {
    //   let localTime = d.timestamp.split(":",2).join(":");
    //   d.hour = d.hour ? +d.hour : moment(localTime).hour();
    // })

    // console.log(data[0]);
    return crossfilter(data);
  }),

  allGroup: Ember.computed('cfData', function() {
    return this.get('cfData').groupAll();
  }),

  heatmapMarkers: Ember.computed('cfData', function() {
    // debugger;
    return this.get('priceDim').top(Infinity).map((d) => {return [d.lat, d.lng];});
  }),

  avgZipPriceGroup: Ember.computed('cfData', function() {
    let zipDim = this.get('zipDim').group()
    return reductio().avg(function(d) {return d.price;})(zipDim);
  }),

  companyDim:Ember.computed('cfData', function() {
    return this.get('cfData').dimension(function(d) {return d.company;});
  }),

  mobileDim:Ember.computed('cfData', function() {
    return this.get('cfData').dimension(function(d) {return d.canMobile;});
  }),

  mobileGroupCount:Ember.computed('cfData', function() {
    let mobileDim = this.get('cfData').dimension(function(d) {return d.canMobile;});
    let resp = {}
    // resp['spotHero'] = reductio().filter(function(d) {return d.company === "spotHero";}).count(true)(mobileDim.group());
    // resp['parkWhiz'] = reductio().filter(function(d) {return d.company === "parkWhiz";}).count(true)(mobileDim.group());
    // return resp;
    let groups = this.get('createCountGroups')(mobileDim);
    return {'groups': groups, 'dim': mobileDim};
  }),

  hourDim:Ember.computed('cfData', function() {
    return this.get('cfData').dimension(function(d) {return +d.hour;});
  }),

  hourGroupCount:Ember.computed('cfData', function() {
    let hourDim = this.get('hourDim');
    let resp = {}
    // resp['spotHero'] = reductio().filter(function(d) {return d.company === "spotHero";}).count(true)(hourDim.group());
    // resp['parkWhiz'] = reductio().filter(function(d) {return d.company === "parkWhiz";}).count(true)(hourDim.group());
    return this.get('createCountGroups')(hourDim);
    return resp;
  }),

  hourGroupMedianPrice: Ember.computed('cfData', function() {
    // let cityDim = this.get('cityDim');
    let hourDim = this.get('cfData').dimension(function(d) {return +d.hour;});
    let groups = this.get('createCountGroups')(hourDim, true);
    return {'groups': groups, 'dim': hourDim};
  }),

  priceDim: Ember.computed('cfData', function() {
    // return this.get('cfData').dimension(function(d) {return Math.round(d.price);});
    return this.get('cfData').dimension(function(d) {return d.price <= 60 ? Math.round(d.price) : null;});
  }),

  ratingDim: Ember.computed('cfData', function() {
    return this.get('cfData').dimension(function(d) {return d.rating <= 100 ? Math.round(d.rating) : null;});
  }),

  ratingGroupCount: Ember.computed('cfData', function() {
    let cityDim = this.get('ratingDim');
    return this.get('createCountGroups')(cityDim);
  }),

  cityDim: Ember.computed('cfData', function() {
    return this.get('cfData').dimension(function(d) {return d.city;});
  }),

  cityGroupCount: Ember.computed('cfData', function() {
    let cityDim = this.get('cityDim');
    return this.get('createCountGroups')(cityDim);
  }),

  cityGroupMedianPrice: Ember.computed('cfData', function() {
    // let cityDim = this.get('cityDim');
    let cityDim = this.get('cfData').dimension(function(d) {return d.city;});
    let groups = this.get('createCountGroups')(cityDim, true);
    return {'groups': groups, 'dim': cityDim};
  }),

  priceGroupCount: Ember.computed('cfData', function() {
    let priceDim = this.get('priceDim');
    let filter = this.get('removeEmptyBins')
    let group = this.get('createCountGroups')(priceDim);
    group.spotHero = filter(group.spotHero)
    group.parkWhiz = filter(group.parkWhiz)
    return group;
  }),

  removeEmptyBins: function(group) {
    return {
        all:function () {
            return group.all().filter(function(d) {
                return !!d.key;
            });
        }
    };
  },

  // filterCityGroup: function(group, city) {
  //   return {
  //       all:function () {
  //           return group.all().filter(function(d, v) {
  //               return !!d.key;
  //           });
  //       }
  //   };
  // },

  createCountGroups: function(dim, median) {
    let resp = {};
    if (median) {
      resp['spotHero'] = reductio().filter(function(d) {return d.company === "spotHero"})
      .min(function(d) { return Math.round(d.price); })
      .max(true)
      .median(true)(dim.group());
      resp['parkWhiz'] = reductio().filter(function(d) {return d.company === "parkWhiz"})
      .min(function(d) { return Math.round(d.price); })
      .max(true)
      .median(true)(dim.group());
    }
    else {
      resp['spotHero'] = reductio().filter(function(d) {return d.company === "spotHero";}).count(true)(dim.group());
      resp['parkWhiz'] = reductio().filter(function(d) {return d.company === "parkWhiz";}).count(true)(dim.group());
    }
    return resp;
  },

  renderAll: Ember.on('didRender', function() {
      dc.renderAll();
  }),

  actions: {
    resetCharts: function() {
      dc.filterAll();
      dc.redrawAll();
      let d3Click = new MouseEvent("click");
      $("rect.selected").each(function(i, e) {
        e.dispatchEvent(d3Click)
        // $(e).attr("display") ? e.dispatchEvent(d3Click) : null;
      })
      ga('send', 'event', 'charts', 'reset');
    },

    sendEvent: function(date){
      ga('send', 'event', 'newDay', date);
    }

  }
});
