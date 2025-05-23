import { randomUUID } from "node:crypto"
import { Database } from "../database/database.js"
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', search ? {
                name: search,
                email: search
            } : null )

            return res.writeHead(200).end(JSON.stringify(users))
        }
    },

    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body 
            
            const user ={
                id : randomUUID(),
                name,
                email
            }

            database.insert('users', user)

            return res
            .writeHead(201).
            end('Usuário criado com sucesso')
        }
    },

    {
        method:'PUT',
        path: buildRoutePath('/users/:id'),
        handler:  (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            database.update('users', id, {
                name,
                email,
            })
            
            return res.writeHead(204).end()
        }
    },

    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    }
]

// Query parameters : parametros passados via url, junto com o nome. URL Stateful
// Exemplo: /users?nome=juaum

//Route parameters: Parametros não nomeados que ficam na URL
// Exemplo: /users/1

//Request body: argumentos são enviados por corpo de requisição, não por URL