import React from 'react'
import {BeatLoader} from "react-spinners"

function Loading() {
  return (
    <div style={{display : "flex", justifyContent: "center", alignItems : "center"}} >
      <BeatLoader color="#FEDCC5" />
    </div>
  )
}

export default Loading
