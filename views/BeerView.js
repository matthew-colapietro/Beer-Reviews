var BeerView = Backbone.View.extend({

  className: 'beer',

  events: {
    'dblclick .edit': 'editBeer',
    'click .remove': 'delete',
    'keypress .edit-mode': 'updateText'
  },

  editBeer: function () {
    this.$('input').toggle();
  },

  updateText: function(e) {
			if (e.which === 13) {
				this.model.set('name', this.$('input').val())
			}
  },

  delete: function () {
    this.model.destroy();
    console.log('destroyed')
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove)
    this.listenTo(this.model, 'change', this.render);
  },

  template: Handlebars.compile($('#beer-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

})
