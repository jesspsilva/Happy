import React, {useEffect, useState} from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage.css';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';
import OrphanagesMap from "./OrphanagesMap";

interface Orphanage {
    latitude: number,
    longitude: number,
    name: string,
    about: string,
    instructions: string,
    opening_hours: string,
    open_on_weekend: string,
    whatsapp_number: number,
    images: Array<{
      id: number;
      url: string;
    }>;
}

interface OrphanageParams {
  id: string,
}

function openWhatsApp(whatsAppNumber: number){
  let url = `https://web.whatsapp.com/send?phone=${whatsAppNumber}`;
  window.open(url);
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  // variável com os dados dos orfanatos que vai ser atualizada com a função setOrphanages
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // parâmetros: que ação quero executar, quando executar
  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
          setOrphanage(response.data);
      })
  }, [params.id]);

  if(!orphanage){
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar/>
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return(
                <button 
                className={activeImageIndex === index ? 'active' : ''}
                type="button" 
                key={image.id} 
                onClick={() =>{
                  setActiveImageIndex(index);
                }}>
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekend ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ): (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              };
            </div>
            {orphanage.whatsapp_number != null && (
                <button className="contact-button" onClick={() => openWhatsApp(orphanage.whatsapp_number)}>
                    <FaWhatsapp name="whatsapp" size={24} color="#FFF" />
                    Contactar
                </button>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}