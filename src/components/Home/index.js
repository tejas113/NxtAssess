import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

class Home extends Component {
  state = {
    questions: [],
  }

  componentDidMount() {
    this.fetchAndStart()
  }

  logout = () => {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    Cookies.remove(jwtToken)
    history.replace('/login')
  }

  handleStartAssessment = () => {
    const {history} = this.props
    history.push('/assessment') // Assuming '/assessment' is the path for the assessment page
  }

  fetchAndStart = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedQuestions = fetchedData.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionText: question.question_text,
        options: question.options.map(option => ({
          id: option.id,
          isCorrect: option.is_correct,
          text: option.text,
          imageUrl: option.image_url,
        })),
      }))

      this.setState({
        questions: updatedQuestions,
      })
    }
  }

  render() {
    return (
      <div>
        <header className="headerEdit">
          <div className="ff">
            <img
              src="https://res.cloudinary.com/dcxgbntsc/image/upload/v1712654669/f6fhuaadjlvrqxsjci1i.png"
              alt="ff"
              className="logoEdit"
            />
            <img
              src="https://res.cloudinary.com/dcxgbntsc/image/upload/v1712654853/micqdyyuyqf8xkqyqrcn.png"
              alt="ff"
            />
          </div>
          <button className="btnEdit" type="button" onClick={this.logout}>
            Logout
          </button>
        </header>
        <div className="mainCont">
          <div className="instructionCard">
            <h1 className="a1">Instructions</h1>

            <li className="a">Total Questions:10</li>
            <li className="a">Types of Question:MCQS</li>
            <li className="a">Duration: 10 Mins</li>
            <li className="a">
              Marking Scheme: Every Correct response, get 1 mark
            </li>
            <li className="a">
              All the progress will be lost, if you reload during the assessment
            </li>
            <button
              className="btnEdit"
              type="button"
              onClick={this.handleStartAssessment}
            >
              Start Assessment
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dcxgbntsc/image/upload/v1712576755/rgxbredvozpzmnyvypi2.png"
            alt="dd"
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
