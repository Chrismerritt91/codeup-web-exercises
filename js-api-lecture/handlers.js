import {baseURL, fetchSettings} from "./constants.js";
import {mapButtonsForUpdate, mapUserCreateForm, mapUserToDelete, mapUserToUpdate, mapUserToView} from "./maps.js";


/**
 * References to Modal pieces
 * @type {{all: Element, head: Element, container: Element, main: Element, foot: Element}}
 */
// Modal elements
export const modal = {
    all: document.querySelector("#modal"),
    main: document.querySelector("#modal > main"),
    head: document.querySelector("#modal > header"),
    foot: document.querySelector("#modal > footer"),
    container: document.querySelector("#modal-container") // represents the background
}


// Handles creating the confirmation view to delete
export const handleDeleteView = (event) => {
    console.log("handle Delete")
    toggleModal();

    modal.head.innerHTML = `<h3>Do you wish to delete this User?</h3>`
    modal.main.innerHTML = "<p>If you delete this User its gone forever.</p>"
    modal.foot.innerHTML = mapUserToDelete(event.target.value);

    $("button.confirm").click(handleDoDelete);

};

// Example: delete fetch request
export const handleDoDelete = (event) => {
    event.preventDefault();

    // TODO: Delete User by ID
    // TODO: Hide Modal
    // TODO: Reload form

    let settings = {
        ...fetchSettings,
        method: "DELETE"
    }

    //or
    // let settings = fetchSettings
    // settings.method = "DELETE"

    fetch(baseURL + "/user/" + event.target.value, settings)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            disableModal();
        })

}


// Example: get fetch request
export const handleDisplayProfile = (event) => {
    toggleModal();
    // TODO: Create fetch to get the profile information
    // TODO: Map info to modal in view.

    fetch(baseURL + "/user/" + event.target.dataset.id, fetchSettings)
        .then(res => res.json())
        .then(res => {

            console.log(res);
            modal.main.innerHTML = mapUserToView(res)
            modal.foot.innerHTML = `<button class="close-modal">Close</button>`

            $(".close-modal").click(() => disableModal());
        })

}


// Example: get fetch request
export const handleDisplayUpdate = (event) => {
    enableModal();
    //TODO: Get Data from user by Id
    //TODO: Map to update form
    //TODO: Add handlers

    fetch(baseURL + "/user/" + event.target.value, fetchSettings)
        .then(res => res.json())
        .then(res => {

            modal.main.innerHTML = mapUserToUpdate(res);
            modal.foot.innerHTML = mapButtonsForUpdate(res.id);

            $("button.confirm.update").click(handleDoUpdate);
        })


};


// Example: PUT fetch request
export const handleDoUpdate = (event) => {
    event.preventDefault();

    // TODO: GET form data
    // TODO: Update the user with the new form data.
    // TODO: hide modal.


    const form = document.forms.update;

    let data = {
        id: form.id.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        gender: form.gender.value,
        dateOfBirth: form.dateOfBirth.value,
        phone: form.phone.value,
        picture: form.picture.value
    }

    let settings = {
        ...fetchSettings,
        method: "PUT",
        body: JSON.stringify(data)
    }

    fetch(baseURL + "/user/" + event.target.value, settings)
        .then(res => res.json())
        .then(res => {
            // TODO: use this value to update this field
            disableModal();
        })

}

export const handleCreateUserView = (event) => {
    // TODO: Create form for users to fill out.

    modal.main.innerHTML = mapUserCreateForm();
    modal.foot.innerHTML = mapButtonsForUpdate(0, "create")

    $("button.confirm.create").click(handleDoCreateUser)
    enableModal();
}


// Example: POST request
export const handleDoCreateUser = (event) => {
    event.preventDefault();
    // TODO: Create a new User!
    const form = document.forms.create;

    let data = {
        id: form.id.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        gender: form.gender.value,
        dateOfBirth: form.dateOfBirth.value,
        phone: form.phone.value,
        picture: form.picture.value
    }

    let settings = {
        ...fetchSettings,
        method: "POST",
        body: JSON.stringify(data)
    }

    fetch(baseURL + "/user/create/", settings)
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })

}


// Modal handling
export const toggleModal = () => {
    // show hide modal logic
    modal.container.classList.toggle("hide")
    modal.all.classList.toggle("hide");
}

export const enableModal = () => {
    modal.container.classList.remove("hide")
    modal.all.classList.remove("hide");
}
export const disableModal = () => {
    modal.container.classList.add("hide")
    modal.all.classList.add("hide");
}


