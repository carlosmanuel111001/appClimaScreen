import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const [climaData, setClimaData] = useState(null);

const countries = ['Argentina', 'Brazil', 'Dominican Republic'];

useEffect(() => {
  const fetchClimaData = async () => {
    try {
      const responsePromises = countries.map(country =>
        axios.get(
          'https://api.weatherapi.com/v1/current.json?key=89360fad86344f86abb203340232906=${contry}&lang=es',
        ),
      );
      const responses = await promise.all(responsePromises);
      const climaDataArray = responses.map(response => response.data);
      setClimaData(climaDataArray);
    } catch (error) {
      console.error(error);
    }
  };
  fetchClimaData();
}, []);
