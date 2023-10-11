import bcrypt from 'bcrypt';

//helper function
//hashSync hashea la password, recibe por parametro un valor que mientras mas grande mas seguro (y mas lento) vuelve el proceso.
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//helper function
//compareSync compara las passwords y devuelve un valor booleano
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
