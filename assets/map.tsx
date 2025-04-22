import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

  export default function InteractiveMap() {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    });
  
    if (loadError) return <div>Erro ao carregar o mapa</div>;
    if (!isLoaded) return <div>Carregando mapa...</div>;
  
    return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: -27.590824, lng: -48.551262 }}
        zoom={15}
      />
    );
  }
  