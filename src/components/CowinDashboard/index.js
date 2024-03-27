// Write your code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const statusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class CowinDashBoard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: statusConstant.initial,
  }

  componentDidMount() {
    this.getVaccination()
  }

  getVaccination = async () => {
    this.setState({apiStatus: statusConstant.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(byGender => ({
          count: byGender.count,
          gender: byGender.gender,
        })),
      }

      this.setState({
        vaccinationData: formattedData,
        apiStatus: statusConstant.success,
      })
      console.log(formattedData)
    } else {
      this.setState({
        apiStatus: statusConstant.failure,
      })
    }
  }

  renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderfinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case statusConstant.success:
        return this.renderSuccessView()
      case statusConstant.failure:
        return this.renderFailureView()
      case statusConstant.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="dash-board">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderfinalView()}
        </div>
      </div>
    )
  }
}

export default CowinDashBoard
