//Para usar las dependencias
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path')
//Para configurar el acceso a las variables de entorno.
require('dotenv').config();

//Configuraciones iniciales
//1ro-Para iniciar nuestro servidor, hay que instanciarlo a express. Por convención se lo guarda en app.
const app=express();

//Configurar el puerto donde se va a ejecutar nuestro servidor-backend.Para eso debemos usar la instancia de express, seguida del método set y de los parámetros. el 1ro- El nombre. 2do-El puerto que quiero ocupar(Debo indicar el puerto que definí en la variable de entorno. Si no esta definido o esta ocupado para otra cosa, debemos seteár un puerto opcional).Siempre tiene que haber un puerto que escuche las solicitudes.
app.set('port',process.env.PORT || 9001);

//Ahora hay que configurar o habilitar para que el puerto 9001 pueda escuchar las solicitudes. Para eso hay que instanciarlo a express, seguido del método listen y pasar los argumentos:
//1ro. app.get("puerto").
//2do. una callback. Se configura un mensaje para ver si esta funcionando. probar en la terminar(npm run dev: Si se ve el mensaje, indica que nuestro servidor esta funcionando)
app.listen(app.get('port'),()=>{console.log(`BACKEND PRODUCTS LISTENING IN PORT ${app.get('port')}`);});

//MIDDELWARE: Configuraciones extras del backend que se ejecutan antes de las rutas.
//1-middelware nativos de express. Para usarlo:
app.use(express.json());//Permite recibir objetos en formato json.
app.use(express.urlencoded({extended:true}))//Permite recibir objetos de todo tipo en las peticiones. Si no le configuramos extended, el servidor va a recibir 2 tipos de datos, los string y arrays.

//2-middelware de terceros. (MORGAN Y CORS)
app.use(morgan('dev'));//Nos proporciona detalles de las peticiones en la terminal.
app.use(cors());//Nos permite las peticiones remotas.

//Para cargar los archivos estáticos: index.html. No olvidar definir como requerimiento path en la parte superior.
// console.log(__dirname,'DIRNAME');
app.use(express.static(path.join(__dirname,'../public')));

//CREAMOS UNA RUTA DE PRUEBA
//TIPOS DE PETICIONES:
//GET: Pedir, sacar o leer un recurso del backend.
//POST: Agregar, crear o guardar un recurso en el backend.
//PUT: Editar o actualizar un recurso en el backend.
//DELETE: Borrar o eliminar un recurso en del backend.
//Argumento que recibe la petición asincrónica, con el siguiente orden:
//req o request: Contiene la información de la petición del cliente al servidor.
//res o response: Contiene la información de la respuesta del servidor al cliente.
//next o nexFunction: Indica que continue con la siguiente función o middelware
app.get('/test', async(req, res, next)=>{
    try {
        console.log('REQUEST-->', req);
        return res.status(200).json({
            success:true, 
            message: 'API IS ALIVE'
        })
    } catch (error) {
       console.log(error); 
       next(error);
    }
})