module.exports = {
    INTERACTION_NOT_DEFERED_NOR_REPLIED: "Aconteceu um problema ao executar essa skill **CHAMA O JOÃO!!!**",
    CHANNEL_NOT_FOUND: "Não te encontrei meu querido, **você está conectado em um canal do servidor?**",
    QUEUE_NOT_FOUND: "Nenhuma música na fila, **adicione usando `/play url:[LINK_YOUTUBE]`**",
    QUEUE_PAUSED: "A mimir, **para retomar use `/play`**",
    QUEUE_AND_URL_NOT_FOUND: "Não tenho bola de cristal, **preciso do link do vídeo**",
    QUEUE_EXISTS_URL_NOT_FOUND: "**Voltando a tocar...**",
    STOP_QUEUE: "A mimir, **para retomar use `/play url:[LINK_YOUTUBE]`**",
    ADDED_TO_QUEUE: (track) => `**[${track.title}](<${track.url}>)** Adicionada à fila`,
}