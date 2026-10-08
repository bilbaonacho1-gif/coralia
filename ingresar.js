// Coralia — pantalla de inicio de sesión (ingresar.html)
// Todavía no está conectada: la cuenta de cada persona va a estar en Wix (usuarios de Wix Headless).
// Cuando esté el proyecto de Wix, se completa la función entrar() y nada más.
(() => {
  const form = document.getElementById('loginForm'); if (!form) return;
  const tr = (s) => (window.I18N ? I18N.t(s) : s);
  const msg = document.getElementById('loginMsg');
  const go = form.querySelector('.login__go');
  const CONTACTO = 'contacto@coraliae.com';

  // TODO Wix Headless: iniciar sesión con el SDK de Wix (members / auth.login con email y contraseña)
  // y, si sale bien, mandar a la persona a la plataforma. Mientras tanto avisa que el acceso no está habilitado.
  async function entrar(email, password, recordar) {
    throw new Error('sin-conectar');
  }

  const show = (text) => { msg.innerHTML = text; msg.hidden = false; };
  const err = (name, on) => {
    const f = form.elements[name], e = form.querySelector(`.login__err[data-for="${name}"]`);
    e.hidden = !on; f.setAttribute('aria-invalid', on);
  };
  const mail = `<a href="mailto:${CONTACTO}">${CONTACTO}</a>`;

  // ver u ocultar la contraseña
  const eye = form.querySelector('.login__eye'), pass = form.elements.password;
  eye.addEventListener('click', () => {
    const on = pass.type === 'password';
    pass.type = on ? 'text' : 'password';
    eye.setAttribute('aria-pressed', on);
    eye.setAttribute('aria-label', tr(on ? 'Ocultar contraseña' : 'Mostrar contraseña'));
    eye.classList.toggle('is-on', on);
  });

  ['email', 'password'].forEach((n) => form.elements[n].addEventListener('input', () => err(n, false)));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim(), password = pass.value;
    const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    err('email', !okMail); err('password', !password);
    msg.hidden = true;
    if (!okMail) { form.elements.email.focus(); return; }
    if (!password) { pass.focus(); return; }
    go.disabled = true; go.classList.add('is-busy');
    try {
      await entrar(email, password, form.elements.recordar.checked);
    } catch (x) {
      show(`${tr('El acceso a la plataforma se está habilitando. Mientras tanto, escribinos a')} ${mail} ${tr('y te damos acceso.')}`);
    } finally {
      go.disabled = false; go.classList.remove('is-busy');
    }
  });

  document.getElementById('loginForgot').addEventListener('click', (e) => {
    e.preventDefault();
    show(`${tr('Escribinos a')} ${mail} ${tr('y te ayudamos a recuperar el acceso.')}`);
  });
})();
