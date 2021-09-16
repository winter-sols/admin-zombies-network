import { useState } from "react"
import "./style.scss"

const Button = ({ children, ...restProps }) => {
  return (
    <div className="button" {...restProps}>
      <div>{children}</div>
    </div>
  )
}

export default Button
