function toggleNavbar() {
  document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
}

let cart = [];

function createBooks() {
  fetch("https://peaceful-mountain-01759.herokuapp.com/get-books/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      books = response.data;
      // console.log(books);
      books.forEach((book) => {
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
    });
}

createBooks();

// ================================= ADDING BOOKS SELECTED TO CARTS =====================================
function addRow(id) {
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
      let deleteIcon = document.querySelector(".add_img");
      deleteIcon.innerHTML = "";
      localStorageCart(cart);
      let table = document.querySelector("#table_info");
      table.innerHTML = "";
      cart.forEach((cartBooks) => {
        table.innerHTML += `
        
          <tr>
            <td style = "width:500px" >${cartBooks[1]}</td>
            <td style = "width:80px">R${cartBooks[5]}</td>
            <td style = "width:80px"contenteditable="true">${1}</td>
            <td style = "width:80px><i onclick="removeFromCart('${
              cartBooks[0]
            }')" style = "width:50px;height:40px;border-radius:0" class="fas fa-trash-alt"></i></td>
          </tr>`;
      });
      let totalPrice = cart.reduce((total, book) => total + book[5]);
      // document
      //   .getElementsByClassName("cost_details")
      //   .getElementById("st")[0].textContent = totalPrice;
      // console.log(getFromLocalStorage());
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

function filterBooks(category) {
  fetch(
    "https://google-books.p.rapidapi.com/volumes?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "643dea22c1msh2196402f710b469p1df2fejsn33c91fd47995",
        "x-rapidapi-host": "google-books.p.rapidapi.com",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      books = response.items;
      let books = document.getElementsByClassName("card");
      if (category == "All") {
        for (book of books) {
          card.style.display = "block";
        }
        return;
      }
      for (book of books) {
        card.style.display = "none";
      }

      let selectedCards = document.querySelectorAll(
        `${book.volumeInfo.imageLinks["thumbnail"]}=${category}`
      );

      for (book of selectedCards) {
        book.style.display = "block";
      }
    });
}

// ============================= CREATE DELETE UPDATE BOOKS =================================

// ====================== DELETE BOOKS ===================
// function deleteBooks() {
//   getId();
// let deleteBook = getFromLocalStorage().find((book) => {
//   return book.id == id;
// });
// getFromLocalStorage().indexOf(deleteBook);
// }

// function getId() {
// var table = document.getElementById("table_info"),
//   rIndex,
//   cIndex;

// for (let i = 1; i < table.rows.length; i++) {
//   for (let j = 0; j < table.rows[i].cells.length; j++) {
//     table.rows[i].cells[j].onclick = function () {
//       rIndex = this.parentElement.rowIndex;
//       cIndex = this.cellIndex;
//       // console.log("ROW: " + rIndex + " COLUMN: " + cIndex);
//       let values = table.rows.item(0).cells;
//       console.log(values.item(x).textContent);
//     };
//   }
// }
// }

// =================== CANCEL OREDER =====================
function cancelOrder() {
  let list = localStorage.clear();
  let table = document.querySelector("#table_info");
  table.innerHTML = "";
  let addIcon = document.querySelector(".add_img");
  addIcon.innerHTML = `
    <i class="fas fa-cart-plus"></i>
 `;
}

// ===================== SEND ORDER ========================
function sendOrder() {
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
}
// =======================================================

// let list = localStorage.getItem("bookCart");
// cartList = JSON.parse(list);
// console.log(cartList);

function removeFromCart(id) {
  let list = localStorage.getItem("bookCart");
  cartList = JSON.parse(list);

  let book = cartList.find((item) => {
    return item[0] == id;
  });

  var index = arr.indexOf(book);
  cartList.splice(index, 1);
  let table = document.querySelector("#table_info");
  table.innerHTML = "";
  cartList.forEach((cartBooks) => {
    table.innerHTML += `
    
      <tr>
        <td style = "width:500px" >${cartBooks[1]}</td>
        <td style = "width:80px">R${cartBooks[5]}</td>
        <td style = "width:80px"contenteditable="true">${1}</td>
        <td style = "width:80px><i onclick="removeItem()" style = "width:50px;height:40px;border-radius:0" class="fas fa-trash-alt"></i></td>
      </tr>`;
  });
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      console.log(li);
      itemList.removeChild(li);
    }
  }
}

// ============================================ CREATE BOOKS =============================================

function addNewBook() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: localStorage.getItem("newbookInfo"),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// ========================================= UPDATE BOOKS ================================================

function valueToUpdate(id) {
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

      // });
    });
}

function updateBook() {
  let user = [];
  let info = {};
  let valuesList = document.getElementById("form_add");
  valuesList.innerHTML = `<input type="text" placeholder="isbn" />`;
  for (index = 0; index < valuesList.length; ++index) {
    user.push(valuesList[index].value);
  }
  info["title"] = user[0];
  info["author"] = user[1];
  info["genre"] = user[2];
  info["reviews"] = user[4];
  info["image"] = user[5];
  info["price"] = user[3];
  newbookArray = JSON.stringify(info);
  window.localStorage.setItem("updatedbook", newbookArray);
  fetch("https://peaceful-mountain-01759.herokuapp.com/edit-book/" + id + "/", {
    method: "PUT",
    body: window.localStorage.getItem("updatedbook"),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// ================================== ADD BOOKS ===================================

function addBooks() {
  let table = document.querySelector("#form_add");
  let table2 = document.querySelector("#table_info");
  table2.innerHTML = "";
  table.style.display = "table";
}

function getValues() {
  let user = [];
  let info = {};
  let valuesList = document.getElementById("form_add");
  for (index = 0; index < valuesList.length; ++index) {
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
    .then((json) => console.log(json));
}

// function getUser(id) {
//   fetch("https://peaceful-mountain-01759.herokuapp.com/delete-post/676667667536/", {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       console.log(response.data);
//     });
// }

// getUser(9);

// ================================= DELETE BOOK ============================

// function deleteBook() {
//   fetch(
//     "https://peaceful-mountain-01759.herokuapp.com/delete-post/676667667536/"
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }
