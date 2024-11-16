import React from 'react'
// import { useStore } from 'zustand'
import { BookInterface } from '@/lib/books'
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { books } from "@/lib/books";
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons'



const Library = async () => {
  // const books: BookInterface[] | Error = await fetch('https://localhost:3001/fetchUserBooks')
  //                                         .then((response) => response.json())
  //                                         .catch((error) => error);
  
  return (
    <>
      <div>
        {Array.isArray(books) ? (
          <ul className='flex'>
            {books.map((book: BookInterface) => {
              return (
                <li key={book.id}>
                  <Link href={`${book.id}`}>
                    <Card className="w-[400px]">
                      <CardHeader>
                        <div className='flex justify-between'>
                          <CardTitle>{book.title}</CardTitle>
                          <Pencil1Icon width={50} height={50} />
                        </div>
                        <CardDescription>{book.authorName}</CardDescription>
                      </CardHeader>
                      <CardContent>{book.description}</CardContent>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : <>Loading...</>}
      </div>
    </>
  )
}

export default Library;