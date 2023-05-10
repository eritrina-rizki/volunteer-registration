// Get data from Session Storage
var firstValue = document.getElementById('invoice-first').innerHTML = sessionStorage.getItem('first');
var lastValue = document.getElementById('invoice-last').innerHTML = sessionStorage.getItem('last');
var selectValue = document.getElementById('invoice-select').innerHTML = sessionStorage.getItem('group');
var dateValue = document.getElementById('invoice-date').innerHTML = sessionStorage.getItem('date');


// Store data from Session Storage to input value
var first = document.querySelector('#invoice-first');
var last = document.querySelector('#invoice-last');
var select = document.querySelector('#invoice-select');
var newSelect = document.querySelector('#select');
var date = document.querySelector('#invoice-date');

first.value = firstValue;
last.value = lastValue;
select.value = selectValue;
newSelect.value = selectValue;
date.value = dateValue;


// Global variables needed to change display when users in editing mode
var edit = document.querySelector('#edit-btn');
var back = document.querySelector('#back-btn');
var savedMessage = document.querySelector('#save-success-message');


// Set the default attribute to display the default interface of invoice page
function defaultAttribute() {
    first.setAttribute('readonly', 'readonly');
    last.setAttribute('readonly', 'readonly');
    select.removeAttribute('hidden');
    select.setAttribute('readonly', 'readonly');
    newSelect.setAttribute('hidden', 'hidden');

    edit.innerText = "Edit Data";
    back.innerText = "Back To Volunteer Page";
    back.href = "./index.html";
}

// Set the new attribute to inputs and change the interface when users in editing mode
function saveAttribute() {
    first.removeAttribute('readonly');
    last.removeAttribute('readonly');
    select.setAttribute('hidden', 'hidden');
    newSelect.removeAttribute('hidden');
    
    first.focus();
    saveClick();
    cancelClick();
    edit.innerText = "Cancel";
    back.innerText = "Save Changes";
    back.href = "";
}


// First name input form validation
function checkFirstName() {
    var alphabet = /^[A-Za-z]+$/;

    if (first.value === "") {
        inputErr(first, 'Please enter your first name');
        first.focus();
        return false
    } else if (!first.value.match(alphabet)) {
        inputErr(first, 'Name is only alphabets without spaces');
        first.focus();
        return false
    } else {
        inputMatch(first);
        return true
    }
}

// Last name input form validation
function checkLastName() {
    var alphabet = /^[A-Za-z]+$/;
    
    if (last.value === "") {
        inputErr(last, 'Please enter your last name');
        last.focus();
        return false
    } else if (!last.value.match(alphabet)) {
        inputErr(last, 'Name is only alphabets without spaces');
        last.focus();
        return false
    } else {
        inputMatch(last);
        return true
    }
}

// Add error class to form input
function inputErr(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'invoice-form-control error'
}

// Set form input to default when there's no error
function inputMatch(input){
    var formControl = input.parentElement;

    formControl.className = 'invoice-form-control'
}


// Check form validation, updated data to Session Storage, and display Data Saved message after click Save Changes button
function formValidation() {
    if ((!checkFirstName()) || (!checkLastName())) {
        return false
    } else {
        newValue();
        savedMessage.style.display = 'block';
        setTimeout(function() {savedMessage.style.display = 'none';}, 3000);
        defaultAttribute();
    } return true
}


// Function to save the updated data in Session Storage and display the data to interface
function newValue() {
    sessionStorage.setItem('first', first.value);
    sessionStorage.setItem('last', last.value);
    sessionStorage.setItem('group', newSelect.value);
    sessionStorage.setItem('date', new Date());

    storeNewValue();
}

// Store the updated data from Session Storage to input value
function storeNewValue() {
    var newFirstValue = sessionStorage.getItem('first')
    var newLastValue = sessionStorage.getItem('last')
    var newSelectValue = sessionStorage.getItem('group')
    var newDateValue = sessionStorage.getItem('date')
    
    first.value = newFirstValue;
    last.value = newLastValue;
    select.value = newSelectValue;
    newSelect.value = newSelectValue;
    date.value = newDateValue;
}


// Function for Save Changes button to display the updated data from Session Storage or just displaying the default when there's no data updated
function saveClick() {
    back.addEventListener('click', (e) => {
        if (back.innerText.toLowerCase() === "save changes") {
            e.preventDefault();
            
            if ((first.value !== firstValue) || (last.value !== lastValue) || (newSelect.value !== selectValue)) {
                checkFirstName();
                checkLastName();
                formValidation();
                return
            } else {
                defaultAttribute();
                return
            }
        } else {
            back.href = './index.html'
        }
    })
}

// Function for Cancel button
function cancelClick() {
    edit.addEventListener('click', () => {
        inputMatch(first);
        inputMatch(last);
        storeNewValue();
    })
}


// Function for Edit Data button for displaying interfaces between editing mode and default interface
edit.addEventListener('click', (e) => {
    e.preventDefault()
    if (edit.innerText.toLowerCase() === "edit data") {
        saveAttribute();
    } else {
        defaultAttribute();
    } return
})