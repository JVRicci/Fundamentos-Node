// Buffers: é a representação de dados na memória utilizada pelo node
// Ele armazena os dados de forma hexadecimal, forma mais otimizada do que salvando dados brutos
const buf = Buffer.from("Hello")

console.log(buf.toJSON())