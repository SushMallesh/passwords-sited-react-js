import {Component} from 'react'
import {v4 as uid} from 'uuid'
import YourPasswords from '../YourPasswords'
import './index.css'

const initialClassNamesList = [
  'card-1',
  'card-2',
  'card-3',
  'card-4',
  'card-1',
  'card-2',
  'card-3',
  'card-4',
]

const webSiteInputs = [
  {
    id: 1,
    iconUrl:
      'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png ',
    iconAltText: 'website',
    inputType: 'text',
    placeholderValue: 'Enter Website',
  },
  {
    id: 2,
    iconUrl:
      'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png',
    iconAltText: 'username',
    inputType: 'text',
    placeholderValue: 'Enter Username',
  },
  {
    id: 3,
    iconUrl:
      'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png',
    iconAltText: 'password',
    inputType: 'password',
    placeholderValue: 'Enter Password',
  },
]

const searchInputDetails = {
  id: 4,
  iconUrl:
    'https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png ',
  iconAltText: 'search',
  inputType: 'search',
  placeholderValue: 'Search',
}

class PasswordManager extends Component {
  state = {
    websiteDetails: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  onAddPassword = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const initialIndex = Math.ceil(Math.random() * 7)
    const newWebsiteDetails = {
      id: uid(),
      website,
      username,
      password,
      initialClassName: initialClassNamesList[initialIndex],
    }

    this.setState(prevState => ({
      websiteDetails: [...prevState.websiteDetails, newWebsiteDetails],
      username: '',
      website: '',
      password: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePasswordItem = id => {
    this.setState(prevState => ({
      websiteDetails: prevState.websiteDetails.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  renderWebsiteForm = () => {
    const {website, username, password} = this.state
    return (
      <form onSubmit={this.onAddPassword} className="form-container">
        <h1 className="form-heading">Add New Password</h1>

        <div className="input-container">
          <img
            className="icon"
            src={webSiteInputs[0].iconUrl}
            alt={webSiteInputs[0].iconAltText}
          />
          <input
            value={website}
            onChange={this.onChangeWebsite}
            className="input"
            placeholder={webSiteInputs[0].placeholderValue}
            type={webSiteInputs[0].inputType}
          />
        </div>
        <div className="input-container">
          <img
            className="icon"
            src={webSiteInputs[1].iconUrl}
            alt={webSiteInputs[1].iconAltText}
          />
          <input
            value={username}
            onChange={this.onChangeUsername}
            className="input"
            placeholder={webSiteInputs[1].placeholderValue}
            type={webSiteInputs[1].inputType}
          />
        </div>
        <div className="input-container">
          <img
            className="icon"
            src={webSiteInputs[2].iconUrl}
            alt={webSiteInputs[2].iconAltText}
          />
          <input
            value={password}
            onChange={this.onChangePassword}
            className="input"
            placeholder={webSiteInputs[2].placeholderValue}
            type={webSiteInputs[2].inputType}
          />
        </div>

        <button className="add-button" type="submit">
          Add
        </button>
      </form>
    )
  }

  renderPasswordsView = () => {
    const {websiteDetails, searchInput, isChecked} = this.state
    const filteredDetails = websiteDetails.filter(eachItem =>
      eachItem.username.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <ul className="passwords-list-container">
        {filteredDetails.map(eachWebsite => (
          <YourPasswords
            onDeletePasswordItem={this.onDeletePasswordItem}
            webDetails={eachWebsite}
            key={eachWebsite.id}
            isChecked={isChecked}
          />
        ))}
      </ul>
    )
  }

  renderNoPasswordView = () => (
    <div className="no-password-view">
      <img
        className="no-passwords-image"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="no-password-message">No passwords</p>
    </div>
  )

  onClickCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {websiteDetails, searchInput} = this.state
    const isNonEmptyList = websiteDetails.length > 0
    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="responsive-container">
          <img
            className="password-manager-sm-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <img
            className="password-manager-lg-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
          {this.renderWebsiteForm()}
        </div>
        <div className="passwords-container">
          <div className="passwords-header">
            <div className="notifications-card">
              <h1 className="form-heading">Your Passwords</h1>
              <p className="notification-count">{websiteDetails.length}</p>
            </div>
            <div className="input-container">
              <img
                className="icon"
                src={searchInputDetails.iconUrl}
                alt={searchInputDetails.iconAltText}
              />
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="input"
                placeholder={searchInputDetails.placeholderValue}
                type={searchInputDetails.inputType}
              />
            </div>
          </div>
          <div className="show-password-card">
            <input
              onClick={this.onClickCheckbox}
              className="checkbox"
              id="showPassword"
              type="checkbox"
            />
            <label className="label" htmlFor="showPassword">
              Show passwords
            </label>
          </div>

          {isNonEmptyList
            ? this.renderPasswordsView()
            : this.renderNoPasswordView()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
