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
    readStatusBtn, deleteBtn){
        function appendEle(element) {
            return (gridContainer.appendChild(element));
        }
        
        appendEle(titleContainer);
        appendEle(authorContainer);
        appendEle(pagesContainer);
        appendEle(readStatusBtn);
        appendEle(deleteBtn);
}


    
function printBookInfo(book, titleContainer, authorContainer, pagesContainer,
    readStatusBtn) {
        titleContainer.innerHTML += book.title;
        authorContainer.innerHTML += book.author;
        pagesContainer.innerHTML += book.pages;
        readStatusBtn.innerHTML += book.readStatus;
}
        
const submit = (ev) => {
    ev.preventDefault();
            
    const titleContainer = createPara();
    const authorContainer = createPara();
    const pagesContainer = createPara();
    const readStatusBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let readStatus = document.querySelector('input[name="readStatus"]:checked').value;
            
    let newBook = new Book(title, author, pages, readStatus);
            
    addBookToLibrary(newBook);
    const bookIndex = myLibrary.indexOf(newBook);
    const bookClass = "book" + Number(bookIndex);

    addIndexClass(titleContainer, bookClass);
    addIndexClass(authorContainer, bookClass);
    addIndexClass(pagesContainer, bookClass);
    addIndexClass(readStatusBtn, bookClass)
    readStatusBtn.classList.add('readStatus');
    addIndexClass(deleteBtn, bookClass);
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = "Delete";
    
    appendBookToLibrary(titleContainer, authorContainer, pagesContainer, readStatusBtn, deleteBtn);
        
    document.forms[0].reset(); //clear form for next entry
        
    printBookInfo(newBook, titleContainer, authorContainer, pagesContainer, readStatusBtn);
    
    // handleReadClick();

    readStatusBtn.addEventListener("click", () => {
        switch(readStatus) {
            case ("Read"):
                readStatus = "Not Read";
                readStatusBtn.innerHTML = "Not Read";
                break;
            case ("Not Read"):
                readStatus = "Read";
                readStatusBtn.innerHTML = "Read";
        }
    });

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
