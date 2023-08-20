import {BrowserRouter as Router, Route, Routes, Link, useLocation, Outlet} from 'react-router-dom'
import {Breadcrumb, Layout} from 'antd'
import DayInfo from './views/DayInfo'
import CourseInfo from './views/CourseInfo'
import Requirements from './views/Requirements'
import Generation from './views/Generation'
import DataStruct from './core/data'

const {Header, Content, Footer} = Layout;

function Home() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop()

  const breadcrumbNameMap = {
    'day-info': '时间信息',
    'course-info': '课时信息',
    'requirements': '特殊需求',
    'generation': '生成',
  }

  const items = []
  for (let href in breadcrumbNameMap) {
    items.push({title: breadcrumbNameMap[href], href})
  }

  const data = new DataStruct()

  function itemRender(item, params, items, paths) {
    return item.href === currentPath ? <span style={{color: "#000"}}>{item.title}</span> : <Link to={item.href}>{item.title}</Link>
  }

  return (
    <Layout style={{height: "100vh"}}>
      <Header theme="dark" style={{display: 'flex', alignItems: 'center'}}>
        <h1 style={{color: "#fff"}}>课程表定制 <span style={{color: "#909090"}}>/ School Time Table</span></h1>
      </Header>
      <Content style={{padding: '0 50px', overflow: 'auto'}}>
        <Breadcrumb style={{margin: '16px 0'}} separator={">"} items={items} itemRender={itemRender}/>
        <div className="site-layout-content" style={{background: "#f5f5f5"}}>
          <Routes>
            <Route path="/" element={<Outlet/>}/>
            <Route path="day-info" element={<DayInfo data={data}/>}/>
            <Route path="course-info" element={<CourseInfo data={data}/>}/>
            <Route path="requirements" element={<Requirements data={data}/>}/>
            <Route path="generation" element={<Generation data={data}/>}/>
          </Routes>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        School Time Table ©2023 Built by <a href={"https://github.com/PTYin"}>PTYin</a>
      </Footer>
    </Layout>
  )
}

export default function App() {
  return (
    <Router>
      <Home/>
    </Router>
  )
}
