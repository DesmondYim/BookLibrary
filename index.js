function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    
    this.info = function() {
        console.log(`${title} by ${author}, ${pages} pages, ${readStatus}`);
    }
}

