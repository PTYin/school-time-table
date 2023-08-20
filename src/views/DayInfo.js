import TimeTable from '../components/TimeSelector'

export default function (props) {
  return (
    <div>
      <h2>时间信息定制</h2>
      <TimeTable data={props.data} />
    </div>
  )
}