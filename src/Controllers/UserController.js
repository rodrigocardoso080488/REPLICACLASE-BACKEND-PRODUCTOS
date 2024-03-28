//Se importa el modelo de usuario (UserModel) desde un fichero llamado UserModel ubicado en un directorio superior (../Models/UserModel). Nota: UserModel es un módulo commonJS.
const UserModel= require ('../Models/UserModel');

//la siguiente instrucción se encarga de importar el módulo bcrypt en el script actual. Una vez importado, se puede utilizar para realizar operaciones de encriptación y hash de contraseñas de forma segura.
const bcrypt = require ('bcrypt');
//para acceder a las funciones creadas en el archivo HelpersFunction.js. creo el nombre del módulo con el nombre de helpers.
const helpers = require ("../Utils/HelpersFunction");


const jwt=require("jsonwebtoken");

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
    //Login: Esta función asincrónica maneja la lógica de inicio de sesión de un usuario. 
    //Primero verifica si se han proporcionado un correo electrónico y una contraseña en el cuerpo de la solicitud.
    //Luego busca un usuario (con el método findOne) en mi colección en mi base de dato (modelo: userModel) basándose en el correo electrónico proporcionado.
    //Si no se encuentra ningún usuario(DOCUMENTO), devuelve un mensaje de error.
    //Luego compara la contraseña (con el método compare) proporcionada con la contraseña almacenada en la base de datos utilizando bcrypt.compare.
    //Si las contraseña enviada no coincide con el hash de contraseña almacenada en mi base de dato, devuelve un mensaje de error.
    //Si la comparación es exitosa, genera un token JWT que contiene el ID del usuario y su rol, y lo firma con una clave secreta.
    //Finalmente, devuelve un objeto JSON que contiene el correo electrónico del usuario, su rol y el token JWT generado.
    //Ambas funciones manejan errores lanzando excepciones en caso de que ocurra algún problema durante la ejecución.
    //nota: Una colección es un conjunto de documentos que se almacenan juntos en una base de datos no relacional, como MongoDB. (colección: contenedor que agrupa documentos que comparten una temática o propósito común.)
    async Login (req, res) {
        try {
            const body = req.body;
            if (body.email==="" || body.email===undefined) {
                throw new Error("Debe enviar un email");
            }
            if (body.password==="" || body.password===undefined) {
                throw new Error("Debe enviar un password")
            }
            const user = await UserModel.findOne({email: body.email});

            if(user===null){
                return res.status(404).json({message:"email y/o password incorrecto"});
            }
            const compare = await bcrypt.compare(body.password, user.password);

            if (!compare) {
                return res.status(404).json({message:"Email y/o password incorrecto"})
            }
            const token=jwt.sign({
                _id:user._id, 
                role:user.User
            }, process.env.SECRET_KEY, {expiresIn: '1D'});

            return res.status(200).json({
                email: user.email, 
                role: user.role, 
                token: token
            });
        } catch (error) {
            throw error
        }
    }
};
module.exports = UserController;