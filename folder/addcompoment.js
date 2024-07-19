const auth = firebase.auth();
const database = firebase.database();

function addCompoment(){
    let position=document.getElementById('position').value;
    let name=document.getElementById('name').value;

    let addAutoIncrementId=Math.floor(Math.random()*1e12).toString().slice(0,12);

    firebase.database().ref('compoment/' + addAutoIncrementId).set({
        name:name,
        number:position,
       
    })
}