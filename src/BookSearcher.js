import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class BookSearcher extends Component {
  state = {
    query: '',
    resultsList:[],
    searchResult:''
  }
  
  updateQuery = (query) => {
      this.setState(() => ({
          query: query.trim()
      }))
  }

  searchBooks = () => {
      BooksAPI.search(this.state.query)
      .then((res)=>{
          console.log(res)
          if(res.error === "empty query" ){
            this.setState({
                searchResult:"Not Found"
              })
          }
          else{
            let bookList =  res
            bookList.forEach((book)=>{
                book.shelf = "none"
            })
            this.setState({
                resultsList:bookList,
              })
            console.log('====================================');
            console.log(this.state.resultsList);
            console.log('====================================');  
          }
      })
      .catch((err)=>(
        console.error(err)
        ))
  }

  updateShelf = (book,shelf) => {
    if(this.props.onHandleChange){
        this.props.onHandleChange(book,shelf)
    }
}

  render() {
    const {onHandleChange} = this.props
    const {query,resultsList,searchResult} = this.state

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