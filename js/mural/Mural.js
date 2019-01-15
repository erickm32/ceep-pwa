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
    cartoes = [];
    render();
  })

  function adiciona(cartao) {
    if (logado) {
      cartoes.push(cartao)
      salvaCartoes()
      preparaCartao(cartao)
      render()
      return true
    } else {
      alert("Você não está logado")
    }
  }

  function leCartoes() {
    const json_result = JSON.parse(localStorage.getItem(usuario));
    if (json_result) {
      return json_result.map((cartaoLocal) => {
        let cartao = new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo);
        preparaCartao(cartao)
        return cartao;
      })
    }
    else {
      return []
    }
  }

  function preparaCartao(cartao) {
    cartao.on("mudanca.**", salvaCartoes)
    cartao.on("remocao", () => {
      cartoes = cartoes.slice(0)
      cartoes.splice(cartoes.indexOf(cartao), 1)
      salvaCartoes()
      render()
    })
  }

  function salvaCartoes() {
    let cartoes_mapped = cartoes.map((cartao) => ({ conteudo: cartao.conteudo, tipo: cartao.tipo }))

    localStorage.setItem(usuario, JSON.stringify(cartoes_mapped));
  }

  return Object.seal({
    adiciona
  })

})(Mural_render, Filtro)
