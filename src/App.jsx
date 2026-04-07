
import "./App.css"

import { Route, BrowserRouter, Routes } from "react-router-dom"
import { CardDetails } from "./pages/cardDetails"
import {AllPostPerents} from "./components/allPostPerents"
import { CommentPost } from "./components/comments"


export const App = () => {
  


  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllPostPerents />}/>
          <Route path="/posts/:id" element={<CardDetails />}/>
          <Route path="/posts/:id/comments" element={<CommentPost />} />
          {/* <Route path="/signin" element={<Signin/>}/> */}
        </Routes>
      </BrowserRouter>
  )
}

