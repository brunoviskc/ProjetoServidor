/*
CADASTRO DE USUÁRIOS
    [x] Criar um usuário
        - Receber Email, Nome e Telefone
    [x] Deletar um usuário
    [] Editar um usuário
    [x] Buscar todos os usuários
    [x] Buscar um usuário específico

    require / requisitando, pegando uma biblioteca
    Endereco: http://localhost:3000/usuarios

    JSON / JAVASCRIPT OBJECT NOTATION
    JSON é o Padrão de dados da internet
    Front End -> Back End (JSON)

    bruno_db
    hjYwtS6pZgcqZzPW
*/

const express = require("express")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

//let usuarios = []
//let id = 1

//Rota que co FrontEnd vai acessar
//CRIA UM NOVO USUÁRIO

// async - funcao assincrona -> funcao que vai buscar dados fora da minha aplicação
app.post('/usuarios', async (request, response) => {

    const { name, email, telefone} = request.body
    //await = espera
    const user = await prisma.user.create({
        data: {
            name,
            email,
            telefone,
        }
    })

    // const user = {

    //     id: id++,
    //     nome: nome,
    //     email: email,
    //     telefone: telefone,
    //     criadoEm: new Date(),

    // }

    // usuarios.push(user)
    // push -> colocar algo dentro do array

    return response.status(200).send(user)
})



//DELETAR UM USUÁRIO

app.delete('/usuarios/deletar/:id', async (request, response) => {

    const id = request.params.id
    //where / Onde
    const userDeleted = await prisma.user.delete({
        where: { id }
    })

    return response.status(200).send(userDeleted)
})



//BUSCA TODOS OS USUÁRIOS
app.get('/usuarios', async (request, response) => {

    const users = await prisma.user.findMany()
    // find = Procurar
    // unique = Muitos

    return response.status(200).send(users)
})

//BUSCA USUÁRIO POR ID
app.get('/buscar/usuarios/:id', async (request, response) => {

    const id = request.params.id

    const users = await prisma.user.findUnique({
        where: { id }
    })
    // find = Procurar
    // unique = Único

    return response.status(200).send(users)
})

//EDITAR UM USUARIO
app.put('/editar/usuario/:id', async (request, response) => {

    const id = request.params.id
    const { name, telefone, email } = request.body 
    
    const usuarioAtualizado = await prisma.user.update({
        where: { id },
        data: {
            name,
            telefone,
            email
        }


    })

    return response.status(200).send(usuarioAtualizado)
})


app.listen(3333, () => {
    console.log("Servidor Rodando")
})
