import React from 'react'
import ReactLoading from "react-loading";

const LoadingScreen = ({h, w, c}) => {
  return (
    <ReactLoading
        className="loading-screen"
        type={"spin"}
        color={c}
        height={h}
        width={w}
      />
  )
}

export default LoadingScreen