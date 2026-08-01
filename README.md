# Ruleta Ebrios

> *El juego mas borracho del mundo*

Juego de fiesta tipo ruleta para grupos de amigos. La ruleta gira y determina cuantos tragos debe tomar cada jugador. Interfaz completamente en espanol con estetica neon de discoteca nocturna.

## Caracteristicas

- **Ruleta animada** dibujada en canvas con rotacion fluida (Framer Motion)
- **15 opciones predefinidas** de tragos y retos en espanol
- **Opciones personalizadas** - agregar o eliminar opciones durante el juego
- **Alertas de hitos borracho** en 3 niveles (10, 15 y 20 tragos) con animaciones y particulas
- **Audio sintetizado** via Web Audio API (6 efectos de sonido, sin archivos de audio)
- **Persistencia de estado** automatica en localStorage
- **Historial de rondas** con registro completo de cada turno
- **Marcador en tiempo real** ordenado por tragos consumidos
- **Reglas del juego** con modal explicativo
- **Frases de animacion** del publico con emojis

## Tech Stack

| Tecnologia | Version |
|---|---|
| React | 19.2.7 |
| TypeScript | ~6.0.2 |
| Vite | 8.1.1 |
| Tailwind CSS | v4 (4.3.2) |
| Framer Motion | 12.42.2 |
| Oxlint | 1.71.0 |

No hay backend, base de datos ni framework de pruebas. SPA pura del lado del cliente.

## Instalacion y Ejecucion

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (con hot reload)
npm run dev

# Build para produccion (verifica tipos primero)
npm run build

# Vista previa del build de produccion
npm run preview

# Lint con Oxlint
npm run lint
```

El servidor de desarrollo inicia en `http://localhost:5173` por defecto.

## Estructura del Proyecto

```
src/
  main.tsx                  # Punto de entrada de React
  App.tsx                   # Componente raiz - orquesta todas las pantallas
  index.css                 # Import de Tailwind + colores neon personalizados

  types/
    game.ts                 # Definiciones de tipos (Player, RouletteOption, etc.)

  constants/
    defaultOptions.ts       # 15 opciones predefinidas de la ruleta
    crowdPhrases.ts         # 12 frases de animacion del publico

  hooks/
    useGameState.ts         # Estado central del juego (jugadores, puntajes, historial)
    useSound.ts             # Hook de audio que envuelve audioSynth
    useLocalStorage.ts      # Hook generico de lectura/escritura en localStorage

  utils/
    audioSynth.ts           # Funciones de sintesis de audio (Web Audio API)
    gameLogic.ts            # Funciones puras: siguiente jugador, ganador, ordenar

  components/
    Layout.tsx              # Shell de pagina con fondo degradado y header animado
    PlayerSetup.tsx         # Pantalla de configuracion: agregar/quitar jugadores
    OptionsEditor.tsx       # Pantalla de configuracion: opciones personalizadas
    RouletteWheel.tsx       # Ruleta dibujada en canvas con rotacion animada
    GameControls.tsx        # Boton girar + botones utilitarios
    ScoreBoard.tsx          # Marcador en tiempo real ordenado por tragos
    PlayersList.tsx         # Sidebar de escritorio con jugadores y conteo
    OptionsList.tsx         # Sidebar de escritorio con opciones de la ruleta
    OptionsModal.tsx        # Modal para editar opciones durante el juego
    RulesModal.tsx          # Modal con las 8 reglas del juego
    HistoryModal.tsx        # Modal con historial completo de rondas
    DrunkAlert.tsx          # Alerta a pantalla completa en 3 niveles
    CrowdCards.tsx          # Sidebar con frases de animacion del publico
```

## Logica del Juego

1. Agregar al menos 2 jugadores
2. Girar la ruleta para cada turno
3. La ruleta determina la penalizacion (tragos, retos, saltar turno, etc.)
4. Los tragos se acumulan por jugador
5. Se activan alertas automaticas al alcanzar 10, 15 y 20 tragos
6. El marcador muestra el ranking en tiempo real
7. Se registra el historial completo de cada ronda

## Comandos Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # TypeScript check + build de produccion
npm run lint      # Linting con Oxlint
npm run preview   # Vista previa del build
```

## Licencia

Proyecto personal.
