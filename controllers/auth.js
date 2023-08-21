const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validarJWT');

const crearUsuario = async(req, res) => { //Esta ruta del router sería llamada como '/api/auth' + '/', ya que se llama desde el index.js
    
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({email});

        if( usuario ){
            return res.status(400).json({
                ok:true,
                msg: 'Ya existe Correo'
            })
        }

        usuario = new Usuario( req.body );

        //Encriptacion password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Generar Json Web Token
        const token = await generateJWT( usuario.id, usuario.name );
        await usuario.save(); 

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Correo Duplicado, Error'
        })
    }

}

const loginUser = async(req, res) => { //Esta ruta del router sería llamada como '/api/auth' + '/', ya que se llama desde el index.js
    
    const {  email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({email});

        if( !usuario ){
            return res.status(400).json({
                ok:true,
                msg: 'Correo Inexistente'
            })
        }

        //Confirmar Password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if(!validPassword){
            return res.status(400).json({
                ok:true,
                msg: 'Contraseña Incorrecta'
            })
        }

        //Generar Json Web Token
        const token = await generateJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Credenciales Erroneas, Error'
        })
    }
}//loginUser

const renewToken = async(req, res) => { //Esta ruta del router sería llamada como '/api/auth' + '/', ya que se llama desde el index.js
    
    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok:true,
        msg: 'renwe',
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUser,
    renewToken
}