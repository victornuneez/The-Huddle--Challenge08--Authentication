
import dbLocal from "db-local";

// Intanciamos un objeto de la clase dblocal (creamos un objeto base de datos). con path le indicamos donde en que carpeta guardar la base de datos.
const db = new dbLocal({ path: './db' });

const user = db.Schema('user', {
    username: {type : String, required: true },
    email: {type : String, required : true},
    password: {type : String, required : true},
    role: {type : String, required : true},
});

// Funcion para guardar datos del usuario en la base de datos.
const saveUser = (userData) => {
    const newUSer = user.create(userData);
    return newUSer.save()
}

// Funcion para buscar un usuario por su nombre de usuario (username)
const findByUsername = (username) => {
    return user.findOne({ username : username });
};

// Funcion para buscar un usuario por su email
const findByEmail = (email) => {
    return user.findOne({ email : email });
};

// Exportamos la tabla para que el controlador pueda usarlo.
export default user
export { findByUsername, findByEmail, saveUser }
