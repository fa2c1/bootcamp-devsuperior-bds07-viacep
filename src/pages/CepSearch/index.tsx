import './styles.css';

import ResultCard from 'components/ResultCard';
import React, { useState } from 'react';
import axios from 'axios';

type FormData = {
  cep: string;
}

type Address = {
  "cep": string;
  "logradouro": string;
  "complemento": string;
  "bairro": string;
  "localidade": string;
  "uf": string;
  "ibge": string;
  "gia": string;
  "ddd": string;
  "siafi": string;
}

const CepSearch = () => {

  const [formData, setFormData] = useState<FormData>({
    cep: ''
  })

  const [address, setAddress] = useState<Address>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData( { ...formData, [name]:value } )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.get(`https://viacep.com.br/ws/${formData.cep}/json`)
    .then((response) => {
      setAddress(response.data);
    })
    .catch((error) => {
      setAddress(undefined);
      console.log(error);
    });
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        {address &&
          <>
            <ResultCard title="CEP" description={address.cep} />
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Complemento" description={address.complemento} />
            <ResultCard title="Bairro" description={address.bairro} />
            <ResultCard title="Localidade" description={address.localidade} />
            <ResultCard title="UF" description={address.uf} />
            <ResultCard title="IBGE" description={address.ibge} />
            <ResultCard title="GIA" description={address.gia} />
            <ResultCard title="DDD" description={address.ddd} />
            <ResultCard title="SIAF" description={address.siafi} />
          </>
        }

      </div>
    </div>
  );
};

export default CepSearch;
