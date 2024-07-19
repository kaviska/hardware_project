let userSelect = document.getElementById('userSelect');

firebase.database().ref('cart').remove();


const auth = firebase.auth();
const database = firebase.database();

const countElement = document.getElementById("count");
const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");

incrementButton.addEventListener("click", () => {
    let count = parseInt(countElement.textContent);
    countElement.textContent = count + 1;
});

decrementButton.addEventListener("click", () => {
    let count = parseInt(countElement.textContent);
    countElement.textContent = count - 1;
});

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
            const currentUserId = currentUser.uid;
            
            // Fetch current logged-in user's position
            firebase.database().ref('users/' + currentUserId).once('value')
                .then(snapshot => {
                    const currentUserData = snapshot.val();
                    if (currentUserData) {
                        const currentUserPosition = currentUserData.position;
                        
                        // Fetch all users
                        return firebase.database().ref('users').once('value')
                            .then(snapshot => {
                                const users = snapshot.val();
                                if (users) {
                                    userSelect.innerHTML = ''; // Clear existing options
                                    
                                    Object.entries(users).forEach(([userId, user]) => {
                                        if (user.position > currentUserPosition) {
                                            let option = document.createElement('option');
                                            option.text = user.name;
                                            option.value = userId;
                                            userSelect.add(option);
                                        }
                                    });
                                    
                                    console.log('Filtered Users\' Names:', Object.values(users)
                                        .filter(user => user.position > currentUserPosition)
                                        .map(user => user.name));
                                } else {
                                    console.log('No users found.');
                                }
                            });
                    } else {
                        console.log('Logged-in user data not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching current user data:', error);
                });
        } else {
            console.log('No user is logged in.');
        }
    });
});

function getCount() {
    let count = document.getElementById('count').textContent;
    const userId = auth.currentUser.uid; // Replace with the actual userId

    // Generate random id
    let addAutoIncrementId = Math.floor(Math.random() * 1e12).toString().slice(0, 12);

    firebase.database().ref('users/' + userId).once('value')
        .then(snapshot => {
            const position = snapshot.val().position;
            let reciverId = userSelect.value;

            firebase.database().ref('users/' + reciverId).once('value')
                .then(reciverSnapshot => {
                    let reciverPosition = reciverSnapshot.val().position;
 
                    firebase.database().ref('request/' + addAutoIncrementId).set({
                        count: count,
                        senderPosition: position,
                        reciverPosition: reciverPosition,
                        sendrId: userId,
                        reciverId: reciverId,
                        status: "Pending"
                    })
                    sendCart()

                        .then(() => {
                            console.log('Data saved successfully');
                            checkPendingRequests()
                        })
                        .catch(error => {
                            console.error('Error saving data: ', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching receiver data: ', error);
                });
        })
        .catch(error => {
            console.error('Error fetching user data: ', error);
        });
}

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


async function sendCart() {
    // Reference to the Firebase database
    var databaseRef = firebase.database().ref('request');
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
                console.log(requestData.reciverPosition)
                //const pos = requestData.reciverPosition
                const pos = requestData.senderPosition;
                console.log("Sender",pos)



                const esp32Url = 'http://192.168.1.104/line';

                let reciver=requestData.reciverPosition- requestData.senderPosition
                console.log("Reciver",reciver)

                
                fetch(esp32Url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `pos=${encodeURIComponent(pos)}&res=${encodeURIComponent(reciver)}`
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
                        firebase.database().ref('request/' + childSnapshot.key).update({ status: 'Sent' });
                        firebase.database().ref('cart').remove();
                        alert("Request Sent Successfully")

                    })
                    .then(() => {
                        console.log('Request status updated to Sent.');
                    })
        
                    .catch(error => {
                        alert("Something Went Wrong")
                    });

            });
        } else {
            console.log('No pending requests found');
        }
    });
}

setInterval(sendCart, 180000);
