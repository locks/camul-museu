var NavigationSelect = function (app) {
  this.helpers({
    navGo: function (element) {
      var active = this.params.route
      
      $('ul.nav > li').removeClass('active')
      $('ul.nav > li#' + active).addClass('active')
      
      console.log( "el", element)
      console.log( "this", active )
      
      this.log( $('ul.nav > li#' + active) )
      this.log( $('ul.nav > li#' + element) )
    }
  })
};

var app = Sammy("body", function () {
  this.locale = "pt-PT";

  this.use('Mustache')
  this.use('JSON')
  this.use('Storage')
  this.use(NavigationSelect)
  
  var museu = this.store('museu')
  museu.set('locale','pt-PT')
  
  this.before('#/catalogo', function () {
    this.log("wham")
  })
  
  this.after('#/catalogo', function () {
    this.log("bam")
  })
  
  this.get('/', function () {
    var ctx = this;

    $.get('tmpl/main.mustache', function (response) {
      ctx.partials = { main: response };
      ctx.quote    = "O melhor museu do ISEP inteiro";

      ctx.load('data/' + museu.get('locale') + '.json', function (data) {
        ctx.saudacao = data.saudacao;
        ctx.noticias = data.noticias;
        ctx.pecas = data.pecas;
        ctx.info = data.info;
        ctx.menu = data.menu;

        ctx.partial('tmpl/layout.mustache')
      })
    })
    
  })

  this.get('/layout', function () {
    this.data = "Layout"

    this.partial('tmpl/filler.mustache')
  })


  
  this.get(':route', function () {
    var section = this.params.route
    
    this.data = section

    /// blablabla

    var ctx = this;
    
    $.get('tmpl/' + section + '.mustache', function (response) {
      ctx.partials = { main: response };
      ctx.quote    = "O melhor museu do ISEP inteiro";

      ctx.load('data/' + museu.get('locale') + '.json', function (data) {
        ctx.saudacao = data.saudacao;
        ctx.noticias = data.noticias;
        ctx.pecas = data.pecas;
        ctx.info = data.info;
        ctx.menu = data.menu;

        ctx.partial('tmpl/layout.mustache')
        ctx.navGo( section );
      })
    })

  })

})


$(function () {
  app.run()
})
