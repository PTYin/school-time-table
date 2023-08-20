export default class DataStruct {
  _T
  _M
  _N
  _K
  _teacherClassCourseCount
  _timeToDay
  _dayCourseCount

  _tuples
  _timeMapping

  get T() {
    return this._T || localStorage.getItem("T")
  }

  set T(value) {
    this._T = value
    localStorage.setItem("T", value)
  }

  get M() {
    return this._M || localStorage.getItem("M")
  }

  set M(value) {
    this._M = value
    localStorage.setItem("M", value)
  }

  get N() {
    return this._N || localStorage.getItem("N")
  }

  set N(value) {
    this._N = value
    localStorage.setItem("N", value)
  }

  get K() {
    return this._K || localStorage.getItem("K")
  }

  set K(value) {
    this._K = value
    localStorage.setItem("K", value)
  }

  get teacherClassCourseCount() {
    return this._teacherClassCourseCount || JSON.parse(localStorage.getItem("teacherClassCourseCount"))
  }

  set teacherClassCourseCount(value) {
    this._teacherClassCourseCount = value
    localStorage.setItem("teacherClassCourseCount", JSON.stringify(value))
  }

  get timeToDay() {
    return this._timeToDay || JSON.parse(localStorage.getItem("timeToDay"))
  }

  set timeToDay(value) {
    this._timeToDay = value
    localStorage.setItem("timeToDay", JSON.stringify(value))
  }

  get dayCourseCount() {
    return this._dayCourseCount || JSON.parse(localStorage.getItem("dayCourseCount"))
  }

  set dayCourseCount(value) {
    this._dayCourseCount = value
    localStorage.setItem("dayCourseCount", JSON.stringify(value))
  }

  get tuples() {
    return this._tuples || JSON.parse(localStorage.getItem("tuples"))
  }

  set tuples(value) {
    this._tuples = value
    localStorage.setItem("tuples", JSON.stringify(value))
  }

  get timeMapping() {
    return this._timeMapping || JSON.parse(localStorage.getItem("timeMapping"))
  }

  set timeMapping(value) {
    this._timeMapping = value
    localStorage.setItem("timeMapping", JSON.stringify(value))
  }
}