function login() {
    console.log("Logging in!");
    const username = document.querySelector("#name").value;
    localStorage.setItem("username", username);
    window.location.href = "listings.html";
}