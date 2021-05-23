(function ($){

    "use strict"

    //Type initiate

    if($('.typed-text-output').length == 1){
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings:typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace:false,
            loop:true
        })
    }
})(jQuery);

const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message'); 

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText === 'success'){
            alert('Email has been succesfully sent');
            name.value = '';
            email.value ='';
            subject.value ='';
            message.value ='';
        } else {
            alert('Email sent succesfully');
        }
    }
    
    xhr.send(JSON.stringify(formData));
})