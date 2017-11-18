import React from 'react';
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
      books: [],
      shelves: ["Currently Reading", "Want To Read", "Read"]
  }

  componentDidMount() {
      this.getBooks();
  }

  getBooks() {
      BooksAPI.getAll().then(books =>
        this.setState({ books })
      );
  }

  updateBook = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
          this.getBooks();
      });
  }

  render() {
      const {
          books,
          shelves
      } = this.state;

    return(
        <div className='app'>
          <Route exact path='/' render={() => (
              <BookShelves books={books} shelves={shelves} onUpdateBook={this.updateBook}/>
          )}/>
          <Route path='/search' render={() => (
              <SearchBooks categorizedBooks={books} shelves={shelves} onUpdateBook={this.updateBook}/>
          )}/>
        </div>
        )
  }
}

export default BooksApp;
