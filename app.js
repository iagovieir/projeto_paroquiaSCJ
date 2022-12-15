const express = require('express')
const app =  express()
const { engine } = require ('express-handlebars')
const admin = require('./routes/admin')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const multer = require('multer')

require('./models/HorarioDM')
const horarioDM = mongoose.model('horarioDM')
require('./models/HorarioSJ')
const horarioSJ = mongoose.model('horarioSJ')
require('./models/HorarioSL')
const horarioSL = mongoose.model('horarioSL')

//config sessão
app.use(session({
    secret: 'sxjAwf<k',
    resave: true,
    saveUninitialized: true
}))
//config do flash (mensagens de erros)
app.use(flash())

//variável globais
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) =>{
        cb(null, Date.now + file.originalname)
    }
})

const upload = multer({storage: storage})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/paroquiascj').then(()=>{
    useMongoClient: true
    console.log('Conectado ao banco de dados com sucesso')
}).catch((err)=>{
    console.log(`houeve um erro e o erro é referente à ${err}`)
})

app.engine('handlebars', engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.set("views", "./views")

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));



app.get('/', (req, res)=>{
    res.render('index', {
    style: 'index.css',
    title: 'Paróquia Sagrado Coração',
    partialsON:'true'
    })
})
app.get('/contatos', (req, res)=>{
    res.render('user/contatos', {
    title: 'PSCJ - Contatos',
    partialsON:'true',
    style: 'contatos.css'
    })
})
app.get('/pastorais', (req, res)=>{
    res.render('user/pastorais', {
    title: 'PSCJ - Pastorais',
    partialsON:'true',
    style: 'pastorais.css'
    })
})
app.get('/horarios-matriz', (req, res)=>{
    res.render('user/horarios-matriz', {
    title: 'PSCJ - Horários Matriz',
    partialsON:'true',
    style: 'horario-matriz.css'
    })
})
app.get('/nossa-historia', (req, res)=>{
    res.render('user/historia', {
    title: 'PSCJ - Nossa História',
    partialsON:'true',
    style: 'nossa-hitoria.css'
    })
})
//rotas dos movimentos
app.get('/movimentos', (req, res)=>{
    res.render('user/movimentos', {
    title: 'PSCJ - Movimentos',
    partialsON:'true',
    style: 'movimento.css'
    })
})

app.get('/movimentos/CadEJC', (req, res)=>{
    res.render('user/CadEJC', {
    title: 'PSCJ - Inscrição EJC',
    partialsON:'true',
    style: ''
    })
})

app.get('/movimentos/CadECC', (req, res)=>{
    res.render('user/CadECC', {
    title: 'PSCJ - Inscrição ECC',
    partialsON:'true',
    style: ''
    })
})



//rotas das comunidades
app.get('/comunidades', (req, res)=>{
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

                    
                        res.render('user/comunidades', {
                        horarioDom: horarioDom,
                        horarioSanta: horarioSanta,
                        horarioSao: horarioSao,
                        diasDom: diasDom,
                        diasSao: diasSao,
                        diasSanta: diasSanta, 
                        localDom: localDom,
                        localSanta: localSanta,
                        localSao: localSao,
                        title: 'PSCJ - Comunidades',
                        partialsON:'true',
                        style: 'comunidades.css'
                        })
                    })
                })
            })
})
//rotas admin
app.use('/admin', admin)

app.listen(8080, () =>{
    console.log("servido iniciado na porta 8080: http://localhost:8080");
});