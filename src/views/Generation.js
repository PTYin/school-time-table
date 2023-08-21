import {Button, message} from 'antd'
import {convertFromTuples, generateTimeTable} from '../core/algo'
import TimeTable from '../components/TimeTable'
import {useState} from 'react'

let iterator

export default function (props) {
  const {data} = props
  const [timeTable, setTimeTable] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  const T = Object.keys(data.timeMapping || {}).length
  const [teacherMap, classMap, courseMap, teacherClassCourseCount] = convertFromTuples(data.tuples || [])
  const M = teacherMap.size, N = classMap.size, K = courseMap.size

  if (data.timeToDay && data.timeMapping && data.tuples && !iterator) {
    iterator = generateTimeTable(T, M, N, K, teacherClassCourseCount, data.timeToDay, reverse(Object.entries(data.timeMapping)), reverse(teacherMap), reverse(classMap), reverse(courseMap))
  }

  function reverse(map) {
    return new Map(Array.from(map, a => a.reverse()))
  }

  function generate() {
    let next = iterator.next()
    if (!next.done) {
      setTimeTable(next.value)
    } else {
      messageApi.info("所有可能性已生成完毕, 再次点击重新开始生成")
      iterator = generateTimeTable(T, M, N, K, teacherClassCourseCount, data.timeToDay, reverse(Object.entries(data.timeMapping)), reverse(teacherMap), reverse(classMap), reverse(courseMap))
    }
  }

  return (
    <div>
      {contextHolder}
      <div style={{width: "100%", display: "flex", justifyContent: "space-evenly", textAlign: "center"}}>
        <Button style={{width: "80%"}} type={"primary"} onClick={generate}>
          生成
        </Button>
        <Button style={{width: "10%"}} onClick={() => setTimeTable(iterator = null)}>
          清除
        </Button>
      </div>
      {timeTable && <TimeTable data={data} timeTable={timeTable}/>}
    </div>
  )
}