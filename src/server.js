import http from 'node:http'

import { json } from './middlewares/json.js'
import { Database } from './database/database.js'
import { routes } from './routes/routes.js'

// Aplicação Stateless (não armazena infos no banco, apenas em tempo de execução)
// Aplicação Statefull (Armazena todos os registros em banco, com dados persistentes)

const database = new Database()

const server = http.createServer(async (req, res)=> {
    
    // Executa desestruturação para saber 
    // o metodo e a url que estão sendo chamados
    const {method, url} = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        console.log("Method: "+route.method+" - Route: "+req.url)

        const routeParams = req.url.match (route.path)
        
        // console.log(routeParams)

        // Coleta os route params e armazena dentro de req.params
        req.params = {...routeParams.groups}

        return route.handler(req, res) 
    }

    // Executa o armazenamento em buffer das informações
    await json(req, res)

})

server.listen(3333)