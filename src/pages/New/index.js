import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './style.css'
import { async } from 'q';

export default function New({ history }){
    const [company, setComapny] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {
            return  thumbnail ? URL.createObjectURL(thumbnail) : null
        }, [thumbnail]
    );
    async function handleSubmit(event){
        event.preventDefault();


        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);
        data.append('thumbnail',thumbnail);

        await api.post('/spots',data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}>
                <input 
                type="file"
                onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>


            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="Sua Empresa incrvel"
                value={company}
                onChange={event => setComapny(event.target.value)}
            /> 
             <label htmlFor="techs">TECNOLOGIAS * <span>Separadas por virgula</span></label>
            <input
                id="techs"
                placeholder="Quais Tecnologias usam ?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">Valor da diaria * <span>em branco para gratuito</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            /> 
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}