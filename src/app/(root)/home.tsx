import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InteractiveMap from '../../../assets/map';


interface Trip {
  id: string;
  destination: string;
  date: string;
}

const COLORS = {
  primary: '#fff',
  secondary: '#f8f8f8',
  border: '#e0e0e0',
  text: '#333',
  textMuted: '#777',
};

export default function DashboardScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastTrips, setLastTrips] = useState<Trip[]>([
    { id: '1', destination: 'Paris', date: '2025-04-12' },
    { id: '2', destination: 'New York', date: '2025-03-30' },
    { id: '3', destination: 'Tokyo', date: '2025-03-25' },
  ]);

  const filteredTrips = lastTrips.filter(trip =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTripClick = (destination: string) => {
    Alert.alert('Viagem Selecionada', `Destino: ${destination}`);
  };

  const TripCard = ({ trip }: { trip: Trip }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => handleTripClick(trip.destination)}
      accessibilityLabel={`Viagem para ${trip.destination} em ${trip.date}`}
    >
      <Text style={styles.tripDestination}>{trip.destination}</Text>
      <Text style={styles.tripDate}>{trip.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise por destino"
          placeholderTextColor={COLORS.textMuted}
          value={searchTerm}
          onChangeText={setSearchTerm}
          accessibilityLabel="Campo de pesquisa de destinos"
        />
      </View>

      {/* Mapa Interativo */}
      <View style={styles.mapContainer}>
        <InteractiveMap />
      </View>

      {/* Lista de Viagens */}
      <View style={styles.tripsContainer}>
        <Text style={styles.sectionTitle}>Últimas Viagens</Text>
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TripCard trip={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma viagem encontrada</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    color: COLORS.text,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tripsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text,
  },
  tripCard: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  tripDestination: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  tripDate: {
    color: COLORS.textMuted,
    marginTop: 4,
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 20,
    fontSize: 16,
  },
});