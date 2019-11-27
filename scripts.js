  // Question 1 ------------------------------------------------------------------------------
  var data = [
    {"id": "0", "name": "Alice", "age": 25, "email": "alicedoe@gmail.com"},
    {"id": "1", "name": "Bob", "age": 37, "email": "BobSaget@gmail.com"},
    {"id": "2", "name": "Carol", "age": 30, "email": "Carol@yahoo.com"}
  ]

  function getUserListFromDatabase() {
    return data;
  }

  const users = getUserListFromDatabase();

  let message = "Hello, ";
  for (let i=0; i<data.length; i++) {
    const name = data[i].name;
    if (i < (data.length-1)) {
      message += name + ", ";
    }
    if (i == (data.length-1)) {
      message += "and " + name + ".";
    }
  }


  console.log(message);

// Question 2 ------------------------------------------------------------------------------
function handleUserUpdateRequest(userInfo) {
  //create variable for the number of periods in new email
  var num = userInfo.email.match(/\./g).length;
  var age = userInfo.age;
  //send user error alert if age of email format is invalid
  if (age < 0 || age > 200) {
    alert("Please enter a valid age");
  } if (num != 1) {
    alert("This address is invalid");
  }
}

function updateUserInfo(userId, ageInput, emailInput) {
// function updateUserInfo(userId, {...updateProperties}) {
    for (var i=0; i<data.length; i++) {
      if (userId == 1) {
        data[1].age = ageInput;
        data[1].email = emailInput;
        // data[1].push({...updateProperties});
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

// needs to be async
async function addUserToDatabase(name, age, email, callback) {
  data.push({"name": name, "age": age, "email": email});
  console.log(data)
  callback();
}


// Logic for forms on questions 1-3 --------------------------------------------------------
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

    var userId = data[1].id;
    // var updateProperties = {...userInfo, "domain": domain}
    updateUserInfo(userId, ageInput, emailInput);
    // updateUserInfo(userId, updateProperties);


    console.log(data)

    event.preventDefault();
  });

  $("#addUser").submit(async function(event){
    var name = $("#name").val();
    var age = parseInt($("#age2").val());
    var email = $("#email2").val();

    var newUserInfo = {"name": name, "age": age, "email": email}
    handleUserAddRequest(newUserInfo);

    const callback = () => console.log("Hello World");
    
    await addUserToDatabase(name, age, email, callback);

    event.preventDefault();
  });
})
