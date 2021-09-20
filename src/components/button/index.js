import { useState } from "react"
import "./style.scss"

const Button = ({ children, clickHandler, ...restProps }) => {
  return (
    <div onClick={clickHandler} className="button" {...restProps}>
      <div>{children}</div>
    </div>
  )
}

export default Button
