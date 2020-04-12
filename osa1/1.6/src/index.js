import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

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
    console.log('bads', bad)
    console.log('neutrals', neutral)
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={goodClick} text='good' />
            <Button onClick={neutralClick} text='neutral' />
            <Button onClick={badClick} text='bad' />
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>

    </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)