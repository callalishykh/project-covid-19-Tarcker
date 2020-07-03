import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchData } from "./api";

import Cards from "./components/cards/cards";
import Charts from "./components/charts/charts";
import CountryPicker from "./components/countryPicker/countryPicker";
import covidImage from "./images/covid-19.png";
class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const data1 = await fetchData();
    this.setState({ data: data1 });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data: data, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={covidImage} alt="covid-19" className={styles.image}></img>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
