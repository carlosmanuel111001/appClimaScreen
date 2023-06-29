import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const countries = ['Nicaragua', 'Panama', 'Costa Rica'];
const ClimaScreen = () => {
  const [climaData, setClimaData] = useState(null);
  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromises = countries.map(country =>
          axios.get(
            `https://api.weatherapi.com/v1/current.json?key=89360fad86344f86abb203340232906&q=${country}&lang=es`,
          ),
        );
        const responses = await Promise.all(responsePromises);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };
    fetchClimaData();
  }, []);

  if (!climaData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando ... </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {climaData.map((clima, index) => (
        <View key={index} style={styles.climaContainer}>
          <Text style={styles.text}>
            Ubicación: {clima.location.name}, {clima.location.region},{' '}
            {clima.location.country}
          </Text>
          <Text>Temperatura: {clima.current.temp_c}ºC</Text>
          <Text>Condición: {clima.current.condition.text}</Text>
          <Text style={styles.text}>Viento: {clima.current.wind_kph} kph</Text>
          <Text style={styles.text}>Humedad: {clima.current.humidity}%</Text>
          <Text>---------------------------------</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  climaContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  separator: {
    marginTop: 10,
    textAlign: 'center',
  },
});
export default ClimaScreen;
