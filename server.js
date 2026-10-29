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
    db.query(sql,(erro, resultados)=>{
        if(erro){
            return res.status(500).send("Erro ao consultar o DB")
        }
    })
}