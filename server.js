var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

//consolidate y swig permiten utlizar vistas html
var cons = require('consolidate');

app.engine('html', cons.swig)
app.set('view engine', 'html');

//configuración de logs en consola
app.use(logger('dev'));
//configuración del analizador de peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//path de archivos estáticos (estilos, imágenes y funciones)
app.use(express.static(path.join(__dirname, 'views')));
//se indica que las vistas se encuentran en al carpeta views
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req, res){
	//carga la vista index.html
	res.render('index');
});

//inicio del servidor
var listener = app.listen(process.env.PORT, function () {
  console.log('La aplicación se está ejecutando en el puerto ' + listener.address().port);
});
