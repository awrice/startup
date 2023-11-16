function assembleValues() {
    // const title = document.querySelector("#title").value;
    // const location = document.querySelector("#location").value;
    // const description = document.querySelector("#description").value;
    // const rate_amt = document.querySelector("#rate_amt").value;
    // const rate_unit = document.querySelector("#rate_unit").value;
    // const images = document.querySelector("#images").files;

    // console.log(title);
    // console.log(location);
    // console.log(description);
    // console.log(rate_amt);
    // console.log(rate_unit);
    // console.log(images);

    // let formData = new FormData();

    // for (let i = 0; i < images.length; i++) {
    //     formData.append('images', images[i]);
    // }
    // formData.append('name', title);
    // formData.append('description', description);
    // formData.append('location', location);
    // // formData.append('rate', { 'amt': rate_amt, 'unit': rate_unit });
    // formData.append('owner_id', "-1");

    // console.log(formData);

    let formData = new FormData(document.querySelector("#registerServiceForm"));
    return formData;
}

async function registerClicked() {
    const formData = assembleValues();
    // send the listing to the backend
    await registerServiceBackend(formData);
    return;
}

async function setup() {
    let status = await getMe();
    console.log(status);
    if (status != 200) {
        let form_elem = document.querySelector("#registerServiceForm");
        form_elem.innerHTML = "You must login before you can register a serice";
    }
}

setup();