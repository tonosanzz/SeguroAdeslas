import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import logo from '../images/logo.png';
import './dni.css';
import { saveUser,} from '../useStorage';
import { useNavigate } from 'react-router-dom';





const InicioSesionPoliza = (props ) => {
  
  const [loginInfo, setLoginInfo] = useState({
    poliza: '',
    
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/iniciodesesion/poliza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireccionar al usuario según el tipo de seguro
        switch (data.seguro) {
          case 'vital':
            navigate('../paginausuario/vital');
            break;
          case 'plena':
            navigate('../paginausuario/plena');
            break;
          case 'plus':
            navigate('../paginausuario/plus');
            break;
          case 'extra':
            navigate('../paginausuario/extra');
            break;
          default:
            console.error('Tipo de seguro no reconocido');
        }
      } else {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error(error.message);
      setError(true);
      // Manejar el error aquí (mostrar un mensaje al usuario, etc.)
    }
  };

  return (
    <div>
      <header className="button-container">
        
      </header>
      <div className="button-container">
        <h2>INICIA SESIÓN</h2>
        {error && <p>Credenciales incorrectas</p>}
        <br />
        
          <form onSubmit={handleSubmit}>
            <div className="inputs">
            <input
              type="number"
              name="poliza"
              value={loginInfo.poliza}
              onChange={handleChange}
              placeholder="Poliza"
              required
            />
            </div>
            <button id="iniciasesion" type="submit">
              Iniciar sesión
            </button>
          </form>
        
        <br/>
          <p>
          <div>
            <a href="https://login.segurcaixaadeslas.es/auth/realms/ssoextadeslas/login-actions/reset-credentials?client_id=http%3A%2F%2Fadfs.segurcaixaadeslas.es%2Fadfs%2Fservices%2Ftrust&tab_id=73aOgYfZ5N8" target="_blank" >¿Ha olvidado la contraseña?</a>
          </div>
          </p>
          
        <br />
        <p>
        <Link id="poliza" to="/iniciodesesion/dni">
            Iniciar sesión con el número de DNI
        </Link>
        </p>
        <br/>
        <p>
        <div>
            <a href="https://www.segurcaixaadeslas.es/particulares/encuentra-tu-seguro" target="_blank" >Ver todos los seguros de Salud</a>
        </div>
          </p>
      </div>
    </div>
  );
};

export default InicioSesionPoliza;
