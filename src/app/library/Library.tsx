import React from 'react'
import { useStore } from 'zustand'
import { BookInterface } from '@/lib/books'



const Library = async () => {
  const books: BookInterface[] | Error = await fetch('https://localhost:3001/fetchUserBooks')
                                          .then((response) => response.json())
                                          .catch((error) => error);


  return (
    <>
      <div>
        {Array.isArray(books) ? (
          <ul className='flex'>
            {books.map((book: BookInterface) => {
              return (
                <li key={book.id}>
                    
                </li>
              )
            })}
          </ul>
        ) : <>Loading...</>}
      </div>
    </>
  )
}

export default Library;