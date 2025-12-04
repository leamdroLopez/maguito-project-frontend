import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import axios from 'axios';
import magoImage from './assets/maguito.png';
import obstaculoImage from './assets/raven.png';
import title from './assets/game-title.png';
import './gameStyle.css';
import gameOver from './assets/game-over.png';
import gandalfImage from './assets/gandalf.gif';
import cuervoBaile from './assets/cuervoBaile.gif';

export default function DinoGame() {
  const [gameState, setGameState] = useState('menu');
  const [nombre, setNombre] = useState('');
  const [personajeId, setPersonajeId] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  
  const dinoYRef = useRef(0);
  const velocidadRef = useRef(5);
  const velocityRef = useRef(0);
  const obstaculoCounterRef = useRef(0);
  const puntosRef = useRef(0);
  const distanciaRef = useRef(0);
  const isJumpingRef = useRef(false);
  const obstaculosRef = useRef([]);
  const canvasRef = useRef(null);
  const frameCountRef = useRef(0);

  // Crear personaje en RavenDB
  const crearPersonaje = async () => {
    if (!nombre.trim()) {
      setError('Ingresa tu nombre');
      return;
    }
    
    try {
      setError('');
      const response = await axios.post(`http://localhost:8080/personaje/crear/${encodeURIComponent(nombre)}`);
      
      const personaje = response.data;
      console.log('Personaje creado:', personaje);
      
      setPersonajeId(personaje.id);
      setPuntos(0);
      setDistancia(0);
      puntosRef.current = 0;
      distanciaRef.current = 0;
      frameCountRef.current = 0;
      obstaculosRef.current = [];
      dinoYRef.current = 0;
      isJumpingRef.current = false;
      velocidadRef.current = 5;
      velocityRef.current = 0;
      obstaculoCounterRef.current = 0;
      setGameState('playing');
    } catch (err) {
      console.error('Error al crear personaje:', err);
      setError('Error conectando con el backend. ¿Está corriendo en localhost:8080?');
    }
  };

  // Guardar muerte en RavenDB
  const guardarMuerte = async () => {
    if (!personajeId) return;
    
    setGuardando(true);
    try {
      console.log('Guardando muerte:', {
        id: personajeId,
        puntos: puntosRef.current,
        distancia: distanciaRef.current
      });
      
      const response = await axios.post(
        `http://localhost:8080/personaje/morir`,
        null,
        {
          params: {
            id: personajeId,
            puntos: puntosRef.current,
            distancia: distanciaRef.current
          }
        }
      );
      
      console.log('Respuesta del servidor:', response.data);
      console.log('Guardado exitoso');
      setGuardando(false);
    } catch (err) {
      console.error('Error completo:', err);
      console.error('Respuesta del error:', err.response);
      setError(`Error al guardar en RavenDB: ${err.message}`);
      setGuardando(false);
    }
  };

  // Saltar
  const jump = useCallback(() => {
    if (!isJumpingRef.current && gameState === 'playing') {
      isJumpingRef.current = true;
      velocityRef.current = -15;
    }
  }, [gameState]);

  // Detectar teclas
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  // Game Loop principal
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Física del salto
      if (isJumpingRef.current || dinoYRef.current < 0) {
        velocityRef.current += 0.6; // gravedad
        dinoYRef.current += velocityRef.current;
        
        if (dinoYRef.current >= 0) {
          dinoYRef.current = 0;
          isJumpingRef.current = false;
          velocityRef.current = 0;
        }
      }

      // Mover obstáculos
      obstaculosRef.current = obstaculosRef.current
       .map(obs => ({ ...obs, x: obs.x - velocidadRef.current }))
        .filter(obs => obs.x > -50);

      // Generar nuevos obstáculos
      obstaculoCounterRef.current++;
      if (obstaculoCounterRef.current > 100) {
        obstaculoCounterRef.current = 0;
        obstaculosRef.current.push({ 
          x: 800, 
          height: 30 + Math.random() * 20 
        });
      }

      // Lógica de puntuación y distancia
      frameCountRef.current++; 
      const updateIntervalFrames = 10; 

      if (frameCountRef.current >= updateIntervalFrames) {
        frameCountRef.current = 0; 
        const basePointIncrement = 10; 
        const baseDistIncrement = 1;   
        let bonus = Math.floor(puntosRef.current / 500) * 2; 
        
        puntosRef.current += basePointIncrement + bonus;
        distanciaRef.current += baseDistIncrement;
        setPuntos(puntosRef.current);
        setDistancia(distanciaRef.current);
      }

      // Detección de colisiones
      const dinoX = 100;
      const dinoWidth = 40;
      const dinoHeight = 50;
      
      for (let obs of obstaculosRef.current) {
        if (
          dinoX < obs.x + 20 &&
          dinoX + dinoWidth > obs.x &&
          dinoYRef.current + dinoHeight > -obs.height
        ) {
          setPuntos(puntosRef.current);
          setDistancia(distanciaRef.current);
          setGameState('gameOver');
          return;
        }
      }
      
      // Aumentar velocidad gradualmente
      velocidadRef.current = Math.min(velocidadRef.current + 0.001, 12);

      // Renderizar
      renderGame();
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  // Función de render
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 800, 300);

    
    // Dibujar suelo
    ctx.fillStyle = '#572e11ff';
    ctx.fillRect(0, 260, 800, 40);
    ctx.fillStyle = '#165316ff';
    ctx.fillRect(0, 255, 800, 5);
    
    // Dibujar mago
    const magoX = 100;
    const magoY = 260 + dinoYRef.current;
    const magoWidth = 84;
    const magoHeight = 84;
    
    const magoImg = new Image();
    magoImg.src = magoImage;
    
    if (magoImg.complete) {
      ctx.drawImage(magoImg, magoX, magoY - magoHeight, magoWidth, magoHeight);
    } else {
      ctx.font = '50px Arial';
      ctx.fillText('🧙‍♂️', magoX, magoY);
    }
    
    
    // Dibujar cuervos ajustados al obstáculo
    const obstaculoImg = new Image();
    obstaculoImg.src = obstaculoImage;
    
    for (let obs of obstaculosRef.current) {
      const collisionWidth = 20;
      const obsHeight = obs.height;
    
      const ravenAspectRatio = 1.5; 
      const ravenWidth = obsHeight * ravenAspectRatio;
      
      if (obstaculoImg.complete) {
        const ravenX = obs.x + collisionWidth / 2 - ravenWidth / 2;
        
        ctx.drawImage(
          obstaculoImg, 
          ravenX,              
          260 - obsHeight,     
          ravenWidth,          
          obsHeight            
        );
      } else {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(obs.x, 260 - obsHeight, collisionWidth, obsHeight);
      }
    }
  };

  // Guardar cuando muere
  useEffect(() => {
    if (gameState === 'gameOver' && personajeId) {
      setTimeout(() => {
        guardarMuerte();
      }, 100);
    }
  }, [gameState, personajeId]);

  // Reiniciar juego
  const reiniciar = async () => {
  try {
    await axios.post('http://localhost:8080/personaje/reset');

    setGameState('menu');
    setPuntos(0);
    setDistancia(0);
    setPersonajeId(null);
    setNombre('');
    setError('');

    puntosRef.current = 0;
    distanciaRef.current = 0;
    frameCountRef.current = 0;
    dinoYRef.current = 0;
    velocidadRef.current = 5;
    velocityRef.current = 0; // <-- corregido
    obstaculoCounterRef.current = 0;
    isJumpingRef.current = false;
    obstaculosRef.current = [];
    
    console.log('Juego reiniciado correctamente');
  } catch (error) {
    console.error('Error al reiniciar el juego:', error);
    setError('No se pudo reiniciar el juego');
  }
};

  return (
    <div className="game-container">

        

        {/* MENÚ */}
        {gameState === 'menu' && (
          <div className="menu-container">
            <img src={title} alt="Maguito vs RavenDB" className="game-title" />
            <div className="menu-name">
            <input
              type="text"
              placeholder="Nombre del mago"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && crearPersonaje()}
              className="menu-input"
            />
            
              <button
                onClick={crearPersonaje}
                className="play-button"
              >
                <Play size={24} />
                Jugar
              </button> 
            
            {error && <p className="error">{error}</p>}
          </div>

            <p className="menu-instructions">
              ESPACIO o ↑ para saltar ¡Que no te agarren los cuervos!
            </p>
          </div>
        )}

        {/* JUEGO */}
        {gameState === 'playing' && (
          <div className="gameplay-container">
            
            <div className="scoreboard">
              <span>{nombre}</span>
              <span>{puntos}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={300}
              onClick={jump}
              className="canvas"
              style={{ maxWidth: '800px', height: 'auto' }}
            />

          </div>
        )}

        {/* GAME OVER */}
        {gameState === 'gameOver' && (
          <div className="gameOver-container">
            <img src={title} alt="Maguito vs RavenDB" className="game-title" />
            {/*<h2 className="gameOver-title">GAME OVER</h2>*/}
            <img src={gameOver} alt="Game Over" className="gameOver-image" />
            <img src={cuervoBaile} alt="Cuervo Bailando" className="cuervo-baile" />
           
           {guardando ? (
              <div className="loading">
                Guardando en RavenDB...
              </div>
            ) : (
              <div className="success">
                El maguito fue secuestrado por RavenDB!
              </div>
            )}

            <div className="game-stats">
              <p className="stats-nombre">Nombre: {nombre}</p>
              <p className="stats-puntos">Puntos: {puntos}</p>
              <p className="stats-distancia">Distancia: {distancia}m</p>
              <button
              onClick={reiniciar}
              className="reset-button"
            >
              <RotateCcw size={24} />
               Reiniciar Juego
            </button>
            </div>

            {error && <p className="error">{error}</p>}

            

            <p className="Indicaciones">
              Revisa la base de datos en RavenDB Studio.
            </p>
          </div>
        )}
      </div>
  );
}