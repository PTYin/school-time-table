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

  const rows = []
  for (let i = 0; i < rowCount; i++) {
    const cols = []
    for (let j = 0; j < colCount; j++) {
      cols.push(
        <Col key={j.toString()} style={{width: `${80 / colCount}vw`}}>
          {timeTableContent[`${i},${j}`] || ""}
        </Col>,
      )
    }
    rows.push(
      <Row key={i.toString()} style={{marginBottom: 24}} justify={'space-evenly'} align={'middle'}>
        {cols}
      </Row>
    )
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{display: "flex", width: "100%", justifyContent: "space-evenly", marginBottom: 16}}>
      </div>
      <div style={{width: '100%', textAlign: "center"}}>
        {rows}
      </div>
      <Pagination current={currentPage} onChange={setCurrentPage} defaultPageSize={1} total={totalPage}/>
    </div>
  );
}