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


function pageNaN() {
    let warningMessage = document.getElementById("pageInvalid");
    warningMessage.innerHTML = "Pages need to be reported as a number.";
}

function missingError(element, field) {
    let warningMessage = document.getElementById(element);
    warningMessage.innerHTML = `Please fill out ${field} field.`;
}

function missingReadStatus() {
    let warningMessage = document.getElementById("readInvalid");
    warningMessage.innerHTML = `Please select one of the following:`;
}

function displayError() {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let readStatus = document.querySelector("input[name=readStatus]:checked")
    
    if (title.validity.valueMissing) {
        missingError("titleInvalid", "title");
    } else {
        document.getElementById("titleInvalid").innerHTML = "";
    }

    if (author.validity.valueMissing) {
        missingError("authorInvalid", "author");
    } else {
        document.getElementById("authorInvalid").innerHTML = "";
    }

    if (pages.validity.typeMismatch) {
        pageNaN();
    } else if (pages.validity.valueMissing) {
        missingError("pageInvalid", "page");
    } else {
        document.getElementById("pageInvalid").innerHTML = "";
    }

    if(readStatus == null) {
        missingReadStatus();
    } else {
        document.getElementById("readInvalid").innerHTML = "";
    }
}

function handleError(title, author, pages, readStatus) {
    if(title.checkValidity() === false ||
    author.checkValidity() === false ||
    pages.checkValidity() === false||
    readStatus.checkValidity() === false) {
        displayError();
    }
}

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
        
        switch(readStatusBtn.innerHTML) {
            case ('Read'):
                readStatusBtn.style = "color:green";
            break;
            case ('Not Read'):
                readStatusBtn.style = "color:red";
            break;
        }
}

function clearError(element) {
    element.innerHTML = "";
}

function clearAllErrors() {
    const titleInput = document.getElementById('titleInvalid');
    const authorInput = document.getElementById('authorInvalid');
    const pagesInput = document.getElementById('pageInvalid');
    let readInput = document.getElementById('readInvalid');

    clearError(titleInput);
    clearError(authorInput);
    clearError(pagesInput);
    clearError(readInput);  
}
        
const handleSubmitBtn = (ev) => {
    ev.preventDefault();
            
    const titleContainer = createPara();
    const authorContainer = createPara();
    const pagesContainer = createPara();
    const readStatusBtn = createPara();
    const deleteBtn = document.createElement('button');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let readStatus = document.querySelector('input[name="readStatus"]').value;
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    let readStatusInput = document.querySelector('input[name="readStatus"]');
            
    let newBook = new Book(title, author, pages, readStatus);

    handleError(titleInput, authorInput, pagesInput, readStatusInput);
     
    if(titleInput.checkValidity() === true &&
    authorInput.checkValidity() === true &&
    pagesInput.checkValidity() === true &&
    readStatusInput.checkValidity() === true) {
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
    
        readStatusBtn.addEventListener("click", () => {
            switch(readStatus) {
                case ("Read"):
                    readStatus = "Not Read";
                    readStatusBtn.style = "color:red";
                    readStatusBtn.innerHTML = "Not Read";
                    break;
                case ("Not Read"):
                    readStatus = "Read";
                    readStatusBtn.style = "color:green";
                    readStatusBtn.innerHTML = "Read";
                    break;
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

        clearAllErrors();
        dialog.close();
    }    
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', handleSubmitBtn);
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

const cancelBtn = document.getElementById('cancel');
cancelBtn.addEventListener("click", () => {
    clearAllErrors();
})