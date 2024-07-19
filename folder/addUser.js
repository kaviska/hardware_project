



let addUserBtn = document.getElementById('addUserBtn');
addUserBtn.addEventListener('click', () => {
    console.log('td')
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    let eId = document.getElementById('eId').value;
    let name = document.getElementById('name').value;
    let position = document.getElementById('position').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User created successfully with payload-', user);
            alert('User created successfully');

            // Add user data to Realtime Database
            var userId = user.uid;
            firebase.database().ref('users/' + userId).set({
                email: email,
                eId: eId,
                name: name,
                position: position
            });




            // Send email verification
            user.sendEmailVerification().then(() => {
                console.log('Email Verification Sent!');
                alert('Email Verification Sent!');
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error: ', errorCode, errorMessage);
            alert('Error: ' + errorMessage);
        });
})



