/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter'
    }
});

require([
    'marionette',
    'controllers/confiturecontroller',
    'templates'
], function (Marionette, ConfitureController) {

    var confitureInitializer = function () {

        var JST = window.JST = window.JST || {};

        Marionette.Renderer.render = function (template, data) {
          template = "templates/" + template + ".html";
          if (!JST["app/" + template]) {
            $.ajax({ url: "/" + template, async: false }).then(function (contents) {
              JST["app/" + template] = _.template(contents);
            });
          }
          // if (!JST[template]) throw "Template '" + template + "' not found!";
          return JST["app/" + template](data);
        };

    };

    var ConfitureRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'playlist/:type' : 'playlist',
            '' : 'playlist'
        }
    });

    var confiture = new Marionette.Application({
        root: '/'
    });

    confiture.addRegions({
        firstPanel: '.page-first-panel',
        secondPanel: '.page-second-panel'
    });

    confiture.addInitializer(confitureInitializer);
    confiture.addInitializer(function () {
        this.router = new ConfitureRouter({
            controller: new ConfitureController({
                regions: {
                    firstPanel: confiture.firstPanel,
                    secondPanel: confiture.secondPanel
                }
            })
        });

        Backbone.history.start();
    });

    //@@stop here in test builds

    confiture.start();

    return confiture;
});
