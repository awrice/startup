function loginClicked() {
    const username = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    login(username, password).then((status) => {
        if (status != 200) {
            document.querySelector("#logindialog").innerHTML = "Incorrect username or password!";
        } else {
            document.querySelector("#logindialog").innerHTML = "Login successful...";
            localStorage.setItem("username", username);
            console.log(document.cookie.token);
            window.location.href = "listings.html";
        }
    });
    return;
}

function createClicked() {
    const username = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;
    createUser(username, password).then((status) => {
        if (status != 200) {
            document.querySelector("#logindialog").innerHTML = "Username is already taken!";
        } else {
            document.querySelector("#logindialog").innerHTML = "Registration successful... logging in";
            loginClicked();
        }
    });
    return;
}