import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GenerateDate from './generateDate';

// 🔧 Configuramos los íconos del mapa (Leaflet por defecto no los carga bien sin esto)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Mapa = () => {
  const [empresasOriginal, setEmpresasOriginal] = useState([]); // lista completa
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]); // lista que se va mostrando
  const [searchTerm, setSearchTerm] = useState(''); // lo que el usuario escribe
  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  // ✅ Cargar datos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('datosEmpresa')) || {};
    const empresasConCoordenadas = Object.values(stored)
      .filter((empresa) => empresa.coordenadas)
      .map((empresa) => {
        const [latStr, lngStr] = empresa.coordenadas.split(',');
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        return {
          ...empresa,
          coordenadas: [lat, lng],
        };
      });
    setEmpresasOriginal(empresasConCoordenadas); // guardar copia completa
    setEmpresasFiltradas(empresasConCoordenadas); // mostrar todo al principio
  }, []);

  // 🔎 Actualizar resultados al escribir
  useEffect(() => {
    const resultado = empresasOriginal.filter((empresa) =>
      empresa.nombreLocal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEmpresasFiltradas(resultado);
  }, [searchTerm, empresasOriginal]);

  const handleVerMas = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEmpresaSeleccionada(null);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>

      {/* 🔍 Input de búsqueda */}
      <div style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
      </div>

      {/* 🗺️ Mapa */}
      <MapContainer
        center={[22.256260, -97.850825]}
        zoom={13}
        style={{
          height: "calc(100% - 60px)", // deja espacio para el input arriba
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {empresasFiltradas.map((empresa, index) => (
          <Marker key={index} position={empresa.coordenadas}>
            <Popup>
              <strong>{empresa.nombreLocal}</strong><br />
              {empresa.direccion}<br />
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={() => handleVerMas(empresa)}
              >
                Solicitar cita
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 💬 Modal para agendar cita */}
      {modalVisible && (
        <GenerateDate
          show={modalVisible}
          onClose={cerrarModal}
          empresa={empresaSeleccionada}
        />
      )}
    </div>
  );
};

export default Mapa;
