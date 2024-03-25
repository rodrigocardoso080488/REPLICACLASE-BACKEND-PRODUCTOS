//Se importa el modelo de usuario (UserModel) desde un archivo llamado UserModel ubicado en un directorio superior (../Models/UserModel).
const UserModel=require('../Models/UserModel')

//En este código, se está creando una clase UserController (controlador de usuario)que contiene un método CreateNewUser para crear un nuevo usuario en la base de datos utilizando el modelo de usuario definido en UserModel.
//Explicación del código:
//Se define la clase UserController que contiene un método(Función) CreateNewUser que recibe tres parámetros: email, password y role.
//Dentro del método CreateNewUser, se crea una nueva instancia de UserModel con los datos proporcionados (email, password y role). Se utilizan las propiedades abreviadas de ES6 para asignar los valores a las propiedades del objeto.
//Se intenta guardar el nuevo usuario en la base de datos utilizando el método save() proporcionado por Mongoose. Se utiliza await para esperar a que la operación de guardado se complete de forma asíncrona.
//Si el usuario se guarda correctamente, se devuelve el usuario guardado. En caso de que ocurra un error durante el proceso de guardado, se captura la excepción en el bloque catch y se lanza nuevamente.
//Finalmente, se exporta la clase UserController para que pueda ser utilizada en otras partes de la aplicación.

class UserController {

    async CreateNewUser (email, password, role){
        try {
            const newUser = new UserModel ({
                email: email,
                password: password,
                role: role
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