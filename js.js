const adminCredentials = {
    email: "admin@example.com",
    password: "password123"
};

// Recuperar respostas do LocalStorage
let responses = JSON.parse(localStorage.getItem("responses")) || [];

function submitForm() {
    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && subject && message) {
        const newResponse = { name, subject, message };
        responses.push(newResponse);

        // Salvar no LocalStorage
        localStorage.setItem("responses", JSON.stringify(responses));

        document.getElementById("formSuccess").style.display = "block";
        setTimeout(() => {
            document.getElementById("formSuccess").style.display = "none";
        }, 3000);

        document.getElementById("teacherForm").reset();
    } else {
        alert("Preencha todos os campos!");
    }
}

function showLogin() {
    document.getElementById("form-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
}

function adminLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("admin-section").classList.remove("hidden");
        updateResponses();
    } else {
        document.getElementById("loginError").style.display = "block";
        setTimeout(() => {
            document.getElementById("loginError").style.display = "none";
        }, 3000);
    }
}

function updateResponses() {
    const responseList = document.getElementById("responses");
    responseList.innerHTML = "";

    if (responses.length === 0) {
        responseList.innerHTML = "<li>Nenhuma resposta enviada ainda.</li>";
    } else {
        responses.forEach((response, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${response.name} (${response.subject}): ${response.message}`;
            responseList.appendChild(listItem);
        });
    }
}

function logout() {
    document.getElementById("admin-section").classList.add("hidden");
    document.getElementById("form-section").classList.remove("hidden");
}
