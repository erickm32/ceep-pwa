let logado = JSON.parse(localStorage.getItem("logado"));
let usuario = localStorage.getItem("usuario");
let login = new EventEmitter2();

LoginUsuario_render({
  logado: logado,
  usuario: usuario,
  onLogin: (nomeUsuario) => {
    logado = true;
    localStorage.setItem("logado", true);
    localStorage.setItem("usuario", nomeUsuario);
    usuario = nomeUsuario;
    login.emit('login');
  },
  onLogout: () => {
    logado = false;
    localStorage.setItem("logado", false);
    localStorage.removeItem("usuario");
    usuario = undefined;
    login.emit('logout')
  }
})
