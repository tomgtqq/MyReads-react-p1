import React, {Component} from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookShelf extends Component {
    static propTypes = {
        booksList: PropTypes.array.isRequired,
        onHandleChange: PropTypes.func.isRequired
    }

    updateShelf= (book,shelf) => {
        if(this.props.onHandleChange){
            this.props.onHandleChange(book,shelf)
        }
    }

    render() {
        
        const currentlyReadingList = []
        const wantToReadList = []
        const readList = []

        this.props.booksList.forEach((book) => {
            if (book.shelf === "currentlyReading") {
                currentlyReadingList.push(book)
            } else if (book.shelf === "wantToRead") {
                wantToReadList.push(book)
            } else if (book.shelf === "read") {
                readList.push(book)
            }
        })


        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {currentlyReadingList.length && (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {currentlyReadingList.map((book) => (
                                            <li key={book.id}>
                                                <Book book={book} onUpdateShelf={(movingBook ,shelf)=>{this.updateShelf(movingBook ,shelf)}}/>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}
                        {wantToReadList.length && (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want To Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {wantToReadList.map((book) => (
                                            <li key={book.id}>
                                                <Book book={book} onUpdateShelf={(movingBook ,shelf)=>{this.updateShelf(movingBook ,shelf)}}/>
                                            </li>
                                        ))}

                                    </ol>
                                </div>
                            </div>
                        )}
                        {readList.length && (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {readList.map((book) => (
                                            <li key={book.id}>
                                                <Book book={book} onUpdateShelf={(movingBook ,shelf)=>{this.updateShelf(movingBook ,shelf)}}/>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' >
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default BookShelf