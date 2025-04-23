import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-51.0664, 0.0346], // Marco Zero do Amapá
      zoom: 15
    });

    // Adiciona controle de navegação (opcional)
    map.addControl(new maplibregl.NavigationControl());

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}