//Se importa el controlador de usuarios (UserController) desde un archivo llamado UserController ubicado en un directorio superior (../Controllers/UserController).
const UserController=require("../Controllers/UserController");

//En este código se está definiendo un módulo de rutas para la gestión de usuarios en una aplicación Node.js. Aquí está la explicación del código:
//Se define una función UserRoutes que toma dos parámetros: base (ruta base de las rutas de usuario) y app (instancia de la aplicación Express).
//Dentro de la función UserRoutes, se crea una instancia del controlador de usuarios utilizando new UserController().
//Se define una ruta POST para la creación de un nuevo usuario en la aplicación. La ruta se construye concatenando la ruta base (base) con /create.
//La ruta POST maneja las solicitudes entrantes y ejecuta una función asíncrona que recibe los objetos req (solicitud) y res (respuesta). Dentro de esta función:
//Se desestructuran los campos email, password y role del cuerpo de la solicitud (req.body).
//Se llama al método CreateNewUser del controlador de usuarios con los datos desestructurados.
//Se espera a que se cree el nuevo usuario y se almacene en la base de datos.
//Si la operación se realiza con éxito, se devuelve una respuesta con código de estado 201 (creado) y el objeto del usuario creado en formato JSON.
//En caso de error, se captura la excepción, se registra un mensaje de error en la consola y se pasa el error al siguiente middleware de manejo de errores (next(error)).
//Finalmente, se exporta la función UserRoutes para que pueda ser utilizada en otros archivos de la aplicación.

const UserRoutes=(base, app)=>{
    const controller = new UserController();

    app.post(`${base}/create`, async(req, res, next)=>{
        try {
            const {email, password, role}=req.body;
            await controller.CreateNewUser(email, password, role);
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