import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import QuestionPage from '../QuestionPage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Fetch extends Component {
  state = {
    questions: [],
    apiStatus: apiStatusConstants.initial,
    currentQuestionIndex: 0,
  }

  componentDidMount() {
    this.getFetchQuestions()
  }

  getFetchQuestions = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionText: question.question_text,
        options: question.options.map(option => ({
          qid: option.id,
          isCorrect: option.is_correct,
          text: option.text,
          imageUrl: option.image_url,
        })),
      }))
      this.setState({
        questions: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      if (response.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
  }

  retry = () => {
    this.getFetchQuestions()
  }

  renderFailureView = () => (
    <div className="failureViewEdit">
      <img
        alt="s"
        src="https://res.cloudinary.com/dcxgbntsc/image/upload/v1712666331/vvwnkg8kli8kufq8k5gh.png"
      />
      <p className="f">Oops something went wrong</p>
      <button className="btn" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  handleNextQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }))
  }

  renderSuccessView = () => {
    const {questions, currentQuestionIndex} = this.state
    const currentQuestion = questions[currentQuestionIndex]
    return (
      <QuestionPage
        questionDetails={currentQuestion}
        onNextClick={this.handleNextQuestion}
      />
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Fetch
