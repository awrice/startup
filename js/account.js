function getDetails() {
    console.log("Details");
    const username_input = document.querySelector("#username");
    const f_name_input = document.querySelector("#f_name");
    const l_name_input = document.querySelector("#l_name");
    const phone_input = document.querySelector("#phone");
    const email_input = document.querySelector("#email");

    // Retrieve the name of the person
    username_input.value = localStorage.getItem("username");
}

getDetails();