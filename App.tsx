import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Iniciar from './src/screens/Iniciar';
import UsuariosLista from './src/screens/UsuariosList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Iniciar">
        <Stack.Screen name="Iniciar" component={Iniciar} />
        <Stack.Screen name="UsuariosLista" component={UsuariosLista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});