export function buildRoutePath(path) {

    // Faz verificação de id na url, através de uma regex.
    //Ele verifica se depois de /: existem palavras (apenas letras)
    //  o g faz com que ele faça verificação mais de uma vez, não somente na primeira ocorrência
    const routeParametersRegex = /:([a-zA-Z]+)/g
    
    // Ajuda a validar se deu certo o regex
    // console.log(Array.from(path.matchAll(routeParametersRegex)))
    return new RegExp()
}