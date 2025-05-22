export function buildRoutePath(path) {

    // Faz verificação de id na url, através de uma regex.
    // Ele verifica se depois de /: existem palavras (apenas letras)
    //  o g faz com que ele faça verificação mais de uma vez, não somente na primeira ocorrência
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // O $1 ajuda a fazer com que o valor coletado na url seja um route param
    // Pode ser substituido pelo nome do param, como id por exemplo
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    // Ajuda a validar se deu certo o regex
    // console.log(Array.from(path.matchAll(routeParametersRegex)))

    // Variavel para verificar como ficou o exemplo
    // const test = /\/users\/([a-z0-9-_]+)/

    return pathRegex
}