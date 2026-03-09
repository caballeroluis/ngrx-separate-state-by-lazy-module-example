# 🏛️ Enterprise Angular: Orquestación de Estado Segmentado (NgRx)

[![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)](https://angular.io/docs)
[![NgRx](https://img.shields.io/badge/NgRx-BA2BD2?logo=ngrx&logoColor=white)](https://ngrx.io/guide/store)
[![Performance](https://img.shields.io/badge/Performance-00C853?logo=speedtest&logoColor=white)](https://img.shields.io/badge/Performance-00C853?logo=speedtest&logoColor=white)
[![Architecture](https://img.shields.io/badge/Architecture-2962FF?logo=blueprint&logoColor=white)](https://img.shields.io/badge/Architecture-2962FF?logo=blueprint&logoColor=white)
[![Open in StackBlitz](https://img.shields.io/badge/Open%20in%20StackBlitz-1269D3?logo=stackblitz&logoColor=white)](https://stackblitz.com/~/github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example)

Este repositorio documenta el blueprint de arquitectura que diseñé para enfrentar un reto real en el sector financiero. Aquí detallo las decisiones estratégicas tomadas ante restricciones técnicas severas y requisitos de alta escalabilidad.

## 📜 1. El Escenario Inicial: Incertidumbre y Restricciones
Al inicio del proyecto, me enfrenté a un entorno con tres condicionantes críticos:

*   **Legacy por Normativa:** Entorno anclado en Angular 13 por políticas corporativas.
*   **Requisitos Volátiles:** No se habían definido las librerías de UI finales ni cómo los usuarios construirían sus consultas complejas (Queries).
*   **Carga Crítica:** El sistema debía manejar volúmenes ingentes de datos y garantizar una carga casi instantánea.

>  [!NOTE]
> **Versión de Referencia: Angular 14**
> Aunque el reto real nació en la v13, este repositorio ha sido actualizado a **Angular 14**. He elegido esta versión específicamente por ser el "techo tecnológico" de la arquitectura basada en módulos. Es la versión más estable y potente para sistemas que requieren un control estricto del estado antes de la transición masiva a *Standalone Components* introducida en la v15.
> 

## 💡 2. La Estrategia: "Cimientos antes que Carrocería"
Anticipando un crecimiento masivo, tomé decisiones para blindar el núcleo del negocio:

*   **A. NgRx como Única Fuente de Verdad:** Implementé NgRx para garantizar que el flujo de datos fuera predecible. Si mañana cambiaba la librería de componentes, la lógica de negocio permanecería intacta.
*   **B. Estrategia "Double-Lazy" (Rendimiento Extremo):** Diseñé un sistema donde tanto el código JS como el Estado Redux (reducers/effects) solo se inyectan en el Store al activar la ruta, manteniendo la memoria limpia.
*   **C. Caché Reactiva (Local Storage):** Dada la complejidad de las consultas, implementé hidratación automática con `ngrx-store-localstorage`. Si el usuario refresca la página, su contexto de datos se recupera al instante sin re-ejecutar peticiones pesadas al servidor.

## 🛠️ 3. ¿Para qué te sirve este repositorio?
Si eres desarrollador Angular, este proyecto te resultará útil como referencia técnica para implementar:

1.  **Un Lazy Loading Especial:** No solo fragmentamos la carga de código JS; aplicamos una fragmentación de carga de datos masiva.
2.  **Persistencia Automatizada:** Ejemplo práctico de cómo usar `ngrx-store-localstorage` para cachear segmentos específicos del estado.
3.  **Rendimiento O(1):** Uso de `@ngrx/entity` para manejar miles de registros sin degradar la UI (manteniendo 60fps).

## 🌐 Live Demo & Source

Explora la demo interactiva directamente en StackBlitz para ver la arquitectura en acción:

👉 **[Live Demo on StackBlitz](https://stackblitz.com/~/github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example)**

---

# 📸 Recorrido Técnico: Arquitectura en Acción

## Screenshots

![1](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/1.png?raw=true)
1. **Pantalla Inicial**: Muestra la vista principal al cargar la aplicación. El Store se inicializa únicamente con el estado base (`app`), optimizando la memoria inicial.

![2](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/2.png?raw=true)
2. **Gestión de Identidad**: Proceso de inicio de sesión donde la información de autenticación se sincroniza automáticamente en el almacenamiento de Redux y se persiste gracias al MetaReducer global.

![3](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/3.png?raw=true)
3. **Carga del Módulo `Weather`**: Demostración de **Lazy Loading**. El archivo JS del módulo y su lógica de Redux asociada se descargan solo al navegar a esta ruta, inyectando el estado de forma dinámica.

![4](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/4.png?raw=true)
4. **Carga del Módulo `List`**: Al acceder a la lista, se activa el fragmento de estado `list`. Se observa cómo la arquitectura escala horizontalmente descargando solo los recursos necesarios.

![5](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/5.png?raw=true)
5. **Gestión de Productos**: Demostración de integridad en el manejo de entidades dentro de la lista de la compra, con actualizaciones síncronas en el Store persistente.

---

## 🏗️ Implementación: Cómo añadir un Nuevo Módulo

Para añadir un nuevo módulo a esta aplicación, es necesario realizar varios cambios estratégicos para integrarlo correctamente en la estructura existente, asegurando que tanto el código como el estado se carguen de forma perezosa (**Double-Lazy Architecture**).

![6](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/6.png?raw=true)

Este proyecto destaca por una arquitectura de **Persistencia Selectiva**. A diferencia de las implementaciones estándar de NgRx donde todo el almacenamiento se procesa al inicio, aquí tanto el código (JS) como la hidratación de datos del LocalStorage ocurren de forma bajo demanda.

### 1. Importar el Nuevo Módulo y Configurar Persistencia

Debes registrar la lógica del nuevo módulo en tu `AppModule`. Como indica la **primera flecha**, esto se hace modificando la función `localStorageSyncReducer`. Al añadir la clave `'new'` al array de keys, el sistema queda preparado para vigilar esa parcela de datos, pero no la cargará en memoria hasta que el módulo sea instanciado.

```typescript
export function localStorageSyncReducer(reducer: any): any {
  // Se registra la clave para que la persistencia se active bajo demanda
  return localStorageSync({
    keys: ['app', 'weather', 'list', 'new'],
    rehydrate: true
  })(reducer);
}
```

### 2. Configuración de Routing Dinámico (Lazy Loading)

Para cumplir con la carga perezosa de la interfaz, configura la ruta en `app-routing.module.ts` usando importación dinámica. Esto evita que el navegador descargue el código del módulo hasta que el usuario navegue a la ruta correspondiente:

```typescript
{
  path: 'new',
  loadChildren: () =>
    import('./modules/new/new.module').then(m => m.NewModule)
}
```

Con esta configuración Angular descargará el bundle del módulo **solo cuando la ruta sea activada**.

### 3. Inyección del Feature Store

Finalmente, en el nuevo `new.module.ts`, inyecta el estado y los efectos asociados. Al usar `forFeature`, el Store de NgRx inyecta dinámicamente el reducer en el Store global **solo cuando el módulo se carga**, activando también la hidratación desde el LocalStorage:

```typescript
@NgModule({
  imports: [
    CommonModule,

    // El estado se inyecta dinámicamente al cargar el módulo
    StoreModule.forFeature('new', newReducer),

    // Los efectos se registran solo cuando la feature está activa
    EffectsModule.forFeature([NewEffects])
  ]
})
export class NewModule {}
```

---

### 📊 Análisis de Rendimiento: Estándar vs. Segmentado

A continuación, se detalla cómo esta arquitectura impacta positivamente en el consumo de recursos del cliente:


| Característica | NgRx Estándar (Monolítico) | Arquitectura Segmentada (Este Proyecto) | Beneficio |
| :--- | :--- | :--- | :--- |
| **Carga de JS Inicial** | Todo el código de negocio se descarga al inicio. | Solo se descarga el Core del sistema. | **Reducción de Bundle inicial.** |
| **Memoria RAM (Store)** | El estado global crece linealmente con cada módulo. | El Store solo crece con los módulos visitados. | **Ahorro de memoria en sesiones largas.** |
| **Hidratación (Storage)** | Se procesan todas las claves del LocalStorage al arrancar. | Solo se hidrata la "parcela" de datos del módulo activo. | **TBT (Total Blocking Time) reducido.** |
| **Escalabilidad** | El rendimiento se degrada al añadir 50+ módulos. | Rendimiento constante ($O(1)$) independientemente del número de módulos. | **Escalabilidad Horizontal.** |

> [!TIP]
> **Conclusión técnica:** Mientras que una arquitectura estándar penaliza al usuario desde el segundo 0, este modelo garantiza que el coste de computación sea proporcional al uso real que se hace de la aplicación.

---

## 🚀 Guía de Desarrollo y Operaciones CLI

### 🖥️ Servidor de Desarrollo
Ejecuta `ng serve` para iniciar un servidor local. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente ante cualquier cambio.

### 🏗️ Build y Despliegue
Ejecuta `ng build` para compilar el proyecto. Los artefactos listos para producción se guardarán en el directorio `dist/`.

### 📦 Generación de Código
Usa el Angular CLI para mantener la consistencia arquitectónica:
*   **Componente:** `ng generate component nombre-componente`
*   **Módulo:** `ng generate module nombre-modulo --route nombre-ruta --module app-routing.module`

### 🧹 Cómo Limpiar el Local Storage (Reset de Estado)
Al usar `ngrx-store-localstorage`, es posible que necesites resetear el estado durante las pruebas:
1. Abre DevTools (`F12`).
2. Ve a la pestaña **Aplicación** (Chrome) o **Almacenamiento** (Firefox).
3. En **Local Storage**, localiza `http://localhost:4200/` y haz clic en **Clear All / Eliminar todo**.

---

*"Diseñado para la escalabilidad. Optimizado para el rendimiento."*

