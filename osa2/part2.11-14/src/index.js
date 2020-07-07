import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ nameToShow, setNameToShow ] = useState('')
  const [data1, setData1] = useState('')
  const [data2, setData2] = useState('')
  const [weather,setWeather] = useState('')
  const [capital, setCapital] = useState('helsinki')
  const [image, setImage] = useState(null)

  const rData = data1[0]
  const dData = data2
  const api_key = process.env.REACT_APP_API_KEY
  

  const HandleCountryChange = (event) => {
    console.log(event.target.value)
    setNameToShow(event.target.value)
    console.log(`https://restcountries.eu/rest/v2/name/` + nameToShow)
    console.log('effect')
    axios
    .get(`https://restcountries.eu/rest/v2/name/${nameToShow}`)
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      setData1(response.data)
    })
  }

  const FindCountries = () => {
    
    return (
    <div> find countries: 
    <input 
      value={nameToShow} 
      onChange={HandleCountryChange}
    />
    </div>
    )
  }

  const CountryData = () => {
    console.log("name to show", nameToShow)
    console.log('render', countries.length , 'countries')  
    
    if(countries.length === 1){
      
      return (
      CountryDisplay()
      )
    }
    if(countries.length <= 10 && countries.length > 0){
    return (
        CountryList()
      )
    }
    else {return <>Too many/few matches, specify another filter</>}
  }
  console.log("current capital", capital)
  const CountryList = () =>{
    const OnClickEvent = (countryName) =>{
      console.log("click")
      console.log(countryName)
      
      axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      setData1(response.data)
      setCapital(response.data[0].capital)
    })
    
    
    }
    return (
      countries.map((country,i) => <div key={i}>{country.name} 
      <button onClick={() => OnClickEvent(country.name)}>show</button></div>
       )
      )
  }

  const CountryDisplay = () => {
    console.log("Data to render", data1)    
    
    console.log(rData.languages.map(lang => <li>{lang.name}</li>))
    const languages = rData.languages.map((lang,i) => <li key={i}>{lang.name}</li>)
    
    axios
      .get(`http://api.openweathermap.org/data/2.5/find?q=${rData.capital}&units=metric&appid=${api_key}`)
      .then(response => {
      console.log(response.data)
      console.log("temperature",response.data.list[0].main.temp)
      setWeather(response.data.list[0].main.temp)
      console.log(response.data.list[0].weather[0].icon)
      setImage(`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`)
      
    })
    
   
      return (
        <>
        <h2>{rData.name}</h2> 
        <div></div>
        <div>capital {rData.capital}</div>
        <div>population {rData.population}</div>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={rData.flag} alt="Logo" width="128" height="128"/>
        <h2>Weather in {rData.capital}</h2>
        <h3>temperature: {weather} Celsius</h3>
        <img src={image} alt="Logo" width="128" height="128"/>
        </>
        )
      
  }

  return (
    <div>
      <FindCountries/>
      
  <div>
    <CountryData/>
  </div>
    </div>
  )
  }

ReactDOM.render(<App />, document.getElementById('root'))
