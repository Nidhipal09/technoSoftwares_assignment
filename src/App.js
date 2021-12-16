import React, { useEffect } from 'react'
import XMLParser from 'react-xml-parser';
let axios = require("axios");

function App() {
  const baseURL = "https://api.morningstar.com/service/mf/DailyReturnIndex/isin/LU0056508442?accesscode=w9u021kzu8m1res1z5vzt0z4j5f39fur&startdate=2020-12-03&enddate=2021-12-14&frequency=D";

  const [data, setData] = React.useState([]);

  useEffect(() => {
    axios.get(baseURL)
      .then(res => res.text())
      .then(XMLData => {
        var jsonDataFromXml = new XMLParser().parseFromString(XMLData);
        setData(jsonDataFromXml.getElementsByTagName('r'));
      })
      .catch(err => console.log(err));

  }, [])

  return (
    <div>
      <h2>Fetched API data</h2>
      <table>
        <tr>
          <th>Value</th>
          <th>Date</th>
        </tr>
        {
          {data}.map((item) =>
            <tr>
              <td>{item.v}</td>
              <td>{item.d}</td>
            </tr>
          )
        }

      </table>
    </div>
  )
}

export default App