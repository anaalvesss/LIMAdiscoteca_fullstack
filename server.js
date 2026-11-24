const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "db_discoteca"
})

//testar conexão
db.connect((erro)=>{
    if(erro){
        console.error("Erro ao conectar:", erro)
    }else{
        console.log("Conectado ao DB")
    }
})

//listar todos os discos
const mostrarDiscos = (req, res) => {
    const sql = "SELECT album , artista, genero, imagem_url AS imagem, preco FROM discos"
    db.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao consultar o BD"})
        }
        res.json(resultado)
    })
}
//Cadastrar Discos
const cadastrarDisco = (req, res) => {
    const { album, artista, genero, imagem, preco } = req.body

    if(album && artista && genero && imagem && preco){
        const sql = "INSERT INTO discos (album, artista, genero, imagem_url, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [album, artista, genero, imagem, preco]

        db.query(sql, valores, (erro, resultado) => {
            if(erro){
                return res.status(500).json({erro: "Erro ao inserir disco"})
    
            }
            res.send("Disco cadastrado com sucesso")
        })
    }else{
        res.status(400).json({erro: "Erro: preencha todos os campos"})
    }
}
//Middleware

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 3000

//Rotas
app.get("/listar", mostrarDiscos)
app.post("/cadastrar", cadastrarDisco)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})