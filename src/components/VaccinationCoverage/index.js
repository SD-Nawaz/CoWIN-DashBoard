// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageDetails} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={vaccinationCoverageDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill=" #5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
