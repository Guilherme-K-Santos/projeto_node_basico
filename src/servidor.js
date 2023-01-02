const porta = 3003

// para se criar um servidor web, precisamos de uma porta
// uma porta é uma forma de selecionar qual processo vai atender a requisição.

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const bancodeDados = require('./banco_dados')

app.use(bodyparser.urlencoded({extended: true}))

app.get('/produtos', (req, res) => {
    res.send(bancodeDados.getProdutos())
})

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancodeDados.getProduto(req.params.id))
})

app.post('/produtos', (req, res, next) => {
    const produto = bancodeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) // JSON
})

app.put('/produtos/:id', (req, res, next) => {
    const produto = bancodeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) // JSON
})

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancodeDados.excluirProduto(req.params.id)
    res.send(produto) // JSON
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})