const pool = require('../../database/db');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

//VerficarUsuario con el correo que devuelve google y otorgar token

const iniciarUserGoogle = async (req, res, next) => {
    try {

        //console.log(req.body);
        const { p_email } = req.body;

        //console.log('Correo electrónico:', email);

        const users = await pool.query('select * from verification_google($1)', [p_email]);
        //console.log(users);
        //console.log(users.rows[0]);
        let verification = users.rows[0];

        //Extraer el resultado del bool para saber si el login es correcto
        let result = verification.verification;
        //console.log('The result is:' + result);

        //Si el Login fallo es decir es diferente del estado 1
        if (result != 1) return res.status(401).json({ error: verification.mensaje });


        //Si no entonces se le otorga un token xd

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            p_email: p_email,
        }, 'SECRET') //el secret deberia estan en el .env

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 2, //dos minutos para hacer las pruebas
            path: '/'
        })
        //maxAge: 1000 * 60 * 60 * 24 * 30, //30 dias
        //1000 * 60 * 15,  // 15 minutos
        res.setHeader('Set-Cookie', serialized)
        console.log(serialized);
        console.log(token);

        //Para cargar datos del usuario

        //Guardar el id del usuario en el json
        //Ver si el usuario es admin general y guardar en json para que se guarde como cookie
        const data_auth = await pool.query('select  * from fu_auth_data($1)', [p_email]);
        console.log(data_auth.rows[0]);
        //parsear los data_auth para enviar en un solo json
        let data = data_auth.rows[0];
        let userc = data.userc;
        //let isadmin = data.verification;

        //Ver si el usuario es admin de area y guardar en json para que se guarde como cookie
        return res.json({ verification: "true", token: token, id: userc });

    } catch (error) {
        next(error);
    }
}

const iniciarUser = async (req, res, next) => {
    try {

        //console.log(req.body);
        const { p_email, p_contra } = req.body;

        console.log('Correo electrónico:', p_email);
        console.log('Correo :', p_contra);

        const users = await pool.query('select * from verification_auth($1,$2)', [p_email,p_contra]);
        //console.log(users);
        //console.log(users.rows[0]);
        let verification = users.rows[0];

        //Extraer el resultado del bool para saber si el login es correcto
        let result = verification.verification;
        //console.log('The result is:' + result);

        //Si el Login fallo es decir es diferente del estado 1
        if (result != 1) return res.status(401).json({ error: verification.mensaje });


        //Si no entonces se le otorga un token xd

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            p_email: p_email,
        }, 'SECRET') //el secret deberia estan en el .env

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 2, //dos minutos para hacer las pruebas
            path: '/'
        })
        //maxAge: 1000 * 60 * 60 * 24 * 30, //30 dias
        //1000 * 60 * 15,  // 15 minutos
        res.setHeader('Set-Cookie', serialized)
        console.log(serialized);
        console.log(token);

        //Para cargar datos del usuario

        //Guardar el id del usuario en el json
        //Ver si el usuario es admin general y guardar en json para que se guarde como cookie
        const data_auth = await pool.query('select  * from fu_auth_data($1)', [p_email]);
        console.log(data_auth.rows[0]);
        //parsear los data_auth para enviar en un solo json
        let data = data_auth.rows[0];
        let userc = data.userc;
        //let isadmin = data.verification;

        //Ver si el usuario es admin de area y guardar en json para que se guarde como cookie
        return res.json({ verification: "true", token: token, id: userc });

    } catch (error) {
        next(error);
    }
}

const registrarUser = async (req, res, next) => {
    try {

        //console.log(req.body);
        const {p_nombres_apellidos, p_email, p_contra , p_contra2} = req.body;
        console.log(req.body);

        const users = await pool.query('call sp_crear_usuario($1,$2,$3)', [p_nombres_apellidos,p_email,p_contra]);
        console.log(users);

        return res.status(200).json({ message: "Se registro el usuario correctamente" });

    } catch (error) {
        next(error);
        //return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    iniciarUserGoogle,
    iniciarUser,
    registrarUser
};