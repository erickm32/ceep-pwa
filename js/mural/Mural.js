const Mural = (function(_render, Filtro) {
  "use strict"
  let cartoes = leCartoes();
  const render = () => _render({
    cartoes: cartoes,
    filtro: Filtro.tagsETexto
  });
  render()

  Filtro.on("filtrado", render)

  function adiciona(cartao) {
    if(logado){
      cartoes.push(cartao)
      salvaCartoes()
      cartao.on("mudanca.**", render)
      cartao.on("remocao", ()=>{
          cartoes = cartoes.slice(0)
          cartoes.splice(cartoes.indexOf(cartao),1)
          render()
      })
      render()
      return true
    } else {
      alert("Você não está logado")
    }
  }

  function leCartoes(){
    return JSON.parse(localStorage.getItem('cartoes')).map(
      (cartaoLocal) => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo)
      ) || []
  }

  function salvaCartoes(){
    let cartoes_mapped = cartoes.map((cartao) => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))

    localStorage.setItem('cartoes', JSON.stringify(cartoes_mapped));
  }

  return Object.seal({
    adiciona
  })

})(Mural_render, Filtro)
