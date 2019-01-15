const Mural = (function (_render, Filtro) {
    "use strict"
    let cartoes = leCartoes();

    const render = () => _render({
        cartoes: cartoes,
        filtro: Filtro.tagsETexto
    });
    render()

    Filtro.on("filtrado", render)

    login.on('login', () => {
        cartoes = leCartoes()
        render();
    })

    login.on('logout', () => {
        cartoes = []
        render()
    })

    function adiciona(cartao) {
        if (logado) {
            cartoes.push(cartao)
            salvaCartoes()
            cartao.on("mudanca.**", render)
            preparaCartao(cartao)
            render()
            return true
        } else {
            alert("Você não está logado")
        }
    }

    function leCartoes() {
        const cartoesLocal = JSON.parse(localStorage.getItem(usuario))
        if (cartoesLocal) {
            return cartoesLocal.map(cartaoLocal => {
                let cartao = new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo)
                preparaCartao(cartao)
                return cartao
            })
        }
        else {
            return []
        }
    }
    function preparaCartao(cartao) {
        const urlsImagens = Cartao.pegaImagens(cartao)
        urlsImagens.forEach(url => {
            fetch(url).then(resposta => {
                caches.open('ceep-imagens').then(cache => {
                    cache.put(url, resposta)
                })
            })
        })

        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", () => {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({ conteudo: cartao.conteudo, tipo: cartao.tipo }))
        ))
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
