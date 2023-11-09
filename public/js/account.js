function getDetails() {
    const username_input = document.querySelector("#username");
    const f_name_input = document.querySelector("#f_name");
    const l_name_input = document.querySelector("#l_name");
    const phone_input = document.querySelector("#phone");
    const email_input = document.querySelector("#email");

    // Retrieve the name of the person
    username_input.value = localStorage.getItem("username");
}

function updateSettings() {
    const username_input = document.querySelector("#username");
    const f_name_input = document.querySelector("#f_name");
    const l_name_input = document.querySelector("#l_name");
    const phone_input = document.querySelector("#phone");
    const email_input = document.querySelector("#email");
    const images_input = document.querySelector("#images");

    let new_username = username_input.value
    let new_f_name = f_name_input.value
    let new_l_name = l_name_input.value
    let new_phone = phone_input.value
    let new_email = email_input.value
    let new_images = images_input.value

    // send updated values to server (not sure how yet...)
    return;
}

function generateServiceIdea() {
    const idea_dialog = document.querySelector("serviceIdeaDialog");
    var new_idea = "Rock climbing service"; // retrieve new idea from the web socket
    idea_dialog.value = new_idea;
}

getDetails();