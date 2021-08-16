function toggleNavbar() {
  document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
}

let cart = [];
  let allbooks = [];
function getallBooks(){  
  fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        localStorage.allbooks = JSON.stringify(response.data);
        
      });
      
    }

    getallBooks();


// console.log(allbooks);
// =============== DISPLAYING ALL BOOKS ========================
function createBooks(bookArray) {
  // fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
  //   method: "GET",
  // })
  //   .then((res) => res.json())
  //   .then((response) => {
    
  //     books = response.data;
      // console.log(books);
      bookArray.forEach((book) => {
        let container = document.querySelector(".books_container");
        container.innerHTML += `
          <div class="card">
          <img src="${book[3]}">
          <h5>${book[1]}</h5> 
          <h4> by ${book[2]}</h4>
          <h3>R${book[5]}</h3>
          <a><button class="btn" onclick="addRow('${book[0]}')">Add to cart</button></a>
          <a><button class="btn" onclick="valueToUpdate('${book[0]}')">Update</button></a>
          </div>
        `;
      });
    
}
let booksInfo = JSON.parse(localStorage.getItem("allbooks"));
createBooks(booksInfo);

// ================================= ADDING BOOKS SELECTED TO CART =====================================
function addRow(id) {
  
  let table = document.querySelector("#form_add");
  table.style.display = "none";
  fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      books = response.data;
      // console.log(books);
      let book = books.find((item) => {
        return item[0] == id;
      });
      cart.push(book);
      // console.log(getFromLocalStorage())
      let deleteIcon = document.querySelector(".add_img");
      deleteIcon.innerHTML = "";
      
      let table = document.querySelector("#table_info");
      table.innerHTML = "";
      cart.forEach((cartBooks) => {
        table.innerHTML += `
        
          <tr>
            <td style = "width:500px" >${cartBooks[1]}</td>
            <td style = "width:80px">R${cartBooks[5]}</td>
            <td style = "width:80px"contenteditable="true">${1}</td>
            <i onclick="removeFromCart('${cartBooks[0]}')" style = "width:50px;height:40px;border-radius:0" class="fas fa-trash-alt"></i>
          </tr>`;
      });
      let totalPrice = cart.reduce((total, book) => total + book[5], 0);
      let price = document.querySelector(".cost_details");
        price.querySelector("h1").textContent =`TOTAL PRICE: R${totalPrice}`;
        localStorageCart(cart);
    });
}

// ========================================== LOCAL STORAGE ==========================================
function localStorageCart(array) {
  cartArray = JSON.stringify(array);
  window.localStorage.setItem("bookCart", cartArray);
}

function getFromLocalStorage() {
  let list = localStorage.getItem("bookCart");
  cartList = JSON.parse(list);
  return cartList;
}

// =============================================================================================

// function filterBook() {
//   let filterValue = document.getElementById("filter").value;
//   console.log(allbooks[0][2])

//   let filteredBooks = allbooks.filter(book => {
//     return book[2].toLowerCase().includes(filterValue.toLowerCase())
//   })
//   console.log(filteredBooks);

// }

function filterBooks() {
  let filtered = [];
  let input, filter, a, i, title;
  input = document.getElementById("filter");
  filter = input.value.toLowerCase();
  for (i = 0; i < booksInfo.length; i++) {
      a = booksInfo[i];
      title = a[1];
      if (title.toLowerCase().indexOf(filter) > -1) {
        filtered.push(booksInfo[i]);
  }}
  if (filtered.length > 0){
    let container = document.querySelector(".books_container");
    container.innerHTML = ""
    createBooks(filtered)
  }
}



// ============================= CREATE DELETE UPDATE BOOKS =================================

// =================== CANCEL OREDER =====================
function cancelOrder() {
  cart = [];
  let table = document.querySelector("#table_info");
  table.innerHTML = "";
  let addIcon = document.querySelector(".add_img");
  addIcon.innerHTML = `
    <i class="fas fa-cart-plus"></i>
 `;
 let price = document.querySelector(".cost_details");
        price.querySelector("h1").textContent =`TOTAL PRICE: R0.00`;
     
}

