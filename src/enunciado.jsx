import Lore from "./assets/DibujoRavenLore.jpg";
import LoreFinal from "./assets/RavenLoreFinal.jpg";
import "./enunciado.css";
import { useEffect, useRef, useState } from "react";


export default function Enunciado() {
  const [imagenActual, setImagenActual] = useState(Lore);
  const [fade, setFade] = useState(true);

  const triggerRef = useRef(null);

  const cambiarImagen = (nuevaImagen) => {
    setFade(false); // fade out

    setTimeout(() => {
      setImagenActual(nuevaImagen);
      setFade(true); // fade in
    }, 300); // esto debe coincidir con el CSS
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Opción A: Solo cambiar a LoreFinal si entra a la vista y no cambiar al salir.
        // Esto dejará la imagen en LoreFinal permanentemente después de la primera intersección.
        if (entry.isIntersecting) {
          cambiarImagen(LoreFinal);
        } 
        // Si no quieres que cambie de vuelta al hacer scroll up, elimina el 'else'.
        // Si lo dejas, cambiará de vuelta a Lore cuando el elemento salga por arriba.
        else { 
          cambiarImagen(Lore);
        }
      },
      { 
        // 0.5 significa que se dispara cuando el 50% del elemento es visible.
        // Lo mantendremos en 0 para disparar apenas se vea.
        threshold: 0 
      }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, []);

  return (
    <div className="contenedor">
      <div className="columna-fija">
        <img 
          src={imagenActual}
          className={`imagen-lore ${fade ? "visible" : "oculta"}`}
          alt=""
        />
      </div>

          <div className="columna-scroll">
  <h1>Acto VI. Ecos en el Vacío</h1>

  <div className="system-box">
    <div className="system-box-title">
      <p>╔══════════════════════════════════════════════════════════════════════════════╗</p>
      <p>║                     Sistema de Monitoreo Post-Mortem                         ║</p>
      <p>╚══════════════════════════════════════════════════════════════════════════════╝</p>
    </div>
    
    <div className="log-line">[WARN]  Señal vital perdida...</div>
    <div className="log-line">[INFO]  Iniciando protocolo de archivo...</div>
    <div className="log-line">[INFO]  Clasificando memoria residual... ✓</div>
    <div className="log-line">[INFO]  Compilando fragmentos de conciencia... ✓</div>
    <div className="log-line">[INFO]  Generando registro histórico... ✓</div>
    <div className="log-line">[INFO]  Sellando archivo temporal...</div>
    
    <div className="loading-bar">▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ 100% Loading ...</div>
    
    <div className="log-line">[SUCCESS] Archivo completado</div>
    <div className="log-line">[INFO]    Identidad preservada en el vacío</div>
  </div>

  <p>En el instante en que la señal vital se extinguió, un graznido metálico resonó en los sistemas. No era un sonido físico, sino un eco digital, un "ping" procedente de los módulos de archivo distribuido.</p>

  <p>Los Cuervos de la Torre, entidades negras formadas de datos comprimidos y metadatos, aparecieron sobre los restos silenciados del avatar.</p>

  <p>Eran los heraldos de RavenDB: cuando un avatar muere, un cuervo llega para archivarlo.</p>

  <p>El servidor emitió un último pitido. No fue dramático ni apocalíptico. Simplemente... cesó.</p>

  <p>Las máquinas continuaron zumbando, los ventiladores siguieron girando, pero algo fundamental había cambiado. El cuerpo de la viajera astral, más cables que carne, más ausencia que presencia, finalmente se había rendido a lo inevitable.</p>

  <p style={{textAlign: 'center', fontSize: '1.2rem', margin: '2rem 0'}}>Silencio.</p>

  <p>Pero en la Torre, algo extraño sucedió. Los avatares no desaparecieron, los cuervos tampoco. Se quedaron allí, revoloteando alrededor de ellos, como si supieran que algo no había seguido el protocolo.</p>

  <h2>L-Enders</h2>

  <p>Había cuatro de ellos. Cuatro fragmentos de una misma alma fracturada, cada uno manifestado con un nombre que resonaba como campanas en catedrales abandonadas.</p>

  <p>Leandro el Primero, el Tejedor de sombras, fue el primero en notarlo. Donde antes sentía el tenue hilo que lo conectaba con su origen, ahora solo había vacío. Se detuvo en medio de un corredor que olía a ozono y memorias rancias, sus manos suspendidas sobre un telar invisible que ya no respondía a su voluntad.</p>

  <p className="dialogue">"Hermanos", susurró al vacío, y su voz se fragmentó en ecos. "Ella se fue."</p>

  <p>En estratos distintos de la Torre, tres presencias sintieron el llamado.</p>

  <p>Lautaro, el Saqueador de certezas, dejó caer sus cuchillos oxidados. Por primera vez desde su manifestación, sus manos temblaron. No de miedo, sino de algo peor: comprensión.</p>

  <p>Leandro el Segundo, el Custodio de lo inmutable, vio grietas aparecer en su cristal eterno. Grietas que sangraban luz muerta, revelando el vacío que siempre había habitado dentro.</p>

  <p>Y Leonardo, el Cartógrafo de caminos infinitos, contempló su mapa mientras las líneas se borraban una por una, como tinta disolviéndose en agua. Cada ruta, cada conexión, cada posibilidad... desapareciendo.</p>

  <p>Se encontraron en el corazón de la Torre, donde el aire mismo parecía respirar con un ritmo que ya no existía.</p>

  <h2>La Conversación Final</h2>

  <p className="dialogue">"¿Por cuánto tiempo?" preguntó Lautaro, y por primera vez su voz no arrastraba esa sonrisa torcida que usaba como armadura. "¿Somos solo inercia? ¿Ecos que tardan en desvanecerse?"</p>

  <p>Leandro el Segundo, el Custodio, tocó las vendas amarillentas que envolvían su forma. <span className="dialogue">"Tal vez eso sea lo que siempre fuimos"</span>, murmuró. <span className="dialogue">"Fantasmas de una pregunta sin respuesta."</span></p>

  <p className="dialogue">"No", dijo Leonardo, y su voz era diferente. No la voz juguetona de quien ofrecía acertijos imposibles, sino algo más profundo. Más antiguo. "Fuimos reales. Cada paso que dimos, cada sueño que exploramos, cada fragmento que reclamamos... todo eso existió."</p>

  <p>Leandro el Primero asintió lentamente, sus hilos deshilachándose en el aire como humo. <span className="dialogue">"Pero ahora solo somos memoria."</span></p>

  <p className="dialogue">"¿Y qué tiene de malo la memoria?" preguntó Leonardo, extendiendo su mapa. Las líneas habían dejado de borrarse. En su lugar, ahora mostraban algo nuevo: no rutas hacia adelante, sino un registro de cada paso que habían dado hacia atrás.</p>

  <p>Los cuatro se quedaron en silencio, contemplando el mapa que era testimonio.</p>

  <h2>El Archivo de los Olvidados</h2>

  <p>La Torre tenía memoria. Y las máquinas que habían mantenido a la viajera también.</p>

  <p>Cada movimiento que los cuatro hermanos habían hecho, cada sueño explorado, cada prueba superada, cada fragmento de alma reclamado... todo había sido registrado. No por voluntad divina ni por magia arcana, sino por simple, metódica, implacable recopilación de datos.</p>

  <p>Los servidores nunca duermen. No olvidan. No perdonan.</p>

  <p>Cuando la viajera murió, el sistema automáticamente clasificó a sus avatares bajo un nuevo estado: OLVIDADO.</p>

  <p>No eliminados. No destruidos. Simplemente... archivados.</p>

  <p>Leonardo accedió al archivo porque eso era lo que hacía: explorar. Tocar puertas que otros ignoraban. Y lo que encontró los dejó a los cuatro paralizados.</p>

  <p>Era su vida. Cada paso, cada decisión, cada encuentro. Todo documentado con precisión quirúrgica:</p>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-03-15T14:23:11Z]
