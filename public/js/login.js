function loginClicked() {
    const username = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    login(username, password).then((status) => {
        if (status == 200) {
            document.querySelector("#logindialog").innerHTML = "Login successful...";
            localStorage.setItem("username", username);
            console.log(document.cookie.token);
            window.location.href = "listings.html";
        } else if (status == 401) {
            document.querySelector("#logindialog").innerHTML = "Incorrect username or password";
        } else {
            document.querySelector("#logindialog").innerHTML = "There was an error logging in";
        }
    });
    return;
}

function createClicked() {
    const username = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;
    createUser(username, password).then((status) => {
        if (status == 200) {
            document.querySelector("#logindialog").innerHTML = "Registration successful... logging in";
            loginClicked();
        } else if (status == 409) {
            document.querySelector("#logindialog").innerHTML = "Username is already taken";
        } else if (status == 422) {
            document.querySelector("#logindialog").innerHTML = "Password or username is empty";
        } else {
            document.querySelector("#logindialog").innerHTML = "There was an error creating user";
        }
    });
    return;
}