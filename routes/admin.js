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
        style: 'config-login.css'
    })
})
//rotas do configN

router.get('/configN',(req, res)=>{
    res.render('admin/configN/adminNoticias', {
        title:'Admin PSCJ',
        configN: 'true',
        style: 'config-inicio.css',
        nome: 'Alguém qualquer'
    })
})
router.get('/configN/Carrossel',(req, res)=>{
    res.render('admin/configN/config-carrossel', {
        title:'Admin PSCJ - Carrossel',
        configN: 'true',
        style: 'configN-carrosel.css'
    })
})
router.get('/configN/Capelas',(req, res)=>{

    horarioDM.findById({_id:'62fd46a3b7e658366665b46c'}).then((horarioDM)=>{
        horarioSJ.findById({_id:'63056630389fbeb07b5cbc48'}).then((horarioSJ)=>{
            horarioSL.findById({_id:'63055e9811bd4bb16baffea7'}).then((horarioSL)=>{
        
        const horarioSanta = horarioSL.Horario
        const diasSanta = horarioSL.Dias 
        const localSanta = horarioSL.Local  
        const horarioSao =  horarioSJ.Horario
        const diasSao = horarioSJ.Dias
        const localSao = horarioSJ.Local
        const horarioDom = horarioDM.Horario
        const diasDom = horarioDM.Dias
        const localDom = horarioDM.Local
        const dias = {
            Segunda: 'Segunda-Feira',
            Terca: 'Terça-Feira',
            Quarta: 'Quarta-Feira',
            Quinta: 'Quinta-Feira',
            Sexta: 'Sexta-Feira',
            Sabado: 'Sábado',
            Domingo: 'Domingo'
        }
        const diasDM = {
         segDM : [],
         terDM : [],
         quaDM : [],
         quiDM : [],
         sexDM : [],
         sabDM : [],
         domDM : []
        }

        const diasSL = {
         segSL : [],
         terSL : [],
         quaSL : [],
         quiSL : [],
         sexSL : [],
         sabSL : [],
        domSL  : []
        }

        const diasSJ = {
         segSJ : [],
         terSJ : [],
         quaSJ : [],
         quiSJ : [],
         sexSJ : [],
         sabSJ : [],
         domSJ : []
           }

        if(diasDom == dias.Segunda){
            diasDM.segDM.push('selected')
        }if(diasDom == dias.Terca){
            diasDM.terDM.push('selected')
        }if(diasDom == dias.Quarta){
            diasDM.quaDM.push('selected')
        }if(diasDom == dias.Quinta){
            diasDM.quiDM.push('selected')
        }if(diasDom == dias.Sexta){
            diasDM.sexDM.push('selected')
        }if(diasDom == dias.Sabado){
            diasDM.sabDM.push('selected')
        }if(diasDom == dias.Domingo){
            diasDM.domDM.push('selected')
        }

        if(diasSao == dias.Segunda){
            diasSJ.segSJ.push('selected')
        }if(diasSao == dias.Terca){
            diasSJ.terSJ.push('selected')
        }if(diasSao == dias.Quarta){
            diasSJ.quaSJ.push('selected')
        }if(diasSao == dias.Quinta){
            diasSJ.quiSJ.push('selected')
        }if(diasSao == dias.Sexta){
            diasSJ.sexSJ.push('selected')
        }if(diasSao == dias.Sabado){
            diasSJ.sabSJ.push('selected')
        }if(diasSao == dias.Domingo){
            diasSJ.domSJ.push('selected')
        }

        if(diasSanta == dias.Segunda){
            diasSL.segSL.push('selected')
        }if(diasSanta == dias.Terca){
            diasSL.terSL.push('selected')
        }if(diasSanta == dias.Quarta){
            diasSL.quaSL.push('selected')
        }if(diasSanta == dias.Quinta){
            diasSL.quiSL.push('selected')
        }if(diasSanta == dias.Sexta){
            diasSL.sexSL.push('selected')
        }if(diasSanta == dias.Sabado){
            diasSL.sabSL.push('selected')
        }if(diasSanta == dias.Domingo){
            diasSL.domSL.push('selected')
        }
        

        res.render('admin/configN/config-capelas', {
            horarioDom: horarioDom,
            horarioSanta: horarioSanta,
            horarioSao: horarioSao,
            diasDM: diasDM,
            diasSJ: diasSJ,
            diasSL: diasSL, 
            localDom: localDom,
            localSanta: localSanta,
            localSao: localSao,
            title:'Admin PSCJ - Capelas',
            configN: 'true',
            style: 'configN-capela.css',
            js: 'configN-capelas.js'
        })
        })
    })
})
})

