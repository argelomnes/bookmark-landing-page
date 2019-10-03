/* Features tab
--------------------------------------------*/
function openTab(evt, tabNumber) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabNumber).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Get the element with id="defaultOpen" and click on it
document.getElementById('defaultOpen').click();

/* FAQ Accordion
--------------------------------------------*/
var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
}

/* Form Validation
--------------------------------------------*/
// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.

var form = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener(
    'input',
    function(event) {
        // Each time the user types something, we check if the
        // email field is valid.
        if (email.validity.valid) {
            // In case there is an error message visible, if the field
            // is valid, we remove the error message.
            error.innerHTML = ''; // Reset the content of the message
            error.className = 'error'; // Reset the visual state of the message
        }
    },
    false
);
form.addEventListener(
    'submit',
    function(event) {
        // Each time the user tries to send the data, we check
        // if the email field is valid.
        if (!email.validity.valid) {
            // If the field is not valid, we display a custom
            // error message.
            error.innerHTML = "Whoops, make sure it's an email";
            error.className = 'error active';
            // And we prevent the form from being sent by canceling the event
            event.preventDefault();
        }
    },
    false
);
