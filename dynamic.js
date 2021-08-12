function toggleNavbar() {
  document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
}

let cart = [];

// ================================== DISPLAYING ALL BOOKS =========================================
function createBooks() {
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
    .then((response) => {
      books = response.items;
      // console.log(books);
      books.forEach((book) => {
        let container = document.querySelector(".books_container");
        container.innerHTML += `
          
  
          <div class="card">
          <img src="${book.volumeInfo.imageLinks["thumbnail"]}">
          <h5>${book.volumeInfo["title"]}</h5> 
          <h4> by ${book.volumeInfo["authors"]}</h4>
          <a><button class="btn" onclick="addRow('${book.id}')">Add to cart</button></a>
          </div>
        `;
      });
    });
}

createBooks();

// ================================= ADDING BOOKS SELECTED TO CARTS =====================================
function addRow(id) {
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
    .then((response) => {
      books = response.items;
      let book = books.find((item) => {
        return item.id == id;
      });
      cart.push(book);
      localStorageCart(cart);
      let table = document.querySelector("#table_info");
      // console.log(table[1]);
      table.innerHTML = "";
      cart.forEach((cartBooks) => {
        table.innerHTML += `
        
          <tr>
            <td style = "width:500px" >${cartBooks.volumeInfo["title"]}</td>
            <td style = "width:80px">${
              cartBooks.volumeInfo["pageCount"] * 4
            }</td>
            <td style = "width:80px"contenteditable="true">${1}</td>
          </tr>`;
      });
      let totalPrice = cart.reduce(
        (total, book) => total + book.volumeInfo["pageCount"] * 4
      );
      // document
      //   .getElementsByClassName("cost_details")
      //   .getElementById("st")[0].textContent = totalPrice;
      console.log(getFromLocalStorage());
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

function getBooks() {
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
    .then((response) => response.json())
    .then((data) => {
      let card = document.querySelector(".book_cart");
      card.innerHTML = `<div class="carts_card">
        <div class="book_img">
          <img src="${book.volumeInfo.imageLinks["thumbnail"]}/>
        </div>
        <div class="cart_details">
          <p>${book.volumeInfo["title"]}</p>
          <p>${book.volumeInfo["authors"]}</p>
          <p>${book.volumeInfo["pageCount"] * 7}</p>
        </div>
        <div class="cart_btns">
          <button>DELETE</button>
        </div>carts
      </div>`;
    });
}

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

// ================= ADD BOOKS ================

function addBooks() {
  let table = document.querySelector("table");
  let table2 = document.querySelector("#table_info");
  table2.innerHTML = "";
  table.innerHTML = "";
  table.innerHTML = `
    <table>
      <tr>
        <th>Book Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Price</th>
        <th>Review</th>
        <th>Image</th>
      </tr>
      <tr>
        <td style="width: 500px" contenteditable="true"></td>
        <td style="width: 80px" contenteditable="true"></td>
        <td style="width: 80px" contenteditable="true"></td>
        <td style="width: 500px" contenteditable="true"></td>
        <td style="width: 80px" contenteditable="true"></td>
        <td style="width: 80px" contenteditable="true"></td>
      </tr>
    </table>
    `;
}

// ====================== DELETE BOOKS ===================
// function deleteBooks() {
//   getId();
// let deleteBook = getFromLocalStorage().find((book) => {
//   return book.id == id;
// });
// getFromLocalStorage().indexOf(deleteBook);
// }

// function getId() {
var table = document.getElementById("table_info"),
  rIndex,
  cIndex;

for (let i = 1; i < table.rows.length; i++) {
  for (let j = 0; j < table.rows[i].cells.length; j++) {
    table.rows[i].cells[j].onclick = function () {
      rIndex = this.parentElement.rowIndex;
      cIndex = this.cellIndex;
      // console.log("ROW: " + rIndex + " COLUMN: " + cIndex);
      let values = table.rows.item(0).cells;
      console.log(values.item(x).textContent);
    };
  }
}
// }
