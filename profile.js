function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

  var user = JSON.parse(localStorage.getItem("loggedUser"));
  document.querySelector(".profile_container").innerHTML = `
  <img src="https://th.bing.com/th/id/OIP.egqkfQclhdyhOhF6ZJMedQHaHa?pid=ImgDet&rs=1" />
          <h1>Username: ${user[4]}</h1>
          <h3>Fullname: ${user[1]} ${user[2]}</h3>
          
          <div class="cart_btns">
            <button onclick="deleteUser(${user[0]})">DELETE</button>
            <button onclick="updateUser()">UPDATE</button>
          </div>`;

function deleteUser(id) {
  fetch(
    "https://peaceful-mountain-01759.herokuapp.com/delete-user/"+id+"/"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
        
function updateUser(){
  let container = document.querySelector(".form_update");
  container.style.visibility = "visible"; 
  container.innerHTML =`
  <div class="form">
<div class="tab-content">
  <div class="tab-body active">
    <div class="form-element">
      <input
        class="input"
        type="text"
        name="first_name"
        required
        placeholder="Name"
      />
    </div>
    <div class="form-element">
      <input
        class="input"
        type="text"
        required
        name="last_name"
        placeholder="Surname"
      />
    </div>
    <div class="form-element">
      <input type="text" placeholder="Username" />
    </div>
    <div class="form-element">
      <input
        class="input"
        type="password"
        required
        placeholder="password"
      />
    </div>
    <input type="submit" onclick="updatedUser('${user[0]}')" value="submit" />
`
  var inputs = document.getElementsByTagName("input");
  let i = 1;
      for (index = 0; index < inputs.length-1; ++index) {
        inputs[index].value = user[i];
        i += 1;
      }
}

function updatedUser(id){
  var inputs = document.getElementsByTagName("input");
  let updatedUser = {
    "name" : inputs[0].value,
    "surname" : inputs[1].value,
    "username": inputs[2].value,
    "password": inputs[3].value,
  };
  fetch("https://peaceful-mountain-01759.herokuapp.com/edit-user/" +id+ "/", {
    method: "PUT",
    body: JSON.stringify(updatedUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.content === "successful"){
        let table2 = document.querySelector("form");
        table2.innerHTML = `<h1>${json.description}</h1>
                             <h3>Please refresh the page to see the updated user</h3>`
        var inputs = document.getElementsByTagName("input");
        for (index = 1; index < inputs.length-1; ++index) {
          inputs[index].value = "";
        }
      } else{
        alert("update not successful")
      }
    });
    
}




