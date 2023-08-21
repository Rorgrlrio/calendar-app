// const crearUsuario = async(req, res) => { //Esta ruta del router sería llamada como '/api/auth' + '/', ya que se llama desde el index.js
const { response } = require('express');
const Evento = require('../models/Evento');   

const getEventos = async(req, res) => {

    const eventos = await Evento.find().populate('user','name'); //Esto es un SELECT * de Mongo
    //Con ayuda de moongose, usamos populate ( "Evento" tiene el atributo "user" que referencia al modelo "Usuario" )
    //Para que automaticamente, "user", que solo contenia el id de dicho Usuario, se convierta en una instancia del registro completo
    //de Usuario, decimos que solo queremos el "name" de dicho usuario

    res.json({
        ok:true,
        msg: 'getEventos',
        eventos
    })

}

const crearEvento = async(req, res) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            eventoGuardado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Hable con el adming"
        })
    }

}//crearEvtno

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok:false,
                msg: "No existe el id de ese evento"
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: "No tienes permiso de editar este evtno"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento);

        res.json({
            ok: true,
            msg: "Evento actualizado"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Hable con el adming"
        })
    }

}

const eliminarEvento = async(req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok:false,
                msg: "No existe el id de ese evento"
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: "No tienes permiso de editar este evtno"
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: "Evento eliminado"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Hable con el adming"
        })
    }

    res.status(201).json({
        ok:true,
        msg: 'eliminarEventos',
        id
    })

}

module.exports = {
    getEventos,
    eliminarEvento,
    actualizarEvento,
    crearEvento
}