import React, { useEffect, useState } from "react"
import db from "../../helpers/firebase"
import { getLoggedIn } from "../../helpers/credentials"
import { useHistory } from "react-router-dom"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"
import Sidebar from "components/sidebar"
import Navbar from "components/Navbar"
import "./style.scss"
import RoadMap from "components/roadmap"

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
    phase1: 1,
    phase2: 2,
    phase3: 3,
    co_title: "",
    co_subtitle: "",
    co_heading: "",
    faq_subtitle: "",
    faq_heading: "",
    faq_answer1: "",
    faq_question1: "",
    faq_answer2: "",
    faq_question2: "",
    faq_answer3: "",
    faq_question3: "",
    faq_answer4: "",
    faq_question4: "",
    faq_answer5: "",
    faq_question5: "",
    faq_answer6: "",
    faq_question6: "",
    faq_answer7: "",
    faq_question7: "",
    faq_answer8: "",
    faq_question8: "",
  })
  const [roadmap, setRoadmap] = useState({})
  const [errors, setErrors] = useState({})
  const [cnt, setCnt] = useState(0)
  const history = useHistory()

  useEffect(async () => {
    if (!getLoggedIn()) history.push("login")
    const configsSnap = await getDocs(collection(db, "configs"))
    const roadmapSnap = await getDocs(collection(db, "roadmap"))

    for (const item of configsSnap.docs) {
      const itemData = item.data()
      if ("value" in itemData)
        setInfo((prev) => ({ ...prev, [item.id]: itemData.value }))
    }
    for (const item of roadmapSnap.docs) {
      const itemData = item.data()
      setRoadmap((prev) => {
        prev[item.id] = itemData
        return prev
      })
    }
  }, [cnt])

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
      <Navbar className="dashboard-navbar" clickHandler={doLogout} />
      <div className="row" style={{ marginRight: "15px" }}>
        <div className="dashboard-sidebar col-1">
          <Sidebar />
        </div>
        <div className="dashboard-main col">
          <ul className="list-unstyled">
            {Object.entries(errors).map(function (value, key) {
              if (value[1])
                return <li key={key}>{value[0] + ": " + value[1]}</li>
            })}
          </ul>
          <form className="row" onSubmit={handleSubmit}>
            <div class="col-6">
              <fieldset>
                <legend>Why Zombie:</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="w_title">
                    Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.w_title}
                    id="w_title"
                    name="w_title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="w_subtitle">
                    SubTitle:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.w_subtitle}
                    id="w_subtitle"
                    name="w_subtitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="w_subtitle">
                    SubHeading:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.w_subheading}
                    id="w_subheading"
                    name="w_subheading"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="w_subcontent">
                    SubContent:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.w_subcontent}
                    id="w_subcontent"
                    name="w_subcontent"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </fieldset>

              <fieldset>
                <legend>Features:</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="ht_title">
                    HowToPlay Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.ht_title}
                    id="ht_title"
                    name="ht_title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="ht_subtitle">
                    HowToPlay SubTitle:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.ht_subtitle}
                    id="ht_subtitle"
                    name="ht_subtitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_owned">
                    TombContents Owned:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_owned}
                    id="tc_owned"
                    name="tc_owned"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_play">
                    Play To Earn Owned:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_play}
                    id="tc_play"
                    name="tc_play"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_owned">
                    TombContents Owned:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_owned}
                    id="tc_owned"
                    name="tc_owned"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_repeat">
                    TombContents Repeat:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_repeat}
                    id="tc_repeat"
                    name="tc_repeat"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_title">
                    TombContents Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.tc_title}
                    id="tc_title"
                    name="tc_title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_title">
                    TombContents SubTitle:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_subtitle}
                    id="tc_subtitle"
                    name="tc_subtitle"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tc_subheading">
                    TombContents SubHeading:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.tc_subheading}
                    id="tc_subheading"
                    name="tc_subheading"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_title1">
                    Play to Earn Item Title1:
                  </label>
                  <input
                    className="form-control"
                    value={info.pte_item_title1}
                    id="pte_item_title1"
                    name="pte_item_title1"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_content1">
                    Play to Earn Item SubTitle1:
                  </label>
                  <textarea
                    className="form-control"
                    value={info.pte_item_content1}
                    id="pte_item_content1"
                    name="pte_item_content1"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_title2">
                    Play to Earn Item Title2:
                  </label>
                  <input
                    className="form-control"
                    value={info.pte_item_title2}
                    id="pte_item_title2"
                    name="pte_item_title2"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_content2">
                    Play to Earn Item SubTitle2:
                  </label>
                  <textarea
                    className="form-control"
                    value={info.pte_item_content2}
                    id="pte_item_content2"
                    name="pte_item_content2"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_title3">
                    Play to Earn Item Title3:
                  </label>
                  <input
                    className="form-control"
                    value={info.pte_item_title3}
                    id="pte_item_title3"
                    name="pte_item_title3"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_content3">
                    Play to Earn Item SubTitle3:
                  </label>
                  <textarea
                    className="form-control"
                    value={info.pte_item_content3}
                    id="pte_item_content3"
                    name="pte_item_content3"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_title4">
                    Play to Earn Item Title4:
                  </label>
                  <input
                    className="form-control"
                    value={info.pte_item_title4}
                    id="pte_item_title4"
                    name="pte_item_title4"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pte_item_content4">
                    Play to Earn Item SubTitle4:
                  </label>
                  <textarea
                    className="form-control"
                    value={info.pte_item_content4}
                    id="pte_item_content4"
                    name="pte_item_content4"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </fieldset>

              <fieldset>
                <legend>Community</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="co_title">
                    Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.co_title}
                    name="co_title"
                    id="co_title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="co_subtitle">
                    Subtitle:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.co_subtitle}
                    name="co_subtitle"
                    id="co_subtitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="co_heading">
                    SubHeading:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.co_heading}
                    name="co_heading"
                    id="co_heading"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset>
                <legend>Roadmap</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phase1">
                    Phase1:{" "}
                  </label>
                  <select
                    className="form-control"
                    name="phase1"
                    id="phase1"
                    value={info.phase1}
                    onChange={handleChange}
                  >
                    <option value="1">
                      Graphic Designs Characters & Marketplace
                    </option>
                    <option value="2">Launch Social + Website</option>
                    <option value="3">Audit Contract</option>
                    <option value="4">Marketing / Pre-Sale On UniCrypt</option>
                    <option value="5">Public Launch On PancakeSwap</option>
                    <option value="6">Public Launch NFT Battle</option>
                    <option value="7">Public Launch NFT Marketplace</option>
                    <option value="8">Coingecko, Coinmarketcap Listing</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phase2">
                    Phase2:{" "}
                  </label>
                  <select
                    className="form-control"
                    name="phase2"
                    id="phase2"
                    value={info.phase2}
                    onChange={handleChange}
                  >
                    <option value="1">CEX Listing</option>
                    <option value="2">Public Launch Against Yaki Bosses</option>
                    <option value="3">Public Launch NFT Farming</option>
                    <option value="4">Influencer Marketing</option>
                    <option value="5">Release More ZOAN NFT Characters</option>
                    <option value="6">ZOMB Training Alpha Version</option>
                    <option value="7">ZOMB’s Item</option>
                    <option value="8">Expanding Team</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phase3">
                    Phase3:{" "}
                  </label>
                  <select
                    className="form-control"
                    name="phase3"
                    id="phase3"
                    value={info.phase3}
                    onChange={handleChange}
                  >
                    <option value="1">Game Studio/Partnerships Expanded</option>
                    <option value="2">ZOMB Training Beta - Web Version</option>
                    <option value="3">More Exchanges</option>
                    <option value="4">
                      ZOMB Dapp Mobile Game (IOS, Android)
                    </option>
                    <option value="5">Zombies Global Tournament</option>
                  </select>
                </div>
              </fieldset>

              <fieldset>
                <legend>FAQs</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question">
                    Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question}
                    name="faq_question"
                    id="faq_question"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_subtitle">
                    Subtitle:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_subtitle}
                    name="faq_subtitle"
                    id="faq_subtitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_heading">
                    SubHeading:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_heading}
                    name="faq_heading"
                    id="faq_heading"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question1">
                    FAQ1 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question1}
                    name="faq_question1"
                    id="faq_question1"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer1">
                    FAQ1 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer1}
                    name="faq_answer1"
                    id="faq_answer1"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question2">
                    FAQ2 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question2}
                    name="faq_question2"
                    id="faq_question2"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer2">
                    FAQ2 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer2}
                    name="faq_answer2"
                    id="faq_answer2"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question3">
                    FAQ3 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question3}
                    name="faq_question3"
                    id="faq_question3"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer3">
                    FAQ3 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer3}
                    name="faq_answer3"
                    id="faq_answer3"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question4">
                    FAQ4 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question4}
                    name="faq_question4"
                    id="faq_question4"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer4">
                    FAQ4 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer4}
                    name="faq_answer4"
                    id="faq_answer4"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question5">
                    FAQ5 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question5}
                    name="faq_question5"
                    id="faq_question5"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_conten5">
                    FAQ5 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer5}
                    name="faq_answer5"
                    id="faq_answer5"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question6">
                    FAQ6 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question6}
                    name="faq_question6"
                    id="faq_question6"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer6">
                    FAQ6 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer6}
                    name="faq_answer6"
                    id="faq_answer6"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question7">
                    FAQ7 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question7}
                    name="faq_question7"
                    id="faq_question7"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer7">
                    FAQ7 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer7}
                    name="faq_answer7"
                    id="faq_answer7"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_question8">
                    FAQ8 Question:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={info.faq_question8}
                    name="faq_question8"
                    id="faq_question8"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="faq_answer8">
                    FAQ8 Answer:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    value={info.faq_answer8}
                    name="faq_answer8"
                    id="faq_answer8"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </fieldset>

              <fieldset>
                <legend>Tokenomics</legend>
                <div className="mb-3">
                  <label className="form-label" htmlFor="to_title">
                    Tokenomics Title:
                  </label>
                  <input
                    className="form-control"
                    value={info.to_title}
                    id="to_title"
                    name="to_title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="to_subtitle">
                    Tokenomics SubTitle:
                  </label>
                  <input
                    className="form-control"
                    value={info.to_subtitle}
                    id="to_subtitle"
                    name="to_subtitle"
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <div className="mb-3">
                <label className="form-label" htmlFor="presale">
                  Presale DateTime:{" "}
                </label>
                <input
                  className="form-control"
                  value={info.presale}
                  type="datetime-local"
                  name="presale"
                  id="presale"
                  onChange={handleChange}
                />
              </div>
            </div>

            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
