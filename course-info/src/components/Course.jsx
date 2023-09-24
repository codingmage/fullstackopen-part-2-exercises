const Header = ({ name }) => {
    return <h1>{ name }</h1>
  }
  
const Total = ({ exercisesArray }) => {
    const sumOfExercises = exercisesArray.reduce((acc, currentValue) => acc + currentValue.exercises, 0)
    return <b>Total of {sumOfExercises} exercises</b>
}
  
const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header name={ course.name } />
        <Content parts={ course.parts }  />
        <Total exercisesArray={ course.parts }/>
      </div>
    )
}

export default Course
  