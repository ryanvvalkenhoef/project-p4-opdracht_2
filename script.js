var errors = [];
// - HTML elements
const feedbackEl = document.getElementById('invalid-feedback');
const loginForm = document.getElementById('login-form');
const emailUname = document.getElementById('email');
const password = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

// - Event listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkErrors();
});
togglePassword.addEventListener('click', function (e) {
    // Toggle the type attribute of the input field
    const type = (password.getAttribute('type') === 'password') ? 'text' : 'password';
    password.setAttribute('type', type);
    // Toggle eye icon
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
    // Toggle again after 8 seconds
    if (!this.classList.contains('fa-eye-slash')) {
        setTimeout(function() {
            e.target.dispatchEvent(e);
        }, 8000);
    }
});

// - Functions
function checkErrors() {
    const emailUnameVal = emailUname.value.trim();
    const passwordVal = password.value.trim(); {
        // Error handling and validation
        if (emailUnameVal !== "" || passwordVal !== "") {
            // Username/email empty
            if (emailUnameVal === "") errors.push(1);
            // Password empty
            if (passwordVal === "") errors.push(2);
        } else if (emailUnameVal === "" && passwordVal === "") {
            // Both values empty
            errors.push(0);
        }
        // Validate values
        const regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; {
            if(emailUnameVal && !regexp.test(emailUnameVal) 
                && emailUnameVal.includes('@')) {
                    // Validate email
                    errors.push(3);
            } else {
                // Validate username
                if (emailUnameVal && emailUnameVal.length < 10) errors.push(4)
            }
        }
        const passRegexp = /^[A-Za-z]\w{7,14}$/; {
            // Validate password
            if (passwordVal && !passRegexp.test(passwordVal)) {
                errors.push(5);
            }
        }
    }
    if (errors.length == 0) { // Login
        const urlBase = location.href.substring(0, location.href.lastIndexOf("/")+1)
        window.open(urlBase + "logged_in.html", "_self");
    } else {
        // Return invalid feedback
        setFeedbackMessage();
    }
}

function setFeedbackMessage() {
    // Hide or show invalid feedback based on whether errors is empty
    feedbackEl.style.display = (errors.length > 0) ? "block" : "none";
    // Set feedback if nothing is filled in, or if there are multiple errors
    if (errors.includes(0)) {
        feedbackEl.innerHTML = 'Voer alstublieft een gebruikersnaam of e-mailadres in';
    } else {
        feedbackEl.innerHTML = '<b>De volgende fouten hebben zich voorgedaan:</b><br />';
        for (const err of errors) invalidFeedback(err); // Set invalid feedback
    }
    errors = [];
}

function invalidFeedback(err) {
    switch (err) {
        case 1:
            feedbackEl.innerHTML += '○ Er is geen gebruikersnaam of e-mailadres ingevoerd<br />';
            break;
        case 2:
            feedbackEl.innerHTML += '○ Er is geen wachtwoord ingevoerd<br />';
            break;
        case 3:
            feedbackEl.innerHTML += '○ Het opgegeven e-mailadres is niet geldig<br />';
            break;
        case 4:
            feedbackEl.innerHTML += '○ Een gebruikersnaam moet minstens 10 tekens bevatten<br />'
            break;
        case 5:
            feedbackEl.innerHTML += '○ Uw wachtwoord moet 7-16 tekens bevatten, met het eerste teken een letter, en enkel cijfers en underscores zijn toegestaan.<br />'
            break;
    }
}