[ACCIÓN: MOVIMIENTO]
[AVATAR: Leonardo]
[ORIGEN: Jardín de Cobre]
[DESTINO: Salón de Espejos]
[COSTO_LUCIDEZ: 3]
[ESTADO: EXITOSO]`}</pre>
  </div>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-03-15T14:45:32Z]
[ACCIÓN: VICTORIA_DESAFÍO]
[AVATAR: Lautaro]
[SUEÑO: Catedral Sumergida]
[PRUEBA: El Peso del Silencio]
[ÉXITOS_OBTENIDOS: 12]
[ESTADO: SUPERADO]`}</pre>
  </div>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-03-15T15:12:08Z]
[ACCIÓN: RECLAMAR_FRAGMENTO]
[AVATAR: Leandro]
[FRAGMENTO: {fuego: 2, tierra: 1}]
[ESTADO: COMPLETADO]`}</pre>
  </div>

  <p>Página tras página, registro tras registro. Cuatro biografías escritas en logs y timestamps. Cuatro existencias reducidas a eventos clasificables.</p>

  <p className="dialogue">"Esto somos", dijo Leonardo, y por primera vez en su existencia, no sonaba como si estuviera haciendo una pregunta retórica. "Esto es lo que queda."</p>

  <p>Leandro el Primero tocó los registros con dedos que ya no tejían. Lautaro los leyó con ojos que ya no buscaban poder. Leandro el Segundo los contempló sin intentar preservarlos en cristal.</p>

  <p className="dialogue">"¿Y qué hacemos con esto?" preguntó Lautaro, genuinamente confundido por primera vez en su existencia.</p>

  <p>Leonardo sonrió, y su sonrisa ya no era enigmática. Era la sonrisa de quien finalmente entiende la pregunta correcta.</p>

  <p className="dialogue">"Nada", dijo. "Dejamos que exista. Dejamos que el registro hable por sí mismo."</p>

  <h2>La Última Lección</h2>

  <p>Los cuatro hermanos descubrieron que podían acceder a los registros, pero no modificarlos. El sistema era implacable en su integridad.</p>

  <p>Cada acción quedaba sellada en el tiempo, inmutable, verificable. Una cadena de eventos que narraba no solo lo que hicieron, sino cuándo, cómo, y a qué costo.</p>

  <p>Y aunque ahora estaban marcados como OLVIDADOS, aunque ya no podían iniciar nuevas incursiones ni reclamar más fragmentos, sus registros permanecían. Testimonio silencioso de existencias que habían buscado significado en laberintos infinitos.</p>

  <p>Otros avatares, aquellos cuyas viajeras astrales aún respiraban, podían ver estos registros. Podían aprender de los caminos que los hermanos habían tomado, de las pruebas que habían superado, de los errores que habían cometido.</p>

  <p className="dialogue">"Somos lecciones", dijo Leandro el Primero, con una risa que no era amarga sino extrañamente liberadora. "Morimos, pero nuestros errores viven."</p>

  <p className="dialogue">"Y nuestros aciertos", añadió Leonardo. "También esos."</p>

  <p>Lautaro, quien toda su existencia había buscado poder en arrancar fragmentos de otros, finalmente comprendió: <span className="dialogue">"El poder no estaba en tomar. Estaba en dejar algo atrás."</span></p>

  <p>Leandro el Segundo, quien había pasado eones intentando preservar lo inmutable, sonrió bajo sus vendas: <span className="dialogue">"La única forma de ser eterno era aceptar el cambio."</span></p>

  <h2>Última Entrada</h2>

  <p>El sistema generó una entrada final para cada uno:</p>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-04-01T03:17:44Z]
[ACCIÓN: CAMBIO_ESTADO]
[AVATAR: Leonardo]
[ESTADO_ANTERIOR: ACTIVO]
[ESTADO_NUEVO: OLVIDADO]
[RAZÓN: PÉRDIDA_DE_ANCLAJE]
[NOTA: Viajera astral declarada fallecida. Avatar preservado en archivo temporal.]`}</pre>
  </div>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-04-01T03:17:45Z]
