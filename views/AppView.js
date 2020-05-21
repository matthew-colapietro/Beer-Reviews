var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer',
    'click .view-beer': 'viewBeer',
    'click .back': 'goBack'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.detailView = null;

    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);
    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);
    this.listenTo(this.model, 'change:show_reviews', this.renderPage);

    this.renderBeers();
  },

  goBack: function(){
    this.model.showBeers();
  },

  viewBeer: function(e) {
    var clickedBeerId = $(e.currentTarget).data().id;

    this.model.showReviews(clickedBeerId);
  },

  renderPage: function () {
    this.$('.reviews-container').toggleClass('show', this.model.get('show_reviews'));
    this.$('.beers-container').toggleClass('show', !this.model.get('show_reviews'));
  },

  createBeer: function () {
    this.model.get('beers').add({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    });
  },

  renderDetailView: function() {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({
      model: this.model.get('current_beer') || new BeerModel()
    });

    this.$('.reviews-container').append(this.detailView.render().el);
  },

  renderBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function () {
    this.model.get('beers').each(function (m) {
      this.renderBeer(m);
    }, this);
  }
});
