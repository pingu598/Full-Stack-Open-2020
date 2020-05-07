import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)
const Statistics = (props) => {
    const { good, neutral, bad, total, average } = props
    if (total === 0) {
        return (
            <>
                <p>No feedback given</p>                          
            </>
        )
    } else {

        return (
            <>
                
                <StatisticLine text="good" value={good} /> 
                
                <StatisticLine text="neutral" value={neutral} />
               
                <StatisticLine text="bad" value={bad} />
                
                <StatisticLine text="all" value={total} />
                
                <StatisticLine text="average" value={average} />

                <StatisticLine text="positive" value={good / total} symbol="%" />
            </>
        )
    }
}
const StatisticLine = ({ text,value,symbol }) => {

    return (
        <tr>
            <td>{text}</td> 
            <td>{value} {symbol}</td>
        </tr>
        )
}

const App = () => {
    
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const total = good + bad + neutral
    const average = (good * 1 + neutral * 0 + bad * -1) / total
   

    const goodClick = () => {
        setGood(good + 1)
    }

    const neutralClick = () => {
        setNeutral(neutral + 1)
    }

    const badClick = () => {
        setBad(bad + 1)
    }
    
    console.log('goods', good)
    console.log('neutrals', neutral)
    console.log('bads', bad)
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={goodClick} text='good' />
            <Button onClick={neutralClick} text='neutral' />
            <Button onClick={badClick} text='bad' />
            <h1>statistics</h1>           
            <Statistics good={good} neutral={neutral} bad={bad}
                total={total} average={average}
            />

    </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)