// ===================== SEND ORDER ========================
function sendOrder() {
  cart = [];
  let table = document.querySelector("#table_info");
  table.innerHTML = "";
  let addIcon = document.querySelector(".add_img");
  addIcon.innerHTML = `
    <img src=https://cdn.dribbble.com/users/458522/screenshots/14007167/media/214f6fa81fbd40f3b65b2cb747393226.png?compress=1&resize=400x300>
 `;
  fetch(
    "https://peaceful-mountain-01759.herokuapp.com/add-transaction/3/34382077656f6265/",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((response) => {
      books = response.data;
    });
    let price = document.querySelector(".cost_details");
        price.querySelector("h1").textContent =`TOTAL PRICE: R0.00`;
      
}


// ======================= REMOVE FROM CART ================================

function removeFromCart(id) {
  let cartList = JSON.parse(localStorage.getItem("bookCart"));
  let index = cartList.indexOf(id);
  cartList.splice(index, 1);
  cart.splice(index, 1);
  localStorage.removeItem("bookCart");
  
  localStorage.bookCart = JSON.stringify(cartList)
  let table = document.querySelector("#table_info");
  table.innerHTML = "";
  console.log(cartList)
  cartList.forEach((cartBooks) => {
    table.innerHTML += `
    
      <tr>
        <td style = "width:500px" >${cartBooks[1]}</td>
        <td style = "width:80px">R${cartBooks[5]}</td>
        <td style = "width:80px"contenteditable="true">${1}</td>
        <i onclick="removeFromCart('${cartBooks[0]}')" style = "width:50px;height:40px;border-radius:0" class="fas fa-trash-alt"></i>
      </tr>`;
 
      });
      let totalPrice = cartList.reduce((total, book) => total + book[5], 0);
      let price = document.querySelector(".cost_details");
        price.querySelector("h1").textContent =`TOTAL PRICE: R${totalPrice}`;
}

// function removeItem(e) {
//   if (e.target.classList.contains("delete")) {
//     if (confirm("Are You Sure?")) {
//       var li = e.target.parentElement;
//       console.log(li);
//       itemList.removeChild(li);
//     }
//   }
// }

// ============================================ CREATE BOOKS =============================================

// function addNewBook() {
//   fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: localStorage.getItem("newbookInfo"),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }

// ========================================= UPDATE BOOKS ================================================

function valueToUpdate(id) {
  let deleteIcon = document.querySelector(".add_img");
      deleteIcon.innerHTML = "";
  addBooks();
  fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      books = response.data;
      let book = books.find((item) => {
        return item[0] == id;
      });
      let entries = document.getElementsByTagName("input");
      let i = 0;
      for (index = 1; index < entries.length - 1; ++index) {
        entries[index].value = book[i];
        i += 1;
      }
    });
}

function updateBook() {
  let user = [];
  let info = {};
  let valuesList = document.getElementById("form_add");
  for (index = 0; index < valuesList.length; ++index) {
    user.push(valuesList[index].value);
  }
  info["isbn"] = user[0].toString();
  info["title"] = user[1];
  info["author"] = user[2];
  info["genre"] = user[6];
  info["reviews"] = user[4];
  info["image"] = user[3];
  info["price"] = user[5].toString();
  newbookArray = JSON.stringify(info);
  window.localStorage.setItem("updatedbook", newbookArray);
  console.log(window.localStorage.getItem("updatedbook"))
  fetch("https://peaceful-mountain-01759.herokuapp.com/edit-book/" + info["isbn"] + "/", {
    method: "PUT",
    body: window.localStorage.getItem("updatedbook"),
    headers: {
      // "Access-Control-Allow-Headers":"Access-Control-Allow-Methods,Content-type",
      // "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,PATCH,HEAD,DELETE,GET",
      // "Access-Control-Allow-Origin" :"http://127.0.0.1:5501",
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
    for (index = 1; index < valuesList.length; ++index) {
      valuesList[index].value = "";
    }
}

// ================================== ADD BOOKS ===================================

function addBooks() {
  let deleteIcon = document.querySelector(".add_img");
      deleteIcon.innerHTML = "";
  let table = document.querySelector("#form_add");
  let table2 = document.querySelector("#table_info");
  table2.innerHTML = "";
  table.style.display = "table";
}

function getValues() {
  let user = [];
  let info = {};
  let valuesList = document.getElementById("form_add");
  for (index = 1; index < valuesList.length; ++index) {
    user.push(valuesList[index].value);
  }
  info["title"] = user[0];
  info["author"] = user[1];
  info["genre"] = user[2];
  info["reviews"] = user[4];
  info["image"] = user[5];
  info["price"] = user[3];
  newbookArray = JSON.stringify(info);
  window.localStorage.setItem("newbookInfo", newbookArray);
  fetch("https://peaceful-mountain-01759.herokuapp.com/add-new-books/", {
    method: "POST",
    body: window.localStorage.getItem("newbookInfo"),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.description == "Book added succesfully"){
        let table = document.querySelector("#form_add");
        table.style.display = "none";
        let table2 = document.querySelector("#table_info");
        table2.innerHTML = `<h1>${json.description}</h1>
                             <h3>Please refresh the page to see the added book</h3>`
        for (index = 1; index < valuesList.length; ++index) {
          valuesList[index].value = "";
        }
      } else{
        alert("book not successfully added")
      }
    });
  
  
}

// ================================= DELETE BOOK ============================

function deleteBook() {
  let valuesList = document.getElementById("form_add");
  id = valuesList[0].value;
  console.log(id);
  fetch(
    "https://peaceful-mountain-01759.herokuapp.com/delete-post/"+id+"/"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
