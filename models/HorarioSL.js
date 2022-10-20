const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const horarioSL = new Schema({
    Horario: {
        type: String,
        required: true
    },
    Dias: {
        type: String,
        required: true
    },
    Local: {
        type: String,
        required: true
    }
})

mongoose.model("horarioSL", horarioSL)