// Middlare para carregamento de informações em buffers js
export async function json(req, res) {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    // Tenta armazenar em um buffer a requisição
    // Caso não tiver body na req, ele nulifica, por exemplo em get
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }    

    res.setHeader('Content-type', 'application/json')
}