"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { bookStore } from "@/app/store/zustand";
import { BookInterface } from "@/lib/books";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { Button } from "@/components/ui/button";
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const BookPage = () => {
  const pathname = usePathname();
  const books = bookStore((state) => state.books);

  const [bookToShow, setBookToShow] = useState<BookInterface | null>(null);
  const [bookContent, setBookContent] = useState<string>("");

  function onChange(bookContent: EditorState) {
    const bookContentJSON = bookContent.toJSON();
    setBookContent(JSON.stringify(bookContentJSON));
  }

  useEffect(() => {
    const pathnameArr = pathname.split("/");
    const bookId = pathnameArr[pathnameArr.length - 1];

    const temp = books.filter((book) => {
      return book.id === Number(bookId);
    });

    if (temp.length === 1) {
      setBookToShow(temp[0] as BookInterface); // Type assertion to fix type error
    } else {
      setBookToShow(null);
    }
  }, []);
  function BookOnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [bookContent, onChange]);
    return null;
  }

  async function saveBook() {

  }

  return (
    <>
      {bookToShow ? (
        <>
          <header>
            <h1 className="font-bold text-2xl">{bookToShow.title}</h1>
          </header>
          <hr />
          <Label>Author </Label>
          <div className="flex flex-col">
            <Input
              type="text"
              className=""
              name="author"
              value={bookToShow.authorName}
                // problem is like author id, so this would be fine if everyone had the same name, but that's not the case since we have to switch author id as well
              onChange={(event) =>
                setBookToShow((prev) =>
                  prev ? { ...prev, author: event.target.value } : null
                )
              }
            />
            <Label>Book Description </Label>
            <Input
              type="text"
              className=""
              name="description"
              value={bookToShow.description}
              onChange={(event) =>
                setBookToShow((prev) =>
                  prev ? { ...prev, description: event.target.value } : null
                )
              }
            />
            <Label>Content</Label>
            <LexicalComposer
              initialConfig={{
                namespace: "Book Content",
                theme: {},
                onError: (error: Error) => {
                  console.error(error);
                },
                editorState: bookToShow.content || undefined,
              }}
            >
              <RichTextPlugin
                contentEditable={<ContentEditable />}
                placeholder={<p>Book Content</p>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <BookOnChangePlugin onChange={onChange} />
            </LexicalComposer>
          </div>

          <Button onClick={saveBook}>Save</Button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2">Book not found</p>
          </div>
        </>
      )}
    </>
  );
};

export default BookPage;
