function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    
    this.info = function() {
        return(`${title} by ${author}, ${pages} pages, ${readStatus}`);
    }
}

const showBtn = document.getElementById('showForm');
const dialog = document.querySelector('dialog');
const output = document.getElementById('output');
const myLibrary = [];

showBtn.addEventListener('click', () => {
    dialog.showModal();
})

function addBookToLibrary(book) {
    myLibrary.push(book);
    //push book into array library
}

function printBookInfo(book) {
    const div = document.createElement('div');
    div.classList = "bookCard";
    output.appendChild(div);
  
    div.innerHTML += book.info();
}

const addBook = (ev) => {
    ev.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="readStatus"]:checked').value;

    let newBook = new Book(title, author, pages, read);
    
    document.forms[0].reset(); //clear form for next entry

    addBookToLibrary(newBook);
    printBookInfo(newBook);
    console.log(myLibrary)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', addBook);
})
