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
    w_title: "",
    text2: "",
    check1: true,
    w_subtitle: "",
    presale: "",
    ht_title: "",
    ht_subtitle: "",
    tc_owned: "",
    tc_play: "",
    tc_title: "",
    tc_subtitle: "",
    tc_subheading: "",
    pte_item_title1: "",
    pte_item_content1: "",
    pte_item_title2: "",
    pte_item_content2: "",
    pte_item_title3: "",
    pte_item_content3: "",
    pte_item_title4: "",
    pte_item_content4: "",
    to_title: "",
    to_subtitle: "",
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
      setInfo({ ...info, [name]: value })
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
            <fieldset>
              <legend>Why Zombie:</legend>
              <div>
                <label htmlFor="w_title">Title: </label>
                <textarea
                  value={info.w_title}
                  id="w_title"
                  name="w_title"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="w_subtitle">SubTitle: </label>
                <textarea
                  value={info.w_subtitle}
                  id="w_subtitle"
                  name="w_subtitle"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="w_subtitle">SubHeading: </label>
                <textarea
                  value={info.w_subheading}
                  id="w_subheading"
                  name="w_subheading"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="w_subcontent">SubContent: </label>
                <textarea
                  value={info.w_subcontent}
                  id="w_subcontent"
                  name="w_subcontent"
                  onChange={handleChange}
                ></textarea>
              </div>
            </fieldset>

            <fieldset>
              <legend>Features:</legend>
              <div>
                <label htmlFor="ht_title">HowToPlay Title: </label>
                <textarea
                  value={info.ht_title}
                  id="ht_title"
                  name="ht_title"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="ht_subtitle">HowToPlay SubTitle: </label>
                <textarea
                  value={info.ht_subtitle}
                  id="ht_subtitle"
                  name="ht_subtitle"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_owned">TombContents Owned: </label>
                <textarea
                  value={info.tc_owned}
                  id="tc_owned"
                  name="tc_owned"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_play">Play To Earn Owned: </label>
                <textarea
                  value={info.tc_play}
                  id="tc_play"
                  name="tc_play"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_owned">TombContents Owned: </label>
                <textarea
                  value={info.tc_owned}
                  id="tc_owned"
                  name="tc_owned"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_repeat">TombContents Repeat: </label>
                <textarea
                  value={info.tc_repeat}
                  id="tc_repeat"
                  name="tc_repeat"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_title">TombContents Title: </label>
                <textarea
                  value={info.tc_title}
                  id="tc_title"
                  name="tc_title"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_title">TombContents SubTitle: </label>
                <textarea
                  value={info.tc_subtitle}
                  id="tc_subtitle"
                  name="tc_subtitle"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tc_subheading">TombContents SubHeading: </label>
                <textarea
                  value={info.tc_subheading}
                  id="tc_subheading"
                  name="tc_subheading"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_title1">
                  Play to Earn Item Title1:
                </label>
                <textarea
                  value={info.pte_item_title1}
                  id="pte_item_title1"
                  name="pte_item_title1"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_content1">
                  Play to Earn Item SubTitle1:
                </label>
                <textarea
                  value={info.pte_item_content1}
                  id="pte_item_content1"
                  name="pte_item_content1"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_title2">
                  Play to Earn Item Title2:
                </label>
                <textarea
                  value={info.pte_item_title2}
                  id="pte_item_title2"
                  name="pte_item_title2"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_content2">
                  Play to Earn Item SubTitle2:
                </label>
                <textarea
                  value={info.pte_item_content2}
                  id="pte_item_content2"
                  name="pte_item_content2"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_title3">
                  Play to Earn Item Title3:
                </label>
                <textarea
                  value={info.pte_item_title3}
                  id="pte_item_title3"
                  name="pte_item_title3"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_content3">
                  Play to Earn Item SubTitle3:
                </label>
                <textarea
                  value={info.pte_item_content3}
                  id="pte_item_content3"
                  name="pte_item_content3"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_title4">
                  Play to Earn Item Title4:
                </label>
                <textarea
                  value={info.pte_item_title4}
                  id="pte_item_title4"
                  name="pte_item_title4"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pte_item_content4">
                  Play to Earn Item SubTitle4:
                </label>
                <textarea
                  value={info.pte_item_content4}
                  id="pte_item_content4"
                  name="pte_item_content4"
                  onChange={handleChange}
                ></textarea>
              </div>
            </fieldset>

            <fieldset>
              <legend>Tokenomics</legend>
              <div>
                <label htmlFor="to_title">Tokenomics Title:</label>
                <textarea
                  value={info.to_title}
                  id="to_title"
                  name="to_title"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="to_subtitle">Tokenomics SubTitle:</label>
                <textarea
                  value={info.to_subtitle}
                  id="to_subtitle"
                  name="to_subtitle"
                  onChange={handleChange}
                ></textarea>
              </div>
            </fieldset>

            <fieldset>
              <legend>Roadmap</legend>
              <div>
                <label htmlFor="to_subtitle">Tokenomics SubTitle:</label>
                <textarea
                  value={info.to_subtitle}
                  id="to_subtitle"
                  name="to_subtitle"
                  onChange={handleChange}
                ></textarea>
              </div>
            </fieldset>

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
