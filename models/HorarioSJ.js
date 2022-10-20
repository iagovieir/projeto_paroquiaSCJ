const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const horarioSJ = new Schema({
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

mongoose.model("horarioSJ", horarioSJ)