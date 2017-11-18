import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BookAPI from './BooksAPI';
import BookShelf from "./BookShelf";

const  ERROR_EMPTY_QUERY = 'empty query';

const addShelfToBooks = (categorizedBooks, uncategorizedBooks) => {
    const shelfLookup =
        categorizedBooks.reduce((acc, book) => ({ ...acc, [book.id]: book.shelf }), {});
    return uncategorizedBooks.map(book => ({ ...book, shelf: shelfLookup[book.id] }));
};

class SearchBooks extends Component {

    state = {
        query: '',
        error: '',
        maxResults: 20,
        books: []
    }

    static propTypes = {
        categorizedBooks: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    searchBooks(query) {
        this.setState({ query, error: '' });

        if(query.length < 1) {
            this.setState({ books: [] });
            return;
        }

        BookAPI.search(query, 20).then(books => {
            if (Array.isArray(books)) {
                this.setState({ books });
                return;
            }

            switch(books.error) {
                case ERROR_EMPTY_QUERY:
                    this.setState({ error: "No books found." });
                    break;
                default:
                    this.setState({ error: books.error });
            }
        });
    }

    render() {
        const { books, error, query } = this.state;
        const { categorizedBooks, shelves, onUpdateBook } = this.props;
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(e) => this.searchBooks(e.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    {error !== '' ? (<h2>{error}</h2>) : (
                    <BookShelf
                        books={addShelfToBooks(categorizedBooks, books)}
                        shelves={shelves}
                        onUpdateBook={onUpdateBook}
                    />
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBooks;