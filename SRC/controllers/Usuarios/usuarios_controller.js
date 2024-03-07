const pool = require('../../database/db');
const jwt = require('jsonwebtoken');


//funcion para listar las tareas que tiene un usuario dentro de x grupo

const listar_usuario = async (req, res, next) => {
    try {

        const { p_id_user } = req.params;

        const result = await pool.query('select * from fu_tareas_usuario($1,$2)', [id,id_grupo]);

        //console.log(id);
        //console.log(result.rows);

        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


//funcion para modificar una tarea de un usuario x de un x grupo

const modificar_usuario = async (req, res, next) => {
    try {
        const { p_titulo, p_descripcion,p_importante, p_id_tareas } = req.body;

        //console.log(req.body);

        const result = await pool.query('call sp_modificar_tarea($1,$2,$3,$4)', [p_titulo, p_descripcion,p_importante, p_id_tareas]);

        return res.status(200).json({ message: "Se modifico la tarea" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    modificar_usuario,
    listar_usuario
};