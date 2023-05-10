// Import the form and inputs id
var forms = document.getElementById('form');
var firstName = document.getElementById('first-name');
var lastName = document.getElementById('last-name');


// First name input form validation
function checkFirstName() {
    var firstValue = firstName.value;
    var alphabet = /^[A-Za-z]+$/;

    if (firstValue === "") {
        inputErr(firstName, 'Please enter your first name');
        firstName.focus();
        return false;
    } else if (!firstValue.match(alphabet)) {
        inputErr(firstName, 'First name must be only alphabets without spaces');
        firstName.focus();
        return false;
    } else {
        inputMatch(firstName);
        return true;
    }
}

// Last name input form validation
function checkLastName() {
    var lastValue = lastName.value;
    var alphabet = /^[A-Za-z]+$/;
    
    if (lastValue === "") {
        inputErr(lastName, 'Please enter your last name');
        lastName.focus();
        return false;
    } else if (!lastValue.match(alphabet)) {
        inputErr(lastName, 'Last name must be only alphabets without spaces');
        lastName.focus();
        return false;
    } else {
        inputMatch(lastName);
        return true;
    }
}

// Add error class to form input
function inputErr(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'form-control error';
}

// Set form input to default when there's no error
function inputMatch(input) {
    var formControl = input.parentElement;

    formControl.className = 'form-control';
}


// Direct the form to the Success Page after submitted
function submitSuccess() {
    if ((!checkFirstName()) || (!checkLastName()) ) {
        return false;
    } else {
        saveValue();
        window.location.href = "success.html";
    }
}


// Save data value to Session Storage
function saveValue() {
    var first = document.forms['form']['first'].value;
    var last = document.forms['form']['last'].value;
    var select = document.forms['form']['select'].value;

    sessionStorage.setItem('first', first);
    sessionStorage.setItem('last', last);
    sessionStorage.setItem('group', select);
    sessionStorage.setItem('date', new Date());
}


// Form submit
forms.addEventListener('submit', (e) => {
    e.preventDefault();
    checkFirstName();
    checkLastName();
    submitSuccess();
});