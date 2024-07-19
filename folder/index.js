const auth = firebase.auth();
const database = firebase.database();

console.log(database)




//database.ref('component').once('value')
//.then((snapshot) => {
//  if (snapshot.exists()) {
//    console.log(snapshot.val().data);
//  } else {
//    console.log('Data does not exist');
//  }
//})
//.catch((error) => {
//  console.error('Error reading data: ', error);
//});

    document.getElementById('signInBtn').addEventListener('click', (event) => {
        console.log('Sign in button clicked');
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User signed in: ', userCredential.user);
                // Redirect to the home page
                window.location = 'home.html';
             
            })
            .catch((error) => {
                console.log('Error during sign-in: ', error);
                alert(error.message);
               
            });
    });


   