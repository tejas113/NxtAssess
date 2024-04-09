import {Component} from 'react'
import './index.css'

class QuestionPage extends Component {
  handleNextQuestion = () => {
    const {onNextClick} = this.props
    onNextClick()
  }

  render() {
    const {questionDetails} = this.props
    const {id, optionsType, questionText, options} = questionDetails
    const {qid, isCorrect, text, imageUrl} = options

    return (
      <div>
        <h2>{questionText}</h2>
        <ul>
          {options.map(option => (
            <li key={option.qid}>
              <input type="radio" id={option.qid} name="option" />
              <label htmlFor={option.qid}>{option.text}</label>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.handleNextQuestion}>
          Next Question
        </button>
      </div>
    )
  }
}

export default QuestionPage
