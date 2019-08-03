import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'


class Book extends Component {

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
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
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