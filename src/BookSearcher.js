import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


class BookSearcher extends Component {

  static propTypes = {
    booksList: PropTypes.array.isRequired,
    onHandleChange: PropTypes.func.isRequired
}

  state = {
    query: '',
    resultsList:[],
    searchResult:''
  }
  
  updateQuery = (query) => {
      this.setState(() => ({
          query: query
      }))
  }

  searchBooks = () => {
      if(this.state.query){
      BooksAPI.search(this.state.query.trim())
      .then((res)=>{
          if(res.error === "empty query" ){
            this.setState({
                resultsList:[],
                searchResult:"Not Found"
              })
          }
          else{
            const searchList = res

            searchList.forEach((book, i, booksList) => {
              book.shelf = "none"
              booksList[i] = book
            })

            searchList.forEach((book, i, booksList) => {
              this.props.booksList.forEach((myBook) => {
                if (book.id === myBook.id) {
                  book.shelf = myBook.shelf
                }
              })
              booksList[i] = book
            })

            console.log(searchList)
            this.setState({
                resultsList: searchList
              }) 
          }
      })
      .catch((err)=>(
        console.error(err)
        ))
      }else {
        this.setState({
          resultsList:[],
          searchResult:""
        })
      }
  }

  updateShelf = (book,shelf) => {
    if(this.props.onHandleChange){
        this.props.onHandleChange(book,shelf)
    }
}

  render() {
    const {onHandleChange} = this.props
    const {query, resultsList, searchResult} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => onHandleChange()}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <input 
                type="text" 
                placeholder="Search by title or author" 
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        this.searchBooks()
                    }
                  }}
            />

          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
            {resultsList.length === 0
            ?   <li>
                    <h1>{searchResult}</h1> 
                </li>
            : resultsList.map((book) => (
                <li key={book.id}>
                    <Book book={book} onUpdateShelf={(movingBook ,shelf)=>{this.updateShelf(movingBook ,shelf)}}/>
                </li>
            ))}
        </ol>
        </div>
      </div>
    )
  }
}
export default BookSearcher