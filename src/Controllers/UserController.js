//Se importa el modelo de usuario (UserModel) desde un fichero llamado UserModel ubicado en un directorio superior (../Models/UserModel). Nota: UserModel es un módulo commonJS.
const UserModel= require ('../Models/UserModel');

//la siguiente instrucción se encarga de importar el módulo bcrypt en el script actual. Una vez importado, se puede utilizar para realizar operaciones de encriptación y hash de contraseñas de forma segura.
const bcrypt = require ('bcrypt');
//para acceder a las funciones creadas en el archivo HelpersFunction.js. creo el nombre del módulo con el nombre de helpers.
const helpers = require ("../Utils/HelpersFunction")

//ESTAS INSTRUCCIONES REGISTRAN UN USUARIO EN LA BASE DATO. LOS DATOS DEL USUARIO SON VALIDADOS ANTES DE REGISTRARLO. LUEGO SE CREA EL SCRIPT PARA ELIMINAR DICHO USUARIO.

//Se crea la clase UserController (controlador de usuario) que contiene el método CreateNewAdmin para crear un nuevo administrador en la base de datos utilizando el modelo de usuario definido en UserModel. CreateNewAdmin recibe 2 parámetros: email y password. Se crea el bloque try-catch.
//PARA VALIDAR Y EL EMAIL Y CONTRASEÑA:
//Si el email ingresado no cumple con el formato válido, se lanza un error con el mensaje "Formato de email invalido". (SALE DEL BLOQUE TRY. ENTRA AL CATCH)
//Si la contraseña no cumple con el formato válido, se lanza un error con el mensaje "Formato de password inválido". (SALE DEL BLOQUE TRY. ENTRA AL CATCH).
//Dentro del método CreateNewAdmin, se crea una nueva instancia de UserModel con los datos proporcionados (email y password). Se utilizan las propiedades abreviadas de ES6 para asignar los valores a las propiedades del objeto. La propiedad rol se lo va a harcodear (escribir a mano).
//Para encriptar (hashear) el password que estamos recibiendo.
//1ro- Debo traer la variable de entorno creada en .env. Para usarla la guardo dentro de una variable (SALT).
//2do-Debo encriptar el password, para eso debo usar la función (método) de hash. La función se la guarda en el la variable hash. A la función hash se le pasa 2 parámetros. 1-El string que queremos encriptar y 2-la cantidad de saltos(la declaré en el archivo .env como variable de entorno). Nota: cambiar el valor de password a hash, es decir que se va a guardar la contraseña encriptada.
//Se intenta guardar el nuevo usuario en la base de datos utilizando el método save() proporcionado por Mongoose. Se utiliza await para esperar a que la operación de guardado se complete de forma asíncrona.
//Si el usuario se guarda correctamente, se devuelve el usuario guardado. En caso de que ocurra un error durante el proceso de guardado, se captura la excepción en el bloque catch y se lanza nuevamente a una capa superior.
//Finalmente, se exporta la clase UserController para que pueda ser utilizada en otras partes de la aplicación.

//Nota: Si bien en el frontend nosotros validamos los datos que se envían a la base de dato. En el backend se lo debe validar. voy a crear un archivo (HelpersFunction.js) que ejecute la función de validación. 
class UserController {

    async CreateNewAdmin (email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error ("Formato de email invalido")
            }
            if (!helpers.ValidatePassword(password)) throw new Error ("Formato de password incorrecto");

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash= await bcrypt.hash(password, SALT)
            const newUser = new UserModel ({
                email: email,
                password: hash,
                role: "Admin"
            });

            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser (email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error ("Formato de email invalido")
            }
            if (!helpers.ValidatePassword(password)) throw new Error ("Formato de password incorrecto");

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash= await bcrypt.hash(password, SALT)
            const newUser = new UserModel ({
                email: email,
                password: hash,
                role: "User"
            });

            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }
    //creamos un método para que me busque un usuario por el id y lo elimine.
    async DeleteUserById(id){
        try{
            const deleteUser = await UserModel.findByIdAndDelete(id)
            return deleteUser;
        }catch(error){
            throw error
        }
    }
}
module.exports = UserController;