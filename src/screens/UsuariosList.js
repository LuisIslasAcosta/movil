import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UsuariosLista = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'Debes iniciar sesión para acceder a esta página.');
        navigation.navigate('Iniciar');
        return;
      }
      try {
        const response = await fetch('http://3.148.205.107/usuario/todos');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Hubo un problema al obtener los usuarios.');
      }
    };
    fetchUsuarios();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('Iniciar');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.foto_perfil || 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Email: {item.email}</Text>
            <Text style={styles.info}>Teléfono: {item.telefono || 'No registrado'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logoutButton: { backgroundColor: '#dc3545', padding: 10, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10, shadowColor: '#000' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
});

export default UsuariosLista;