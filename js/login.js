function login() {
    console.log("Logging in!");
    // const username_elem = document.querySelector("#name");
    const username = document.querySelector("#name").value;
    if (username)

    localStorage.setItem("username", username);
    window.location.href = "listings.html";
}