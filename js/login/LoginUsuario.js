let logado = JSON.parse(localStorage.getItem("logado"));

LoginUsuario_render({
  logado: logado,
  usuario: localStorage.getItem('usuario'),
  onLogin: (nome_usuario) => {
    logado = true;
    localStorage.setItem("logado", true);
    localStorage.setItem("usuario", nome_usuario);
  },
  onLogout: () => {
    logado = false;
    localStorage.setItem("logado", false);
    localStorage.removeItem("usuario");
  }
})
