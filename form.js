let tabPanes = document
  .getElementsByClassName("tab-header")[0]
  .getElementsByTagName("div");

for (let i = 0; i < tabPanes.length; i++) {
  tabPanes[i].addEventListener("click", function () {
    document
      .getElementsByClassName("tab-header")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    tabPanes[i].classList.add("active");

    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("tab-body")
      [i].classList.add("active");
  });
}

user = [];
newUser = [];

// ===========================================  LOGIN/SIGNUP PAGE   ==================================================

// GET USER'S USERNAME AND PASSWORD WHEN LOG IN IS CLICKED
function logIn() {
  user = [];
  var inputs = document.getElementsByTagName("input");
  for (index = 4; index < inputs.length; ++index) {
    user.push(inputs[index].value);
  
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user[0] && users[i].password === user[1]) {
      console.log("welcome back");
      break;
    } else {
      console.log("did not find the user");
    }
  }
}


function findUser(){
  fetch("https://peaceful-mountain-01759.herokuapp.com/get-users/", {
    method: "get",
  })
    .then((res) => res.json())
    .then((json) =>{
      let users = json.data ;
    //  console.log(users);
    var inputs = document.getElementsByTagName("input");
    for (index = 4; index < inputs.length; ++index) {
      user.push(inputs[index].value);
    }
    console.log(user[0])
    let login = users.find(logged => {
      return logged[3] == user[1]
    })
    // validateForLogIn(logged);
    if (login.length > 0){
      localStorage.loggedUser = JSON.stringify(login);
      let messageContainer = document.getElementsByClassName("tab-content")[0].getElementsByClassName("tab-body")[1];
    messageContainer.innerHTML = "";
    messageContainer.innerHTML = `<img src="https://i.stack.imgur.com/gqKFh.png">
                                  <a href="/index.html" class="navbar-anchor">HOME</a>`

    } else{
      alert("user was not found");
    }
});
}


// GET NEW USER'S INFO WHEN SIGN UP IS CLICKED
function signUp() {
  let login = [];
  var inputs = document.getElementsByTagName("input");
  for (index = 0; index < inputs.length-2; ++index) {
    login.push(inputs[index].value);
  }
  let newUser = {
    name : inputs[0].value,
    surname : inputs[1].value,
    username: inputs[2].value,
    password: inputs[3].value,
  };
  validateForSignUp(login);
  fetch("https://peaceful-mountain-01759.herokuapp.com/user-registration/", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then((res) => res.json())
  .then((json) =>{
    if (json.message === "success"){
      
      fetch("https://peaceful-mountain-01759.herokuapp.com/get-users/", {
        method: "get",
      })
        .then((res) => res.json())
        .then((json) =>{
          let users = json.data ;
        var inputs = document.getElementsByTagName("input");
        for (index = 0; index < inputs.length-2; ++index) {
          user.push(inputs[index].value);
        }
        console.log(user[0])
        let login = users.find(logged => {
          return logged[3] == user[3]
        })
          
        localStorage.removeItem("loggedUser");
        localStorage.loggedUser = JSON.stringify(login);
        let messageContainer = document.getElementsByClassName("tab-content")[0].getElementsByClassName("active")[0];
        localStorage.removeItem("loggedUser");
        localStorage.loggedUser = JSON.stringify(login);
        messageContainer.innerHTML = "";
        messageContainer.innerHTML = `<img src="https://gojira.its.maine.edu/confluence/download/attachments/110633072/image2020-10-15_11-10-5.png?version=1&modificationDate=1602774607170&api=v2">
                                      <a href="/index.html" class="navbar-anchor">HOME</a>`
      })
    } else{
      alert("Sign up unsuccessful");
    }})
}

// window.onerror = function () {
//   alert("An error occurred.");
// }

 // =============================== Form validation ========================== 
 function validateForSignUp(inputValues) {
  var inputs = document.getElementsByTagName("input");
  if( inputValues[0] == "" ) {
     alert( "Please provide your name!" );
     inputs[0].focus() ;
     return false;
  }
  if( inputValues[1] == "" ) {
     alert( "Please provide your surname!" );
     inputs[1].focus() ;
     return false;
  }
  if( inputValues[2] == "") {
     
     alert( "Please provide your username" );
     inputs[index].focus() ;
     return false;
  }
  if( inputValues[3] == "" ) {
     alert( "Please provide your password" );
     return false;
  }
  return( true );
}


function validateForLogIn(inputValues) {
  var inputs = document.getElementsByTagName("input");
  if( inputValues[4] == "" || isInteger(inputValues[4]) ) {
     alert( "Please provide your name!" );
     inputs[0].focus() ;
     return false;
  }
  if( inputValues[5] == "" || isInteger(inputValues[4])) {
     alert( "Please provide your surname!" );
     inputs[1].focus() ;
     return false;
  }
  
  return( true );
}


// ====================================================================================================================

// function getToken(arrUser) {
//   var inputs = document.getElementsByTagName("input");
//   fetch("https://damp-reef-26653.herokuapp.com/auth", {
//     method: "post",
//     body: JSON.stringify({
//       username: arrUser[],
//       password: inputs[5].value,
//     }),
//   }).then((res) => {
//     console.log(res);
//     res.json();
//     console.log(res["access_token"]);
//     localStorage.setItem("jwt-token", res["access_token"]);
//   });

//   const accessToken = localStorage.getItem("jwt-token");
//   fetch("https://damp-reef-26653.herokuapp.com/get-blogs/", {
//     method: "post",
//     headers: {
//       Authorization: `jwt ${accessToken}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// }

// function getToken(arrUser){
//   fetch("https://peaceful-mountain-01759.herokuapp.com/auth", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username: "jamiec45lake", password: "jamier45" }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       myStorage = window.localStorage;
//       console.log(res["access_token"]);
//       myStorage.setItem("jwt-token", res["access_token"]);

//       fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
//         method: "get",
//       })
//         .then((res) => res.json())
//         .then((json) => console.log(json));
//     });
//   console.log("hello world");
//   }