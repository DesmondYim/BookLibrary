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
const gridContainer = document.getElementById('gridContainer');
const myLibrary = [];

showBtn.addEventListener('click', () => {
    dialog.showModal();
})

function addBookToLibrary(book) {
    myLibrary.push(book);
    //push book into array library
}

function createPara() {
    return (document.createElement('p'));
}

function addIndexClass(element, bookClass) {
    return (element.classList = bookClass);
}

function appendBookToLibrary(titleContainer, authorContainer, pagesContainer,
    readStatusContainer, deleteBtn){
        function appendEle(element) {
            return (gridContainer.appendChild(element));
        }
        
        appendEle(titleContainer);
        appendEle(authorContainer);
        appendEle(pagesContainer);
        appendEle(readStatusContainer);
        appendEle(deleteBtn);
}
    
function printBookInfo(book, titleContainer, authorContainer, pagesContainer,
    readStatusContainer) {
        titleContainer.innerHTML += book.title;
        authorContainer.innerHTML += book.author;
        pagesContainer.innerHTML += book.pages;
        readStatusContainer.innerHTML += book.readStatus;
}
        
const submit = (ev) => {
    ev.preventDefault();
            
    const titleContainer = createPara();
    const authorContainer = createPara();
    const pagesContainer = createPara();
    const readStatusContainer = createPara();
    const deleteBtn = document.createElement('button');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="readStatus"]:checked').value;
            
    let newBook = new Book(title, author, pages, read);
            
    addBookToLibrary(newBook);
    const bookIndex = myLibrary.indexOf(newBook);
    const bookClass = "book" + Number(bookIndex);

    addIndexClass(titleContainer, bookClass);
    addIndexClass(authorContainer, bookClass);
    addIndexClass(pagesContainer, bookClass);
    addIndexClass(readStatusContainer, bookClass)
    readStatusContainer.classList.add('readStatus');
    addIndexClass(deleteBtn, bookClass);
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = "Delete";
    
    appendBookToLibrary(titleContainer, authorContainer, pagesContainer,
        readStatusContainer, deleteBtn);
    
    document.forms[0].reset(); //clear form for next entry

    printBookInfo(newBook, titleContainer, authorContainer, pagesContainer, readStatusContainer);
    
    
    deleteBtn.addEventListener("click", () => {
        const bookElements = document.getElementsByClassName(bookClass);
        function removeElements() {
            for (i = 0; i < 5; i++) {
            gridContainer.removeChild(bookElements[0]);
            }
        }

        removeElements();
    })

    dialog.close();  
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', submit);
})

dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close()
    };
})
