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

const Dashboard = () => {
  const [info, setInfo] = useState({})
  const [errors, setErrors] = useState({})
  const history = useHistory()

  useEffect(async () => {
    if (!getLoggedIn()) history.push("login")
    let q = query(collection(db, "configs"), where("name", "==", "presale"))
    let docSnap = await getDocs(q)
    docSnap.empty ||
      setInfo((prev) => ({ ...prev, presale: docSnap.docs[0].data().value }))

    q = query(collection(db, "configs"), where("name", "==", "favourite"))
    docSnap = await getDocs(q)
    docSnap.empty ||
      setInfo((prev) => ({ ...prev, favourite: docSnap.docs[0].data().value }))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    checkValidity(name, value)

    switch (name) {
      case "presale":
        setInfo({ ...info, presale: value })
        break
      case "favourite":
        setInfo({ ...info, favourite: value })
        break
    }
  }

  const checkValidity = (name, value) => {
    switch (name) {
      case "presale":
        if (!value) setErrors({ ...errors, presale: "Enter value" })
        else delete errors["presale"]
        break
      case "favourite":
        if (!value) setErrors({ ...errors, favourite: "Enter value" })
        else delete errors["favourite"]
        break
      default:
        checkValidity("presale", info.presale)
        checkValidity("favourite", info.favourite)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    checkValidity()
    if (!Object.keys(errors).length) {
      let q = query(collection(db, "configs"), where("name", "==", "presale"))
      let docSnap = await getDocs(q)
      if (docSnap.empty) {
        const newConfig = doc(collection(db, "configs"))
        await setDoc(newConfig, {
          name: "presale",
          value: info.presale,
        })
      } else {
        updateDoc(docSnap.docs[0].ref, {
          value: info.presale,
        })
      }

      q = query(collection(db, "configs"), where("name", "==", "favourite"))
      docSnap = await getDocs(q)
      if (docSnap.empty) {
        const newConfig = doc(collection(db, "configs"))
        await setDoc(newConfig, {
          name: "favourite",
          value: info.favourite,
        })
      } else {
        updateDoc(docSnap.docs[0].ref, {
          value: info.favourite,
        })
      }
    }
    return false
  }

  return (
    <div className="dashboard flex flex-column">
      <div className="dashboard-sidebar"></div>
      <div className="dashboard-main">
        <ul style={{ listStyleType: "none" }}>
          {Object.entries(errors).map(function (value, key) {
            if (value[1]) return <li key={key}>{value[0] + ": " + value[1]}</li>
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="favourite">Favourite Food: </label>
            <input
              value={info.favourite || ""}
              id="favourite"
              name="favourite"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="presale">Presale DateTime: </label>
            <input
              value={info.presale || ""}
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
  )
}

export default Dashboard
