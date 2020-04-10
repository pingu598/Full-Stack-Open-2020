import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    

    return (
        <div>
            
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
        </div>
    )
    
            }
const Header = (props) => {
                return (
                <>
                    <h1>{props.course}</h1>           
                </>
                    )
}
const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0].name} excercise={props.parts[0].exercises} />
            <Part part={props.parts[1].name} excercise={props.parts[1].exercises} />
            <Part part={props.parts[2].name} excercise={props.parts[2].exercises} />
        </div>
                    )
}
const Part = (props) => {
    return (
        <p>
            {props.part} {props.excercise}
        </p>
        )

}

const Total = (props) => {
    console.log(props)
    return (
        <>
            <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>          
        </>
        )
}

ReactDOM.render(<App />, document.getElementById('root'))
