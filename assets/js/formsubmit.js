var firebaseConfig = {
    apiKey: "AIzaSyCKe6VYVduFEvfWmpBn2tudKB6aIzYvg9s",
    authDomain: "contact-form-c204b.firebaseapp.com",
    databaseURL: "https://contact-form-c204b.firebaseio.com",
    projectId: "contact-form-c204b",
    storageBucket: "contact-form-c204b.appspot.com",
    messagingSenderId: "254779170076",
    appId: "1:254779170076:web:15df6f1ee25a4da6c82ed9",
    measurementId: "G-W0LE09YMGF"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messageRef = firebase.database().ref('messages');

document.getElementById('contactform').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getVal('name');
    var email = getVal('email');
    var message = getVal('message');

    saveMessage(name, email, message);

    document.querySelector('.alert').style.display='block';

    setTimeout(function(){
        document.querySelector('.alert').style.display='none';
    }, 4000);
    document.getElementById('contactform').reset();
}

function getVal(id) {
    return document.getElementById(id).value;
}

function saveMessage(name, email, message) {
    var newMessage = messageRef.push();
    newMessage.set({
        name: name,
        email: email,
        message: message
    });
}