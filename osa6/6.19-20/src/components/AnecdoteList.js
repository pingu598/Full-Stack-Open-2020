import React from 'react'
import { connect } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    
    const vote = (id, content, votes) => {
        console.log('vote', id)
        props.voteAnec(content, id, votes)
        props.voteNotification(content)
      }

return(
    <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
            </div>
        ).sort(function(a, b) {
            return b.props.children[1].props.children[1] - a.props.children[1].props.children[1]
        })}
    </div>
   )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes
    }
  }
const mapDispatchToProps = {
    voteAnec,
    voteNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)


export default ConnectedAnecdotes