import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
    console.log(part1.exercises)

    return (
        <div>
            
            <Header course={course} />
            <Content part1={part1.name} exercises1={part1.exercises}
                part2={part2.name} exercises2={part2.exercises}
                part3={part3.name} exercises3={part3.exercises} />
           <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
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
            <Part part={props.part1} excercise={props.exercises1} />
            <Part part={props.part2} excercise={props.exercises2} />
            <Part part={props.part3} excercise={props.exercises3} />
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
