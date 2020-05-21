var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      beers: new BeersCollection(),

      current_beer: null,

      // either true or false
      show_reviews: false
    }
  },

  showReviews: function (id) {
    // make sure our id is a number
    id = parseInt(id);

    var allBeers = this.get('beers');

    var currentBeer = allBeers.findWhere({ id: id });

    this.set('current_beer', currentBeer);
    this.set('show_reviews', true);
  },

  showBeers: function() {
    //this.set('current_beer', null);
    this.set('show_reviews', false);
  },
});
