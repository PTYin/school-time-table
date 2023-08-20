function createArray(...size) {
  if (!size)
    return undefined
  const array = size[0] ? new Array(size[0]) : undefined
  for (let i = 0; i < size[0]; i++) {
    array[i] = createArray(...size.slice(1))
  }
  return array
}

const T = 5, M = 3, N = 2, K = 2
const teacherClassCourseCount = {0: {0: {0: 2}, 1: {0: 2}}, 1: {0: {1: 3}}, 2: {1: {1: 3}}}
const timeToDay = {0: 0, 1: 0, 2: 1, 3: 2, 4: 2}
const dayCourseCount = {0: {0: 1, 1: 1}, 1: {1: 1}, 2: {0: 1, 1: 1}}


export function* generateTimeTable(T, M, N, K, teacherClassCourseCount, timeToDay, reverseTimeMap, reverseTeacherMap, reverseClassMap, reverseCourseMap, dayCourseCount) {
  const X = createArray(T, M, N, K)
  let D = 0
  for (let time in timeToDay) {
    D = Math.max(D, timeToDay[time])
  }
  D++
  const dayClassCourseCount = createArray(D, N, K)
  if (!dayCourseCount) {
    for (let day = 0; day < D; day++) {
      for (let clazz = 0; clazz < N; clazz++) {
        for (let course = 0; course < K; course++) {
          dayClassCourseCount[day][clazz][course] = 1
        }
      }
    }
  } else {
    for (let day in dayCourseCount) {
      for (let clazz = 0; clazz < N; clazz++) {
        dayClassCourseCount[day][clazz] = structuredClone(dayCourseCount[day])
      }
    }
  }

  const iterator = generateTimeSeries(0)
  while (!iterator.next().done) {
    const timeTable = {}
    for (let time = 0; time < T; time++) {
      for (let teacher = 0; teacher < M; teacher++) {
        for (let clazz = 0; clazz < N; clazz++) {
          for (let course = 0; course < K; course++) {
            if (X[time][teacher][clazz][course]) {
              // timeTable[clazz][time] = `(${course}, ${teacher})`
              const timeName = reverseTimeMap && reverseTimeMap.get(time) || time
              const teacherName = reverseTeacherMap && reverseTeacherMap.get(teacher) || teacher
              const className = reverseClassMap && reverseClassMap.get(clazz) || clazz
              const courseName = reverseCourseMap && reverseCourseMap.get(course) || course
              if (!timeTable[className]) {
                timeTable[className] = {}
              }
              timeTable[className][timeName] = [courseName, teacherName]
            }
          }
        }
      }
    }
    yield timeTable
  }

  function* generateTimeSeries(t) {
    if (t === T) {
      yield
    } else {
      const iterator = generateTeacherCourses(t, 0, new Array(M))
      while (!iterator.next().done) {
        yield* generateTimeSeries(t + 1)
      }
    }
  }

  function* generateTeacherCourses(time, clazz, assigned) {
    if (clazz === N) {
      yield
    } else {
      for (let teacher = 0; teacher < M; teacher++) {
        for (let course in teacherClassCourseCount[teacher][clazz]) {
          if (assigned[teacher]
            || !teacherClassCourseCount[teacher][clazz][course]
            || !dayClassCourseCount[timeToDay[time]][clazz][course]) {
            continue
          }

          teacherClassCourseCount[teacher][clazz][course]--
          dayClassCourseCount[timeToDay[time]][clazz][course]--
          assigned[teacher] = X[time][teacher][clazz][course] = true

          yield* generateTeacherCourses(time, clazz + 1, assigned)

          assigned[teacher] = X[time][teacher][clazz][course] = false
          dayClassCourseCount[timeToDay[time]][clazz][course]++
          teacherClassCourseCount[teacher][clazz][course]++
        }
      }
    }
  }
}

export function convertFromTuples(tuples) {
  let M = 0, N = 0, K = 0, teacherClassCourseCount
  const teacherMap = new Map(), classMap = new Map(), courseMap = new Map()
  for (let tuple of tuples) {
    const [teacher, clazz, course] = tuple
    if (!teacherMap.has(teacher)) {
      teacherMap.set(teacher, M++)
    }
    if (!classMap.has(clazz)) {
      classMap.set(clazz, N++)
    }
    if (!courseMap.has(course)) {
      courseMap.set(course, K++)
    }
  }
  teacherClassCourseCount = createArray(M, N, K)
  for (let tuple of tuples) {
    const [teacher, clazz, course, count] = tuple
    teacherClassCourseCount[teacherMap.get(teacher)][classMap.get(clazz)][courseMap.get(course)] = count
  }
  return [teacherMap, classMap, courseMap, teacherClassCourseCount]
}

// const iterator = generateTimeTable(T, M, N, K, teacherClassCourseCount, timeToDay)
// let next = iterator.next()
// while(!next.done) {
//   console.log(next.value)
//   next = iterator.next()
// }