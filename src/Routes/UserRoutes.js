//Se importa el controlador de usuarios (UserController) desde un archivo llamado UserController ubicado en un directorio superior (../Controllers/UserController).
const UserController=require("../Controllers/UserController");

//En este código se está definiendo los endpoints para la CREACIÓN, OBTENCIÓN, EDICIÓN O ELIMINACIÓN de usuarios comunes y administradores.

//Aquí está la explicación del código:
//Se define una función UserRoutes que toma dos parámetros: 
//1ro- base (ruta base de las rutas de usuario).
//2do- app (instancia de la aplicación Express).
//Dentro de la función UserRoutes, se crea una instancia del controlador de usuarios utilizando new UserController().

//Se define una ruta POST para la CREACIÓN USUARIOS ADMINISTRADORES en la aplicación. La ruta se construye concatenando la ruta base (base) con /create.
//La ruta POST maneja las solicitudes entrantes y ejecuta una función asíncrona que recibe los objetos required (solicitud) y response (respuesta). Dentro de esta función:
//Se desestructuran(se extraen) los campos email y password del cuerpo de la solicitud (req.body).
//Se crea una instancia de UserController, ahora llamada controller. Esta función espera a que se cree un email y password de un administrador y realiza las validaciones antes de guardarlo en la base de dato. Se llama al método CreateNewAdmin del objeto creado, el cual recibe los parámetros email y password del administrador registrado.
//Si la operación se realiza con éxito, se devuelve una respuesta con código de estado 201 (creado exitosamente) y el objeto del usuario creado en formato JSON con un mensaje en consola que indica que el usuario se creó exitosamente.
//En caso de error, se captura la excepción en el bloque catch, se registra un mensaje de error en la consola y se devuelve una respuesta con código de estado 500 () y el objeto del usuario creado en formato JSON con un mensaje en consola que indica  Error al crear un nuevo usuario. 
//Se define una ruta DELETE para la eliminación de 1 USUARIO en la aplicación.
//Finalmente, se exporta la función UserRoutes para que pueda ser utilizada en otros archivos de la aplicación.

const UserRoutes=(base, app)=>{
    const controller = new UserController();

    app.post(`${base}/create-admin`, async(req, res, next)=>{
        try {
            const {email, password}=req.body;
            await controller.CreateNewAdmin(email, password);
            return res.status(201).json({message: "Se creó el usuario exitosamente"});
        } catch (error) {
            console.log("Error al crear un nuevo usuario -->", error);
            return res.status(500).json({message: "Ocurrió un error al intentar crear el usuario"});
        }
    });
    //Por convención la ruta para todos los usuarios es solamente la base (/users). La declaramos en index.js
    app.post(`${base}`, async(req, res, next)=>{
        try {
            const {email, password}=req.body;
            await controller.CreateNewUser(email, password);
            return res.status(201).json({message: "Se creó el usuario exitosamente"});
        } catch (error) {
            console.log("Error al crear un nuevo usuario -->", error);
            return res.status(500).json({message: "Ocurrió un error al intentar crear el usuario"});
        }
    });

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try{
            const id=req.params.id;
            const response=await controller.DeleteUserById(id);
            console.log("USUARIO ELIMINADO-->", JSON.stringify(response));
            return res.status(200).json({message:"Se eliminó el usuario exitosamente"})
        }catch(error){
            console.error("Mensaje por la terminal: Error al eliminar el usuario -->", error);
            return res.status(500).json({message:"Ocurrió un error al intentar eliminar el usuario"});
        }
    });
};

module.exports=UserRoutes;
//Para poder acceder a las rutas de usuario, tengo que ir al index, js y traer esta ruta que acabo de crear.