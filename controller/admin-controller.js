import user from '../models/userRepository.js'

const getAllUsers = (req, res) => {
    try {
        // Buscamos a todos los usuarios de la base de datos(array con objetos = todos los datos de los usuarios).
        const users = user.find();
        
        // Recorremos cada usuario con .map, creamos un nuevo objeto sin info sensible(cada u creamos un nuevo objeto con los campos nuevos). 
        const safeUsers = users.map( u => ({ id: u._id, username: u.username, role: u.role}));
        
        res.json({
            message: 'Listado de usuarios (vista admin)',
            data: safeUsers // lista de usuarios filtrada
        });

    } catch(error) {
        res.status(500).json({ message: 'Error al obtener usuarios '});
    }
};



const deleteUser = (req, res) => {
    try {
        //  Extraemos el ID que viene en la URL
        const { id } = req.params;

        // Verificamos si el usuario realmente existe en la base de datos
        // Usamos "_id" porque así lo guarda db-local por defecto
        const userExists = user.findOne({ _id: id });
        
        if (!userExists) {
            return res.status(404).json({ message: 'Usuario no encontrado. No se pudo eliminar.' });
        }

        // Ejecutamos la eliminación usando el método remove() de db-local
        user.remove({ _id: id });

        // Respondemos con éxito
        return res.status(200).json({ 
            message: `Usuario '${userExists.username}' (ID: ${id}) eliminado correctamente` 
        });

        // Capturamos cualquier error inesperado para que el servidor no se caiga
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error interno al intentar eliminar el usuario' });
    }
};

export { getAllUsers, deleteUser }