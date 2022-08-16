const express = require('express')
const app =  express()
const { engine } = require ('express-handlebars')
const admin = require('./routes/admin')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

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
    title: 'Paróquia SCJ',
    partialsON:'true'
    })
})
app.get('/contatos', (req, res)=>{
    res.render('user/contatos', {
    title: 'PSCJ - Contatos',
    partialsON:'true'
    })
})
app.get('/pastorais', (req, res)=>{
    res.render('user/pastorais', {
    title: 'PSCJ - Pastorais',
    partialsON:'true'
    })
})
app.get('/horarios-matriz', (req, res)=>{
    res.render('user/horarios-matriz', {
    title: 'PSCJ - Horários Matriz',
    partialsON:'true'
    })
})
app.get('/nossa-historia', (req, res)=>{
    res.render('user/historia', {
    title: 'PSCJ - Nossa História',
    partialsON:'true'
    })
})
//rotas dos eventos
app.get('/eventos', (req, res)=>{
    res.render('user/eventos', {
    title: 'PSCJ - Eventos',
    partialsON:'true'
    })
})

//rotas das comunidades
app.get('/comunidades', (req, res)=>{
    res.render('user/comunidades', {
    title: 'PSCJ - Comunidades',
    partialsON:'true'
    })
})
app.get('/comunidades/santa-luzia', (req, res)=>{
    res.render('user/santaluzia', {
    title: 'PSCJ - Santa Luzia',
    partialsON:'true'
    })
})
app.get('/comunidades/dom-bosco', (req, res)=>{
    res.render('user/dombosco', {
    title: 'PSCJ - Dom Bosco',
    partialsON:'true'
    })
})
app.get('/comunidades/sao-jose', (req, res)=>{
    res.render('user/saojose', {
    title: 'PSCJ - São josé',
    partialsON:'true'
    })
})
//rotas admin
app.use('/admin', admin)

app.listen(8080, () =>{
    console.log("servido iniciado na porta 8080: http://localhost:8080");
});