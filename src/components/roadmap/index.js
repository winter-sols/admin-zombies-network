import React, { useEffect, useState } from "react"
import "./datatables.css"

const RoadMap = ({ phases }) => {
  const [items, setItems] = useState({})
  const $ = require('jquery')
  $.DataTable = require('datatables.net')

  useEffect(() => {
      setItems({...phases})
  }, [phases])

  return (

    <table id="phase-table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Checked</td>
          <td>Phase</td>
      
        </tr>
      </thead>
      <tbody>
        {
          Object.entries({...items}).map(([key, step], index) => {
            return step.map((item) => {
              return (
                <tr key={index}>
                  <td>
                  12
                  </td>
                  <td>
                  12
                  </td>
                  <td>
                  12
                  </td>
                </tr>
              )
            })
          })
        }
      </tbody>
    </table>
  )
}

export default RoadMap
