import "./App.css"

import { Route, BrowserRouter, Routes } from "react-router-dom"
import { CardDetails } from "./pages/cardDetails"
import {AllPostPerents} from "./components/allPostPerents"
import { CommentPost } from "./components/comments"

export const App = () => {
  


  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllPostPerents showPosts={true} showForm={false} />}/>
          <Route path="/add-post" element={<AllPostPerents showPosts={false} showForm={true} />} />
          <Route path="/posts/:id" element={<CardDetails />}/>
          <Route path="/posts/:id/comments" element={<CommentPost />} />
        </Routes>
      </BrowserRouter>
  )
}

