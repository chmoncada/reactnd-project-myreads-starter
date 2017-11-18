export const filterBooksByShelf = (books, shelf) =>
    books.filter(book => book.shelf === shelf);

export const startCase = (string) => {
    var title = string
        .replace(/([A-Z]+)/g, " $1")
        .replace(/([A-Z][a-z])/g, " $1");

    return title[0].toUpperCase() + title.slice(1);
};

