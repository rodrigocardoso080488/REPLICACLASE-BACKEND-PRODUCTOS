//IMPORTAR MONGOOSE EN NUESTRO PROYECTO.
const mongoose = require('mongoose');

//CREAR LA CONEXIÓN A NUESTRA BASE DE DATO:
//1ro-Obtener la cadena de conexión(URI) a la base de datos desde una variable de entorno llamada DDBB y se guarda en la variable connectionString. Para acceder a la variable de entorno utilizamos el método process.
//2do-Conectamos a MongoDB con el método .connect (mongoose.connect()) y como connect es una función se le pasa como argumento la cadena de conexión, es decir la URI. Esta guardada en connectionString. El paso 1 y 2 se lo puede hacer en un solo paso.
//3ro-Se crea una constante (connection) que hace referencia a la conexión a la base de datos MongoDB establecida por Mongoose.
//4to-Se utiliza el método once del objeto connection para escuchar el evento 'open', que se activa cuando la conexión a la base de datos se establece con éxito. Dentro de la función de callback, se imprime en la consola el mensaje "DDBB CONNECT SUCCESSFUL".. es similar a x ej: cambiarColorBtn.addEventListener('click', función que cambia el Color);
const databaseConnection=()=>{
    const connectionString=process.env.DDBB;

    mongoose.connect(connectionString);
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log("DDBB CONNECT SUCCESSFUL");
    })
}
//Para poder exportar en el index la función databaseConnection que se encarga de conectar la base de dato, debemos ejecutar el siguiente código:
module.exports=databaseConnection;