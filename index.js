import express from 'express'
import csurf from 'csurf';
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from './config/db.js'

////////////////////////////////////////////////
// crear la app
const app = express()

const port = process.env.PORT || 3000;

// Configurar csurf
app.use(csurf({ cookie: true }));

// conexion a la base de datos
try {
    await db.authenticate();
    db.sync() //crea la table si no existe
    console.log('Conexion Correcta A La Base De Datos')
} catch (error){
    console.log(error)
}

// habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}))

// habilitar pub
app.set('view engine', 'pug')
app.set('views', './views')

// carpeta publica
app.use( express.static('public'))

// routing
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)

// Habilitar cookie parser
app.use( cookieParser())

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});

// Rutas de ejemplo
app.get('/', function(req, res){
    res.send('Hola mundo express')
});

app.get('/', function(req, res){
    res.json({msg: 'Hola mundo express en formato JSON'})
});

app.get('/', function(req, res){
    res.send('Informacion de nosotros')
});

