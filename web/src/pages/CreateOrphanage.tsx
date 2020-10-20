import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";

import '../styles/pages/create-orphanage.css';
import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
const history = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekend, setOpenOnWeekend] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [whatsapp_number, setWhatsappNumber] = useState('');
  const [errors, setErrors] = useState(false);
  
  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(){
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekend', String(open_on_weekend));
    data.append('whatsapp_number', String(whatsapp_number));
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    history.push('/successMessage');

  }


  function handleErrors(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if((name && about && instructions && opening_hours && whatsapp_number !== '') && (position.latitude && position.longitude !== 0) && (images.length > 0)){
      setErrors(false);
      handleSubmit();
    } else {
      setErrors(true);
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[41.1581635,-8.6304085]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker 
                interactive={false} 
                icon={mapIcon} 
                position={[position.latitude,position.longitude]} />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={ e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={ e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Número de Whatsapp</label>
              <input id="whatsapp_number" value={whatsapp_number} onChange={ e => setWhatsappNumber(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img src={image} alt={name} key={image}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={ e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={ e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekend ? 'active': ''}
                onClick={() => setOpenOnWeekend(true)}
                >Sim
                </button>
                <button 
                type="button"
                className={!open_on_weekend ? 'active': ''}
                onClick={() => setOpenOnWeekend(false)}
                >Não
                </button>
              </div>
            </div>
          </fieldset>
          <div className="error">
          <p className={errors ? 'show': 'hide'}>
            * Todos os campos são de preenchimento obrigatório
          </p>
          </div>
          <button className="confirm-button" type="submit" onClick={handleErrors}>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