//Atualizando horários capelas.
router.post('/configN/updateDM', (req, res)=>{
    horarioDM.findOne({_id:req.body.id}).then((horarioDM)=>{
        horarioDM.Horario = req.body.horarioDM
        horarioDM.Dias = req.body.semanaDM
        horarioDM.Local = req.body.localDM

            horarioDM.save().then(()=>{
                req.flash('success_msg','Deu certo, horário Dom Bosco atualizado!')
                res.redirect('/admin//configN/Capelas')
            }).catch((err)=>{
                req.flash('error_msg','Deu errado, tente mais uma vez!')
                res.redirect('/admin//configN/Capelas')
            })
        })
})
router.post('/configN/updateSJ', (req, res)=>{

        horarioSJ.findOne({_id: req.body.id}).then((horarioSJ)=>{
            horarioSJ.Horario = req.body.horarioSJS
            horarioSJ.Dias = req.body.semanaSJS
            horarioSJ.Local = req.body.localSJS

        horarioSJ.save().then(()=>{
            req.flash('success_msg','Deu certo, horário São José atualizado!')
            res.redirect('/admin//configN/Capelas')
        }).catch((err)=>{
            req.flash('error_msg','Deu errado, tente mais uma vez!')
            res.redirect('/admin//configN/Capelas')
        })
    })
})
router.post('/configN/updateSL', (req, res)=>{

            horarioSL.findOne({_id: req.body.id}).then((horarioSL)=>{

                horarioSL.Horario = req.body.horarioSTL,
                horarioSL.Dias =  req.body.semanaSTL
                horarioSL.Local = req.body.localSTL

            horarioSL.save().then(()=>{
                req.flash('success_msg','Deu certo, horário Santa Luzia atualizado!')
                res.redirect('/admin//configN/Capelas')
            }).catch((err)=>{
                req.flash('error_msg','Deu errado, tente mais uma vez!')
                res.redirect('/admin//configN/Capelas')            
            })
        })
})

router.get('/configN/Galeria',(req, res)=>{
    res.render('admin/configN/config-galeria', {
        title:'Admin PSCJ - Galeria',
        configN: 'true',
        style: 'configN-galeria.css'
    })
})

router.get('/configN/Horario-Matriz',(req, res)=>{
    res.render('admin/configN/config-horario-matriz', {
        title:'Admin PSCJ - Horário Matriz',
        configN: 'true',
        style: 'configN-horirio_matriz.css'
    })
})

router.get('/configN/Nossa-Historia',(req, res)=>{
    res.render('admin/configN/config-nossa-hitoria', {
        title:'Admin PSCJ - Nossa Hitória',
        configN: 'true',
        style: 'config-historia.css'
    })
})
router.get('/configN/Stories',(req, res)=>{
    res.render('admin/configN/config-Stories',{
        title:'Admin PSCJ - Stories',
        configN: 'true',
        style: 'config-stories.css'
    })
})


//rota do configS

router.get('/configS',(req, res)=>{
    res.render('admin/configS/adminSecretaria', {
        title:'Admin PSCJ',
        configS: 'true',
        style: 'config-inicio.css',
        nome: 'Iara'
    })
})
router.get('/configS/adm-eventos',(req, res)=>{
    res.render('admin/configS/adm-eventos', {
        title:'Admin PSCJ - Adm Eventos',
        configS: 'true',
        style: 'configS-adm-eventos.css',
        js: 'configS-eventos.js',
        value: '',
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