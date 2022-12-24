import './Monster.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../../services/HttpService';

const Monster = (props) => {
    const { id } = useParams();
    const [monster, setMonster] = useState(null)
    const [description, setDescription] = useState(null)

    useEffect(() => {
        getMonster(id);
    }, []);

    const getMonster = async (id) => {
        let response = await fetchGet(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        setMonster(response);
        response = await fetchGet(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        setDescription(response);
    }

    return (
        <div id="monster">
            <div className='container pt-5'>
                {monster !== null &&
                    <div className='row justify-content-center'>
                        <h1 className='col-12 text-center mb-5'>{monster["name"]}</h1>
                        <div className='col-md-3 mb-3'>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
                        </div>
                        <div className='col-md-3'>
                            <div className='info'>
                                <div className='label'>Numéro :</div>
                                <div className='content'>{id}</div>
                            </div>
                            <div className='info'>
                                <div className='label'>Types :</div>
                                <div className='content' id="list-types">
                                    {
                                        monster.types.map((value, key) => {
                                            return (
                                                <article className="onetype" key={key}>
                                                    {value.type.name}
                                                    {key < monster.types.length - 1 &&
                                                        <span> ,</span>
                                                    }
                                                </article>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {description != null &&
                                <section>
                                    <div className='info'>
                                        <div className='label'>Niveau de bonheur :</div>
                                        <div className='content'>{description.base_happiness}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Taux de caption :</div>
                                        <div className='content'>{description.capture_rate}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Génération :</div>
                                        <div className='content'>{description.generation.name}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Bébé :</div>
                                        <div className='content'>{description.is_baby ? 'Oui' : 'Non'}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Légendaire :</div>
                                        <div className='content'>{description.is_legendary ? 'Oui' : 'Non'}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Fabuleux :</div>
                                        <div className='content'>{description.is_mythical ? 'Oui' : 'Non'}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='label'>Forme :</div>
                                        <div className='content'>{description.shape.name}</div>
                                    </div>
                                </section>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Monster;