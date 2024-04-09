import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const inputType = showPassword ? 'text' : 'password'

    return (
      <div className="main">
        <form className="formCard" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dcxgbntsc/image/upload/v1712567537/ustxbfhx6rqtyqyrhgq7.png"
            alt="cc"
          />
          <div className="inputCont">
            <label htmlFor="username" className="labelEdit">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="inputContEdit"
              value={username}
              onChange={this.onChangeUsername}
              name="username"
            />
          </div>
          <div className="inputCont">
            <label htmlFor="password" className="labelEdit">
              PASSWORD
            </label>
            <input
              type={inputType} // Apply dynamic input type
              id="password"
              className="inputContEdit"
              value={password}
              onChange={this.onChangePassword}
              name="password"
            />
          </div>
          <div className="checkBoxCont">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.onShowPassword} // Add onChange event to toggle password visibility
              checked={showPassword} // Bind checked property to showPassword state
            />
            <label htmlFor="checkbox" className="kk">
              Show Password
            </label>
          </div>
          <button type="submit" className="LoginBtnEdit">
            Login
          </button>
          {showSubmitError && <p className="errorEdit">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
