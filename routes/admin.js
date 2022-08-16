const express = require('express')
const router = express.Router()

router.get('/',(req, res)=>{
    res.render('admin/login', {
        title:'PSCJ - Login Admin',
        style: 'login.css'
    })
})

router.post('/login', (req, res)=>{
    res.send("seu usuario é: " + req.body.usuario+ " sua senha é: "+ req.body.password)
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
    res.render('admin/configN/config-capelas', {
        title:'Admin PSCJ - Capelas',
        configN: 'true',
        style: 'capela.css'
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