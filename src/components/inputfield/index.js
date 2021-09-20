import { useState } from "react"
import "./style.scss"

const InputField = ({ name, changeHandler, ...restProps }) => {
  const [value, setValue] = useState("")

  const onChangeHandler = (e) => {
    e.preventDefault()
    changeHandler(e)
    setValue(e.target.value)
  }

  return (
    <div className="input-field" {...restProps}>
      {name === "Password" ? (
        <input
          id={name.toLowerCase()}
          className={`${value !== "" ? "focus" : ""}`}
          name={name.toLowerCase()}
          type="password"
          onChange={onChangeHandler}
        />
      ) : (
        <input
          id={name.toLowerCase()}
          className={`${value !== "" ? "focus" : ""}`}
          name={name.toLowerCase()}
          type="text"
          onChange={onChangeHandler}
        />
      )}
      <label htmlFor={name.toLowerCase()}>{name}</label>
    </div>
  )
}

export default InputField
