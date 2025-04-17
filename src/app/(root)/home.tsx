import React, { useState } from 'react';
import { images } from '@/constants';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, Image } from 'react-native';

// TELA DASHBOARD (agora é o componente principal)
export default function DashboardScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastTrips, setLastTrips] = useState([
    { id: '1', destination: 'Paris', date: '2025-04-12' },
    { id: '2', destination: 'New York', date: '2025-03-30' },
    { id: '3', destination: 'Tokyo', date: '2025-03-25' },
  ]);

  const onSearchChange = (text: string) => setSearchTerm(text);
  const handleTripClick = (destination: string) =>
    Alert.alert('Viagem Selecionada', `Destino: ${destination}`);

  return (
    <View style={{ flex: 1 }}>
      {/* Barra de Pesquisa */}
      <View style={{ padding: 16, backgroundColor: '#fff' }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            paddingLeft: 8,
            marginBottom: 16,
          }}
          placeholder="Pesquise por destino"
          value={searchTerm}
          onChangeText={onSearchChange}
        />
      </View>
      {/* Imagem Mapa */}
      <View style={{
         height: 150,                   // Altura reduzida
        marginHorizontal: 16,          // Margem nas laterais
        marginVertical: 8,             // Espaço acima e abaixo
        borderRadius: 8,               // Bordas arredondadas
        overflow: 'hidden',            // Corta o conteúdo para respeitar o borderRadius
        backgroundColor: '#f5f5f5',    // Cor de fundo (opcional)
        }}>
        <Image 
        source={images.mapa} 
        style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',       // Preenche o espaço mantendo proporção
        }}
  />
</View>

      {/* Últimas Viagens */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Últimas Viagens</Text>
        <FlatList
          data={lastTrips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#f8f8f8',
                padding: 10,
                marginVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => handleTripClick(item.destination)}
            >
              <Text style={{ fontSize: 16 }}>{item.destination}</Text>
              <Text style={{ color: '#777' }}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}