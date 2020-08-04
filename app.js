class Book {
    constructor(title, genre, author, imageLink, read, readDate){
        this.title = title;
        this.genere = genre;
        this.author = author;
        this.imageLink = imageLink;
        this.read = read;
        this.readDate = null;
        
    }

    toHtmlElement(){
        const html = 
        ` 
        <div>
            <h2>${this.title}</h2>
            <img src="${this.imageLink}" alt="">
            <p> Author: ${this.author}</p>
            <p>genere: ${this.genere}</p>
            <p>readDate: ${this.readDate}</p>
        </div>
        `;
        const element = document.createRange().createContextualFragment(html);
        return element;
    }

}

class BookList {
    constructor(booksContainer, summaryContainer){
        this.read = 0;
        this.unread =0;
        this.nextBook = null;
        this.currentBook = null;
        this.lastBook = null;
        this.books =[];
        this.summaryContainer = summaryContainer;
        this.booksContainer = booksContainer;
    
        
    }

    add(book){
        this.books.push(book);
        book.read ? this.read++ : this.unread++;
        if(!this.currentBook && !book.read){
            this.currentBook = book;
        }
        else if (!this.nextBook && !book.read){
            this.nextBook = book;
        }
       this.display();
    }

    finishCurrentBook(){
        if(!this.currentBook){
            return;
        }
        this.currentBook.read = true;
        this.currentBook.readDate = new Date(Date.now());
        this.read++;
        this.unread--;
        this.lastBook = this.currentBook;
        this.currentBook = this.nextBook;


        this.nextBook = this.books.find(book => {
            return !book.read && book.title !== this.currentBook.title;
        });
        this.display();
    }

    display(){
        
        const summaryHtml =`
          <ul>
             <li>Read Count: ${this.read}</li>
             <li>UnRead Count: ${this.unread}</li>
             <li>Current Book: ${this.currentBook ? this.currentBook.title : "none"}</li>
             <li>Next Book: ${this.nextBook ? this.nextBook.title : "none"}</li>
             <li>Last Book: ${this.lastBook ? this.lastBook.title : "none"}</li>
          </ul>`;

          const element = document.createRange().createContextualFragment(summaryHtml);
          this.summaryContainer.innerHTML = "";
          this.summaryContainer.append(element);

          this.booksContainer.innerHTML = "";
          this.books.forEach((book) => {
              this.booksContainer.append(book.toHtmlElement());
          });
    }
}




const book1 = new Book("Norwegian Woods", "Romance", "Haruki Murakami", "./book1.jpg", false)
const book2 = new Book("Like a Bird on wire", "lifestyle", "chhavi Bhardwaj", "./book2.jpg", true)
const book3 = new Book("The Alchemist", "Self Help", "Paulo Coelho", "./book3.jpg", false)
const book4 = new Book("Elon Musk", "Biography", "Ashlee Vence", "./book4.jpg", true)
const book5 = new Book("Revolution 2020", "Romance", "Chetan Bahgat", "./book5.jpg", true)
const book6 = new Book("Nehru and Bose: Parallel Lives", "Biography", "Rudrangshu Mukherje", "./book6.jpg", true)


const booksContainer = document.querySelector(".books");
const summaryContainer =  document.querySelector(".summary");
const booklist = new BookList(summaryContainer, booksContainer);
booklist.add(book1);
booklist.add(book2);
booklist.add(book3);
booklist.add(book4);
booklist.add(book5);
booklist.add(book6);




