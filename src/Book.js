import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'


class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    changeShelf= (shelf) => {
        if(this.props.onUpdateShelf){
            this.props.onUpdateShelf(this.props.book,shelf)
        }
    }

    render() {
        const {book} = this.props
        
            return(
                <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : "url(http://via.placeholder.com/128x193?text=?)"
                    }}>
                    </div>
                    <BookShelfChanger book={book} onChangeShelf={(value)=>{this.changeShelf(value)}}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors + "\n"}</div>
            </div>
            )
    }
}
export default Book