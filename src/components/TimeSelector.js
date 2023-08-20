import {Button, Col, Row, Slider} from 'antd'
import {useEffect, useState} from 'react'

export default function (props) {
  const {data} = props
  const dayToTimeCount = {}
  let initialColCount, initialRowCount = 0, initialDisabledCells = new Set()
  for (let time in data.timeToDay) {
    if (!dayToTimeCount[data.timeToDay[time]]) {
      dayToTimeCount[data.timeToDay[time]] = 0
    }
    dayToTimeCount[data.timeToDay[time]]++
    initialRowCount = Math.max(initialRowCount, dayToTimeCount[data.timeToDay[time]])
  }
  initialColCount = Object.keys(dayToTimeCount).length

  if (data.timeMapping) {
    for (let i = 0; i < initialRowCount; i++) {
      for (let j = 0; j < initialColCount; j++) {
        const pos = `${i},${j}`
        if (data.timeMapping[pos] === undefined) {
          initialDisabledCells.add(pos)
        }
      }
    }
  }

  const [rowCount, setRowCount] = useState(initialRowCount || 2);
  const [colCount, setColCount] = useState(initialColCount || 2);
  const [disabledCells, setDisabledCells] = useState(initialDisabledCells);

  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    const cols = []
    for (let j = 0; j < colCount; j++) {
      cols.push(
        <Col key={j.toString()}>
          <Button style={{width: `${80 / colCount}vw`}}
                  type={disabledCells.has(`${i},${j}`) ? "dashed" : "default"}
                  onClick={() => {
                    if (disabledCells.has(`${i},${j}`)) {
                      disabledCells.delete(`${i},${j}`)
                      setDisabledCells(new Set(disabledCells))
                    } else {
                      setDisabledCells(new Set(disabledCells.add(`${i},${j}`)))
                    }
                  }}
          >
            停用
          </Button>
        </Col>,
      )
    }
    rows.push(
      <Row key={i.toString()} style={{marginBottom: 24}} justify={'space-evenly'} align={'middle'}>
        {cols}
      </Row>
    )
  }

  function save() {
    const timeMapping = {}, timeToDay = {}
    let count = 0
    for (let j = 0; j < colCount; j++) {
      for (let i = 0; i < rowCount; i++) {
        const pos = `${i},${j}`
        if (disabledCells.has(pos)) {
          continue
        }
        timeMapping[pos] = count
        timeToDay[count] = j
        count++
      }
    }
    data.timeMapping = timeMapping
    data.timeToDay = timeToDay
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{display: "flex", width: "100%", justifyContent: "space-evenly", marginBottom: 16}}>
        <span>节数选择 (行)</span>
        <div style={{width: '20%'}}>
          <Slider
            min={0}
            max={12}
            value={rowCount}
            onChange={setRowCount}
          />
        </div>
        <span>工作日选择 (列)</span>
        <div style={{width: '20%'}}>
          <Slider
            min={0}
            max={7}
            value={colCount}
            onChange={setColCount}
          />
        </div>
        <Button type={"primary"} onClick={save}>保存</Button>
      </div>
      <div style={{width: '100%', textAlign: "center"}}>
        {rows}
      </div>
    </div>
  );
}