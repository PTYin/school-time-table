import {Button, Input} from 'antd';
import {useState} from 'react'

const { TextArea } = Input;

export default function (props) {
  const {data} = props
  let initialRawString = ""
  if (data.tuples) {
    for (let tuple of data.tuples) {
      initialRawString = initialRawString.concat(tuple.join() + "\n")
    }
  }
  const [rawString, setRawString] = useState(initialRawString)

  function save() {
    const tuples = []
    const tupleStringList = rawString.split("\n")
    for (let tupleString of tupleStringList) {
      if (!tupleString.trim()) {
        continue
      }
      const tuple = tupleString.split(",")
      // noinspection JSValidateTypes
      tuple[tuple.length - 1] = parseInt(tuple[tuple.length - 1])
      tuples.push(tuple)
    }
    data.tuples = tuples
  }
  return (
    <div>
      <Button style={{float: "right", marginBottom: 16}} type={"primary"} onClick={save}>保存</Button>
      <TextArea value={rawString} onChange={e => setRawString(e.target.value)} rows={12} placeholder="每一行输入四元组 (教师,班级,科目,一周次数), e.g. 张三,一班,语文,6"/>
    </div>
  )
}