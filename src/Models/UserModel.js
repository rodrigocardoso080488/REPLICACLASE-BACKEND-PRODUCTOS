const mongoose = require ('mongoose');
const {Schema} = mongoose;

//Se define un esquema de Mongoose para el modelo de usuario que se va almacenar, además se agregan las restricciones necesarias para los campos email, password y role. UserSchema es una instancia de Schema de mongoose.
//Estas restricciones garantizan que los datos almacenados en la base de datos cumplan con ciertas reglas y validaciones, como la obligatoriedad de ciertos campos, la unicidad del correo electrónico y el formato de la contraseña.
//1ro-Se define un esquema de usuario: Dentro del esquema se creará un registro básico de usuario, es decir las propiedades (campos) donde ira guardando la info. Para eso debo crear el objeto UserSchema a partir de la clase de mongoose Schema. Las propiedades que se le pasará van a ser los campos: email, password y role con las restricciones.
//NOTA: Cuando las validaciones hagan efecto. Cuando envíe la solicitud, se producirá un error de servidor con un mensaje: 500 internal server error.

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    role: {
        type: String,
        required: [true, 'El rol es requerido']
    }
})
//Para usar nuestra definición de esquema, necesitamos convertirlo UserSchema en un modelo con el que podamos trabajar.
//2do-Se crea un MODELO DE USUARIO(userModel), utilizando el método integrado de Mongoose llamado model, el cual crea un modelo de datos a partir de un esquema definido. Al método se le pasa 2 parámetros:
//1ro- Para quien va destinado ese modelo de datos? Se pasa el nombre de la colección.
//2do- Cuál es el esquema creado para el modelo de usuario? el objeto que acabamos de crear.

const UserModel=mongoose.model('user', UserSchema);
//3ro-Finalmente, se exporta el modelo de usuario (UserModel) para poder ser utilizado en otras partes de la aplicación. x ej. se lo va a utilizar en UserModel.js
module.exports=UserModel;
