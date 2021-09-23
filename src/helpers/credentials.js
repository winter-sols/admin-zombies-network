export default {
  userEmail: "admin@zombies.network",
  userPwd: "adminAdmin123!@#",
}

export const setLoggedIn = () => {
  localStorage.removeItem("zombie_login")
  localStorage.setItem("zombie_login", Date.now())
}

export const getLoggedIn = () => {
  const loggedInTimestamp = localStorage.getItem("zombie_login")
  if (loggedInTimestamp || loggedInTimestamp >= Date.now() - 60 * 60)
    return true
  else return false
}
