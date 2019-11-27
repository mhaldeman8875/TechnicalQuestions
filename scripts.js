// Question 1 ------------------------------------------------------------------------------
// create json object
var data = [
  {"id": "0", "name": "Alice", "age": 25, "email": "alicedoe@gmail.com"},
  {"id": "1", "name": "Bob", "age": 37, "email": "BobSaget@gmail.com"},
  {"id": "2", "name": "Carol", "age": 30, "email": "Carol@yahoo.com"}
]
// retrieve 
function getUserListFromDatabase() {
  return data;
}

const users = getUserListFromDatabase();

let message = "Hello, ";
for (let i=0; i<users.length; i++) {
  const name = data[i].name;
  if (i < (users.length-1)) {
    message += name + ", ";
  }
  if (i == (users.length-1)) {
    message += "and " + name + ".";
  }
}
console.log(message);

// Question 2 ------------------------------------------------------------------------------
function handleUserUpdateRequest(userInfo) {
  //create variable for the number of periods in new email as well as user's age
  var num = userInfo.email.match(/\./g).length;
  var age = userInfo.age;
  //send user error alert if age of email format is invalid
  //disable the submit button and reset the form if invalid
  if (age < 0 || age > 200) {
    alert("Please enter a valid age");
    submit.disabled = true;
  } if (num != 1) {
    alert("This address is invalid");
    submit.disabled = true;
  }
}

// use ageInput and emailInput variables to replace {...updateProperties}
function updateUserInfo(userId, ageInput, emailInput) {
    for (var i=0; i<data.length; i++) {
      if (userId == 1) {
        data[1].age = ageInput;
        data[1].email = emailInput;
        break;
      }
    }
}

// Question 3 ------------------------------------------------------------------------------
function handleUserAddRequest(newUserInfo) {
  //create variable for the number of periods in new email
  var num = newUserInfo.email.match(/\./g).length;
  var age = newUserInfo.age;
  //send user error alert if age of email format is invalid
  if (age < 0 || age > 200) {
    alert("Please enter a valid age");
  } if (num != 1) {
    alert("This address is invalid");
  }
}

// create async function that executes a callback after the data object is updated
async function addUserToDatabase(name, age, email, callback) {
  // push input values from form to data object
  data.push({"name": name, "age": age, "email": email});
  console.log(data)
  // execute callback
  callback();
}


// Logic for forms on questions 1 & 2 --------------------------------------------------------
$(document).ready(function(){
  $("#form").submit(function(event){
    //assign variables to user input from form
    var ageInput = parseInt($("#age").val());
    var emailInput = $("#email").val();
    //extract the domain from the new email and assign to new variable
    var domain = ((data[1].email.split("@"))[1]).toUpperCase();
    var email = emailInput.split("@")[0];
    emailInput = email + "@" + domain;
    //create new json object using variables
    var userInfo = {"age": ageInput, "email": emailInput}
    //call the function and pass in userInfo
    handleUserUpdateRequest(userInfo);

    // set userId "id": id
    var userId = data[1].id;
    // var updateProperties = {...userInfo, "domain": domain}
    updateUserInfo(userId, ageInput, emailInput);
    // updateUserInfo(userId, updateProperties);

    console.log(data)
    event.preventDefault();
  });


 // form logic for adding new user (must be async in order to use callback and await)--------------------
  $("#addUser").submit(async function(event){
    var name = $("#name").val();
    var age = parseInt($("#age2").val());
    var email = $("#email2").val();
    // create new json object using variables from above
    var newUserInfo = {"name": name, "age": age, "email": email}
    handleUserAddRequest(newUserInfo);
    // define the callback
    const callback = () => console.log("Hello World");
    // ensure that console log doesnt execute until after the new values are added to the data object
    await addUserToDatabase(name, age, email, callback);
    event.preventDefault();
  });
})
