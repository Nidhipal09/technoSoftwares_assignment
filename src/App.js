import React, { useEffect } from 'react'
import XMLParser from 'react-xml-parser';
let axios = require("axios");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    const res = await axios.get("https://api.morningstar.com/service/mf/DailyReturnIndex/isin/LU0056508442?accesscode=w9u021kzu8m1res1z5vzt0z4j5f39fur&startdate=2020-12-03&enddate=2021-12-14&frequency=D");
    let resData = res.data;
    var xmlData = new XMLParser().parseFromString(resData);
    this.setState({
      data: xmlData.children[0].children[0].children
    })
    console.log(this.state.data);
  }


  render() {

    return (
      <div>
        <h2 style={{marginLeft: "500px"}}>Fetched API data</h2>
        <table style={{marginLeft: "500px"}}>
          <thead>
            <tr>
              <th style={{width:'5rem'}}>Value</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((item) => (
                <tr>
                  <td>{item.attributes.v}</td>
                  <td>{item.attributes.d}</td>
                </tr>

              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App