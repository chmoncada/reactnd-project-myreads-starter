export const filterBooksByShelf = (books, shelf) =>
    books.filter(book => book.shelf === shelf)