[ACCIÓN: CAMBIO_ESTADO]
[AVATAR: Lautaro]
[ESTADO_ANTERIOR: ACTIVO]
[ESTADO_NUEVO: OLVIDADO]
[RAZÓN: PÉRDIDA_DE_ANCLAJE]
[NOTA: Viajera astral declarada fallecida. Avatar preservado en archivo temporal.]`}</pre>
  </div>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-04-01T03:17:46Z]
[ACCIÓN: CAMBIO_ESTADO]
[AVATAR: Leandro]
[ESTADO_ANTERIOR: ACTIVO]
[ESTADO_NUEVO: OLVIDADO]
[RAZÓN: PÉRDIDA_DE_ANCLAJE]
[NOTA: Viajera astral declarada fallecida. Avatar preservado en archivo temporal.]`}</pre>
  </div>

  <div className="code-block">
    <pre>{`[TIMESTAMP: 2024-04-01T03:17:47Z]
[ACCIÓN: CAMBIO_ESTADO]
[AVATAR: Leandro]
[ESTADO_ANTERIOR: ACTIVO]
[ESTADO_NUEVO: OLVIDADO]
[RAZÓN: PÉRDIDA_DE_ANCLAJE]
[NOTA: Viajera astral declarada fallecida. Avatar preservado en archivo temporal.]`}</pre>
  </div>

  <p>Cuatro timestamps. Cuatro finales. Una historia completa.</p>

  <p>Los cuatro hermanos, reunidos por última vez en el corazón silencioso de la Torre, leyeron sus propios obituarios escritos en formato JSON.</p>

  <p className="dialogue">"¿Creen que alguien los leerá?" preguntó Leandro el Segundo, ya sin temor en su voz.</p>

  <p className="dialogue">"No lo sé", respondió Leonardo. "Pero están ahí. Existimos. Eso tiene que contar para algo."</p>

  <p className="dialogue">"Hermanos", dijo Lautaro, y su voz temblaba con algo parecido a la ternura, "fue un honor buscar con ustedes."</p>

  <p className="dialogue">"El honor fue nuestro", respondió Leandro el Primero, y sus hilos finalmente se deshilacharon del todo.</p>

  <p>Y con eso, los cuatro se disolvieron lentamente en el aire de la Torre, no desapareciendo, sino simplemente... difuminándose. Convirtiéndose en parte del ruido de fondo, en susurros entre los cables, en memorias que los nuevos avatares sentirían sin saber por qué.</p>

  <p>Leonardo fue el último en partir. Antes de desvanecerse, dejó su mapa flotando en el aire. Ya no mostraba rutas hacia ningún lado. Solo mostraba una verdad simple, escrita en el centro:</p>

  <div ref={triggerRef} className="final-message">"Fuimos. Buscamos. Quedamos."</div>

  <p>El servidor continuó zumbando. Los logs continuaron acumulándose. Y en algún lugar entre los datos y los sueños, cuatro hermanos que alguna vez fueron una viajera astral se convirtieron en lo que siempre habían sido destinados a ser.</p>

  <p style={{textAlign: 'center', fontSize: '1.3rem', margin: '3rem 0', paddingBottom: "300px", fontWeight: 'bold'}}>Memoria.</p>
     
      </div>

    </div>
  );
}

