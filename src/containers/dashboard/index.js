import React, { useEffect, useState } from "react"
import db from "../../helpers/firebase"
import { getLoggedIn } from "../../helpers/credentials"
import { useHistory } from "react-router-dom"
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore"
import Sidebar from "components/sidebar"
import Navbar from "components/Navbar"
import "./style.scss"

const Dashboard = () => {
  const [info, setInfo] = useState({
    text1: "",
    text2: "",
    check1: true,
    presale: "",
  })
  const [errors, setErrors] = useState({})
  const history = useHistory()

  useEffect(async () => {
    if (!getLoggedIn()) history.push("login")
    const querySnapshot = await getDocs(collection(db, "configs"))
    for (const item of querySnapshot.docs) {
      const itemData = item.data()
      if ("value" in itemData)
        setInfo((prev) => ({ ...prev, [item.id]: itemData.value }))
    }
  }, [])

  const doLogout = (e) => {
    localStorage.removeItem("zombie_login")
    history.push("login")
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    if (!name.startsWith("check")) {
      setInfo({ ...info, [name]: checked })
    } else {
      setInfo({ ...info, [name]: checked })
    }
    checkValidity(name, value)
  }

  const checkValidity = (name, value) => {
    if (typeof name === "undefined") {
      for (const [key, value] of Object.entries(info)) {
        checkValidity(key, value)
      }
    } else {
      if (typeof value == "string" && value == "")
        setErrors({ ...errors, [name]: "Enter value" })
      else delete errors[name]
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    checkValidity()
    if (!Object.keys(errors).length) {
      Object.entries(info).map(function (value, key) {
        setDoc(doc(db, "configs", value[0]), {
          value: value[1],
        })
      })
    }
    return false
  }

  return (
    <div className="dashboard">
      <Navbar clickHandler={doLogout} />
      <div className="flex">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-main">
          <ul style={{ listStyleType: "none" }}>
            {Object.entries(errors).map(function (value, key) {
              if (value[1])
                return <li key={key}>{value[0] + ": " + value[1]}</li>
            })}
          </ul>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text1">Text 1: </label>
              <textarea
                value={info.text1}
                id="text1"
                name="text1"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="text2">Text 2: </label>
              <textarea
                value={info.text2}
                id="text2"
                name="text2"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="check1">check1: </label>
              <input
                type="checkbox"
                id="check1"
                value="123"
                name="check1"
                checked={info.check1}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="presale">Presale DateTime: </label>
              <input
                value={info.presale}
                type="datetime-local"
                name="presale"
                id="presale"
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
