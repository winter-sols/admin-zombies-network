import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import db from "helpers/firebase"
import { getLoggedIn } from "helpers/credentials"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"

import DashboardComponent from "components/dashboard"
import { ROUTERS } from "configurations/routers"

const Dashboard = () => {
  const history = useHistory()

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
    faq_title: "",
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
  const [errors, setErrors] = useState({})

  useEffect(async () => {
    if (!getLoggedIn()) history.push("login")
    const configsSnap = await getDocs(collection(db, "configs"))
    const roadmapSnap = await getDocs(collection(db, "roadmap"))

    for (const item of configsSnap.docs) {
      const itemData = item.data()
      if ("value" in itemData)
        setInfo((prev) => ({ ...prev, [item.id]: itemData.value }))
    }
  }, [])

  const onLogoutHandler = (e) => {
    localStorage.removeItem("zombie_login")
    history.push(ROUTERS.AUTH)
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    console.log(value)
    setInfo({ ...info, [name]: value })

    // checkValidity(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // checkValidity()

    if (!Object.keys(errors).length) {
      Promise.all(
        Object.entries(info).map(function (value) {
          return setDoc(doc(db, "configs", value[0]), {
            value: value[1],
          })
        })
      ).then(() => {
        alert("Updated")
      })
    }
    return false
  }

  return (
    <DashboardComponent
      info={info}
      errors={errors}
      onLogoutHandler={onLogoutHandler}
      handleSubmit={handleSubmit}
      onChangeHandler={onChangeHandler}
    />
  )
}

export default Dashboard
