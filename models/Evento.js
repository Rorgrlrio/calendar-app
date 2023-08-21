const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId, //Hacemos referencia al Modelo de Usuario de esta manera
        ref: 'Usuario',
        required: true //En estos casos se usa REQUIRED y no REQUIRE
    }

});

EventoSchema.method('toJSON', function(){
    const { _v, _id, ...object } = this.toObject();

    object,id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);