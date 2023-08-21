import {Button, Col, Pagination, Row, Slider} from 'antd'
import {useEffect, useState} from 'react'

export default function (props) {
  const {data, timeTable} = props
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = Object.keys(timeTable).length

  const dayToTimeCount = {}
  let colCount, rowCount = 0
  for (let time in data.timeToDay) {
    if (!dayToTimeCount[data.timeToDay[time]]) {
      dayToTimeCount[data.timeToDay[time]] = 0
    }
    dayToTimeCount[data.timeToDay[time]]++
    rowCount = Math.max(rowCount, dayToTimeCount[data.timeToDay[time]])
  }
  colCount = Object.keys(dayToTimeCount).length

  const timeTableEntries = Object.entries(timeTable)
  const timeTableContent = timeTableEntries[currentPage - 1][1]

  const headers = [], rows = []
  for (let j = 0; j < colCount; j++) {
    headers.push(
      <th key={j.toString()} style={{width: `${80 / colCount}vw`, border: "1px solid"}}>
        第{j}天
      </th>,
    )
  }
  rows.push(
    <tr key={-1} style={{lineHeight: "36px", border: "1px solid"}}>
      {headers}
    </tr>
  )
  for (let i = 0; i < rowCount; i++) {
    const cols = []
    for (let j = 0; j < colCount; j++) {
      cols.push(
        <td key={j.toString()} style={{width: `${80 / colCount}vw`, border: "1px solid"}}>
          {timeTableContent[`${i},${j}`] || ""}
        </td>,
      )
    }
    rows.push(
      <tr key={i.toString()} style={{lineHeight: "36px", border: "1px solid"}}>
        {cols}
      </tr>
    )
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{display: "flex", width: "100%", justifyContent: "space-evenly", margin: 16}}>
        班级 {timeTableEntries[currentPage - 1][0]}
      </div>
      <table style={{width: '100%', textAlign: "center", border: "1px solid", marginBottom: 16}}>
        <tbody>
          {rows}
        </tbody>
      </table>
      <Pagination current={currentPage} onChange={setCurrentPage} defaultPageSize={1} total={totalPage}/>
    </div>
  );
}