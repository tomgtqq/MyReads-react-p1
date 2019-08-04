import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import BookSearcher from './BookSearcher';

class BooksApp extends React.Component {
  state = {
    booksList:[]
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((booksList)=>{
      console.log(booksList)
      this.setState(()=>({
        booksList
      }))
    })
    .catch((err)=>(
      console.error(err)
      ))
  }

  handleChange = (movingBook, shelf) => {
    if(movingBook){
      BooksAPI.update(movingBook, shelf)
      .then((res) => {
        return BooksAPI.getAll()
      })
      .then((booksList) =>{
        this.setState({
          booksList
        })
      })
      .catch((err)=>(
        console.error(err)
        ))
    }else{
      BooksAPI.getAll()
    .then((booksList)=>{
      console.log(booksList)
      this.setState(()=>({
        booksList
      }))
    })
    .catch((err)=>(
      console.error(err)
      ))
    }
    
}

  render() {
 
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf  
            booksList= { this.state.booksList }
            onHandleChange ={(movingBook,shelf)=>{this.handleChange(movingBook,shelf)}}
            />
        )}/>
        <Route path='/search' render={({history})=>(
          <BookSearcher 
            booksList= { this.state.booksList }
            onHandleChange={(movingBook,shelf)=>{this.handleChange(movingBook,shelf)
            history.push('/')
          }}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
