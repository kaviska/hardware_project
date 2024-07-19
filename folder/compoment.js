const auth = firebase.auth();
const database = firebase.database();

let comSelect=document.getElementById('comSelect');

document.addEventListener('DOMContentLoaded',()=>{
    database.ref('compoment').once('value')
    .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let option = document.createElement('option');
            console.log(childSnapshot.key);  // Log the key of the childSnapshot

            option.text = childSnapshot.val().name;  // Assuming 'name' is a property of the childSnapshot
            option.value = childSnapshot.val().number;
            console.log(option.value);
            comSelect.add(option);
        });
    });


})

document.getElementById('requestBtn').addEventListener('click', () => {
    console.log(comSelect.value);

    // Generate a unique ID
    const uniqueId = Math.floor(Math.random() * 1e12).toString().slice(0, 12);
    const userId = auth.currentUser.uid;

    // Use the unique ID in the database reference
    firebase.database().ref('users/' + userId).once('value')
    .then(snapshot => {
        const position = snapshot.val().position;

        // Use the unique ID in the database reference
        firebase.database().ref('requestComponent/' + uniqueId).set({
            component: comSelect.value,
            status: 'Pending',
            userId: userId,
            position: position
        });
        sendComponent()
        console.log('success')
    })
    .catch(error => {
        console.error('Error fetching user position: ', error);
        alert('Error fetching user position: ' + error.message);
    });
});
 

console.log(database)

async function checkCartPosition() {
    const snapshot = await firebase.database().ref('cart').once('value');
    if (snapshot.exists()) {
        console.log('true');
        return 1;
    } else {
        console.log('false');
        return 0;
    }
}



async function sendComponent() {
     // Reference to the Firebase database
     var databaseRef = firebase.database().ref('requestComponent');
     console.log(databaseRef)
     checkCartPosition().then(function(cartPosition) {
        if (cartPosition == 0) {
            alert("Cart is Not Available, Your Request will be added to the list");
            return;
        }
        // Proceed with sending the component
    });
 
     // Query to get the first pending request
     databaseRef.orderByChild('status').equalTo('Pending').limitToFirst(1).once('value', function (snapshot) {
         if (snapshot.exists()) {
             snapshot.forEach(function (childSnapshot) {
                 var requestData = childSnapshot.val();
                 console.log('First pending request:', requestData);
                 //console.log(requestData.reciverPosition)

              
                 //const pos = requestData.reciverPosition
                 const pos = requestData.position;
                 console.log("Position",pos)
                
 
 
 
                 const esp32Url = 'http://192.168.1.104';
 
                 let motorNumber=requestData.component
                 console.log("Motor Number",motorNumber)
                 console.log(motorNumber)

               

                 
                 fetch(esp32Url, {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                     },
                     body: `pos=${encodeURIComponent(pos)}&motorNumber=${encodeURIComponent(motorNumber)}`
                 })
                     .then(response => {
                         if (!response.ok) {
                             throw new Error('Network response was not ok');
                         }
                         return response.json();
                     })
                     .then(data => {
                         console.log('Data sent to ESP32 successfully:', data);
                         // Change that request status into success
                         firebase.database().ref('requestComponent/' + childSnapshot.key).update({ status: 'Sent' });
                         firebase.database().ref('/cart').remove();
                         alert("Your Request is Sent to the Cart")
 
                     })
                     .then(() => {
                         console.log('Request status updated to Sent.');
                     })
         
                     .catch(error => {
                         alert("Something Went wrong")
                     });
 
             });
         } else {
             console.log('No pending requests found');
         }
     });
}


setInterval(sendComponent, 180000);


//sendComponent();

    // firebase.database().ref('compoments/').set({
    //     1:'button',
    //     2:'cloth',
    //     3:'needle',
    //     4:'bal',

        
    // });

