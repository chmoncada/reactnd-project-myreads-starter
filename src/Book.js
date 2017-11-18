import React from 'react';
import {PropTypes} from 'prop-types';

const Book = (props) => {
    const {
        id,
        imageLinks: {thumbnail},
        shelf,
        title,
        authors,
        shelves,
        onUpdateBook
    } = props;

    return (
        <div className='book'>
            <div className='book-top'>
                <div className='book-cover'
                     style={{width: 128, height: 193, backgroundImage: `url('${thumbnail}')`}}></div>
                <div className='book-shelf-changer'>
                    <select
                        value={shelf}
                        onChange={(e) => onUpdateBook({id}, e.target.value)}
                    >
                        <option value='none' disabled>Move to...</option>
                        {shelves.map(shelf =>
                            <option key={shelf} value={shelf}>{shelf}</option>
                        )}
                        <option value='none'>None</option>
                    </select>
                </div>
            </div>
            <div className='book-title'>{title}</div>
            <div className='book-authors'>{authors && authors.join(', ')}</div>
        </div>
    )
}

Book.propTypes = {
    info: PropTypes.shape({
        authors: PropTypes.array,
        id: PropTypes.string.isRequired,
        imageLinks: PropTypes.object,
        shelf: PropTypes.string,
        title: PropTypes.string.isRequired
    }),
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Book;