import { Transform } from 'node:stream'
import http from 'node:http'

class InverseNumberStream extends Transform {
    _transform (chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

// req => readableStream 
// res => writableStream

const server = http.createServer(async(req, res) => {
    const buffers = []

    // Faz com que carregue todas as informações de uma só vez
    // Enquanto não carregar tudo, o restante do código não é executado
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullBody = Buffer.concat(buffers).toString()

    console.log(fullBody)

    return res.end(fullBody)

    // Serve para estruturas de dados que podem ser consumidas de formas parciais
    // Ex: musica, vídeo, csv, etc

    return req
        .pipe(new InverseNumberStream())
        .pipe(res)
}) 

server.listen(3334)