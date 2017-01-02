var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
    
    app.route('/v1/fotos')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/v1/fotos/:fotoId')
        .delete(api.remove)
        .get(api.busca)
        .put(api.atualiza);

    app.get('/v1/grupos', api.listaGrupos)
    app.get('/v1/fotos/grupo/:grupoId', api.listaPorGrupo);
        

    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};