const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/HorarioDM')
const horarioDM = mongoose.model('horarioDM')
require('../models/HorarioSJ')
const horarioSJ = mongoose.model('horarioSJ')
require('../models/HorarioSL')
const horarioSL = mongoose.model('horarioSL')

router.get('/',(req, res)=>{
    res.render('admin/login', {
        title:'PSCJ - Login Admin',
        style: 'login.css'
    })
})
//rotas do configN

router.get('/configN',(req, res)=>{
    res.render('admin/configN/adminNoticias', {
        title:'Admin PSCJ',
        configN: 'true',
        style: 'inicioconfig.css',
        nome: 'Alguém qualquer'
    })
})
router.get('/configN/Carrossel',(req, res)=>{
    res.render('admin/configN/config-carrossel', {
        title:'Admin PSCJ - Carrossel',
        configN: 'true'
    })
})
router.get('/configN/Capelas',(req, res)=>{

    horarioDM.findOne({_id:"62fd46a3b7e658366665b46c"}).then((horarioDM)=>{

        res.render('admin/configN/config-capelas', {
            horario: horarioDM,
            title:'Admin PSCJ - Capelas',
            configN: 'true',
            style: 'capela.css'
        })
        })
})
router.get('/configN/Galeria',(req, res)=>{
    res.render('admin/configN/config-galeria', {
        title:'Admin PSCJ - Galeria',
        configN: 'true'
    })
})
router.get('/configN/Horario-Matriz',(req, res)=>{
    res.render('admin/configN/config-horario-matriz', {
        title:'Admin PSCJ - Horário Matriz',
        configN: 'true'
    })
})
//Atualizando horários capelas.
router.post('/configN/updateDM', (req, res)=>{
    horarioDM.findOne({_id:req.body.id}).then((horarioDM)=>{
        horarioDM.Horario = req.body.horarioDM
        horarioDM.Dias = req.body.semanaDM

            horarioDM.save().then(()=>{
                console.log('deu certo, dado atualizado com sucesso')
                res.redirect('/admin//configN/Capelas')
            }).catch((err)=>{
                console.log('Houve um erro ao tentar atualizar o horário e dia, tente mais uma vez!' + err)
            })
})
})
router.post('/configN/updateSJ', (req, res)=>{

        horarioSJ.findOne({_id: req.body.id}).then((horarioSJ)=>{
            horarioSJ.Horario = req.body.horarioSJS
            horarioSJ.Dias = req.body.semanaSJS

        horarioSJ.save().then(()=>{
            console.log('deu certo, dado atualizado')
            res.redirect('/admin//configN/Capelas')
        }).catch((err)=>{
            console.log('Houve um erro ao tentar atualizar o horário e dia, tente mais uma vez!' + err)
        })
    })
})
router.post('/configN/updateSL', (req, res)=>{

            horarioSL.findOne({_id: req.body.id}).then((horarioSL)=>{

                horarioSL.Horario = req.body.horarioSTL,
                horarioSL.Dias =  req.body.semanaSTL

            horarioSL.save().then(()=>{
                console.log('deu certo, dado atualizado')
                res.redirect('/admin//configN/Capelas')
            }).catch((err)=>{
                console.log('Houve um erro ao tentar atualizar o horário e dia, tente mais uma vez!' + err)
            })
            })
})
//rota do configS

router.get('/configS',(req, res)=>{
    res.render('admin/configS/adminSecretaria', {
        title:'Admin PSCJ',
        configS: 'true',
        style: 'inicioconfig.css',
        nome: 'Iara'
    })
})
router.get('/configS/',(req, res)=>{
    res.render('admin/configS/', {
        title:'Admin PSCJ - Carrossel',
        configS: 'true'
    })
})
router.get('/configS/',(req, res)=>{
    res.render('admin/configS/', {
        title:'Admin PSCJ - ',
        configS: 'true'
    })
})
router.get('/configS/Galeria',(req, res)=>{
    res.render('admin/configS/', {
        title:'Admin PSCJ - ',
        configS: 'true'
    })
})
router.get('/configS/',(req, res)=>{
    res.render('admin/configN/', {
        title:'Admin PSCJ - ',
        configS: 'true'
    })
})
module.exports = router;