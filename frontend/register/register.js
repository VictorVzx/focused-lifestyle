console.log("✅ register.js carregou");

const form = document.getElementById("register-form");

const botao = document.getElementById("btn");

function mostrarSenha1() {
  var inputPass = document.getElementById("senha");
  
  var btnShowPass = document.getElementById("btnShowPass");

  if (inputPass.type === 'password'){
    inputPass.setAttribute('type', 'text')
    btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
  } else {
    inputPass.setAttribute('type', 'password')
    btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
  }
}

function mostrarSenha2() {
  var inputPass2 = document.getElementById("senha2");

  var btnShowPass2 = document.getElementById("btnShowPass2");

  if (inputPass2.type === 'password'){
    inputPass2.setAttribute('type', 'text')
    btnShowPass2.classList.remove('bi-eye-fill')
    btnShowPass2.classList.add('bi-eye-slash-fill')
  } else {
    inputPass2.setAttribute('type', 'password')
    btnShowPass2.classList.remove('bi-eye-slash-fill')
    btnShowPass2.classList.add('bi-eye-fill')
  }
}

if (!form) {
  console.error("❌ Formulário #register-form não encontrado");
} else {
  console.log("✅ Formulário encontrado");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📨 Submit de register disparado");

    const name = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;
    const password2 = document.getElementById("senha2").value;

    if (!name || !email || !password) {
      console.warn("⚠️ Campos obrigatórios vazios");
      alert("Preencha todos os campos");
      return;
    }

    if (password !== password2) {
      console.warn("Senhas não coincidem");
      alert("As senhas não coincidem");
      return;
    }

    const payload = { name, email, password };
    console.log("📦 Dados enviados:", payload);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Status da resposta:", res.status);

      const text = await res.text();
      console.log("📨 Resposta crua da API:", text);

      if (!res.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      alert("✅ Usuário criado com sucesso!");
      form.reset();
      window.location.href = "../login/index.html";
      
    } catch (err) {
      console.error("❌ Erro no register:", err);
      alert("Erro ao criar conta. Veja o console.");
    }
  });
}
