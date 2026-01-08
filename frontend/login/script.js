console.log("✅ script.js carregou");

// pega o formulário
const form = document.getElementById("login-form");

function mostrarSenha() {
  var inputPass = document.getElementById("password");
  var btnShowPass = document.getElementById("btnSenha");

  if (inputPass.type === 'password'){
    inputPass.setAttribute('type', 'text')
    btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
  } else {
    inputPass.setAttribute('type', 'password')
    btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
  }
}


// segurança: verifica se o form existe
if (!form) {
  console.error("❌ Formulário #login-form não encontrado");
} else {
  console.log("✅ Formulário encontrado");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("📨 Submit disparou");
    login();
  });
}

async function login() {
  console.log("🚀 login() foi chamado");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!emailInput || !passwordInput) {
    console.error("❌ Inputs não encontrados");
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;

  console.log("📦 Dados enviados:", { email, password });

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("📡 Status da resposta:", res.status);

    const text = await res.text();
    console.log("📨 Resposta crua da API:", text);

    if (!res.ok) {
      console.error("❌ Erro da API");
      return;
    }

    const data = JSON.parse(text);
    console.log("✅ JSON parseado:", data);

    // exemplo: salvar token
    if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("🔐 Token salvo no localStorage");
    }
  } catch (err) {
    console.error("💥 Erro no fetch:", err);
  }
}
