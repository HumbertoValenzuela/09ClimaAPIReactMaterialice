import React, { Fragment, useEffect, useState } from 'react';

import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';


// https://home.openweathermap.org/api_keys

// clima react
function App() {

  // useState para obtener la info del componente Formulario ciudad y pais
  const [busquedas, guardarBusquedas] = useState({
    ciudad: '',
    pais: '',
  });

  // 116 Escribiendo la función para consultar la API
  // al cuando sea true ejecutar useEffect
  const [consultar, guardarConsultar] = useState( false );

  // 118 Mostrando el Clima y Resultado de la API
  const [ resultado, guardarResultado ] = useState( {} );

  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busquedas;

  useEffect(() => {
  //  console.log(ciudad);
    const consultarAPI = async () => {
      // api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
      // https://api.openweathermap.org/data/2.5/weather?q=valparaiso,cl&appid=244c651a3717aca5ec8e20f43124b1be

      // const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      
      if ( consultar ) {
        const appId = '244c651a3717aca5ec8e20f43124b1be';
        // Petición estructurada hacía la API clima
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuestaClima = await fetch(url);
        const resultadoClima = await respuestaClima.json();
  
        //console.log(resultadoClima);// 404 not found se ejecuta al comenzar la página. Se corrige con useState(booleano) (consultar)   
          //  El resultado es un objeto { }
        guardarResultado( resultadoClima );
        // Para que vuelva a consultar y cambie 
        guardarConsultar( false );
        // 119 Verificando que haya resultados. error 404 not found
        // El objeto resultadoClima tiene cod 200 correcto 404 not found
        
          if ( resultado.cod === '404') {
            guardarError( true );
            console.log('aca error 404');
          } else {
            guardarError( false );
            console.log('aca 200');
          }
      }

    }

    consultarAPI();
    // eslint-disable-next-line
  }, [ consultar, resultado.cod ]);

  // Carga condicional de componente
  let componente;

  if ( error ) { // true o false
    componente = <Error mensaje='No hay resultados' />  
  } else {
    componente = <Clima resultado= { resultado } />
  }
  return (
    <Fragment>
      <Header 
        titulo='Clima react APP'
      />

      <div className="contenedor-form"> 
        <div className="container">
          {/* row utlizamos css grid */}
          <div className="row">
            {/* Tamaño mediano tome 6 de las 12 columnas. Pequeño las 12 */}
            <div className="col m6 s12">
              <Formulario 
                
                guardarBusquedas= { guardarBusquedas }
                guardarConsultar = { guardarConsultar }
              />
            </div>
            <div className="col m6 s12">
              {/* <Clima 
                resultado= { resultado }
              /> */}
              { componente }
            </div>
          </div> 

        </div>
      </div>
    </Fragment>
  );
}

export default App;
