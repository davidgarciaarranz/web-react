# Documentación de Migración: Componente Footer

Este documento detalla el proceso técnico seguido para la migración del componente **Footer** desde la plataforma original en Angular hacia la nueva arquitectura en React.

## 1. Análisis del Componente Original (Angular)
- **Directorio**: `src/app/components/footer/`
- **Lógica**: Utilizaba `MatIconRegistry` y `DomSanitizer` para gestionar iconos SVG de Angular Material.
- **Datos**: Obtenía información desde un servicio de Firebase (`DatabaseService`) para cargar las URLs de redes sociales.
- **Estilos**: SCSS con uso de selectores específicos de Angular Material y diseño fijo (`position: fixed`).

## 2. Implementación en React
La migración se centró en eliminar la dependencia de Angular Material Icons, optando por una solución más ligera y estándar basada en SVGs nativos.

### 2.1 Modelo de Datos
Se actualizó la interfaz `Info` en `src/models/Info.ts` para soportar dinámicamente las URLs de redes sociales:
```typescript
facebookurl?: string;
instagramurl?: string;
tiktokurl?: string;
youtubeurl?: string;
```

### 2.2 Componente Funcional (`Footer.tsx`)
- **Gestión de Estado**: Se implementó `useState` para almacenar la información de contacto y redes sociales.
- **Efectos de Carga**: Uso de `useEffect` para llamar al servicio de Firebase al montar el componente.
- **Optimización de Assets**: Los iconos SVG se importan directamente como assets de Vite para asegurar que se incluyan en el bundle final solo si son necesarios.
- **Renderizado Condicional**: El componente solo muestra los iconos sociales si la URL correspondiente está presente en la base de datos de Firestore.

### 2.3 Estilos Adaptativos (`Footer.scss`)
- Se migraron los estilos originales manteniendo la fidelidad visual.
- **Z-Index**: Se estableció un `z-index: 1000` para garantizar que el footer se mantenga siempre visible sobre otros elementos dinámicos.
- **Responsividad**: Se ajustó el tamaño de los iconos y el logo mediante media queries para asegurar una experiencia óptima en dispositivos móviles (767px o menos).

## 3. Resumen de Cambios Técnicos
| Característica | Implementación Angular | Implementación React |
| :--- | :--- | :--- |
| **Iconografía** | Angular Material Icons (SVG Registry) | SVGs nativos como Assets |
| **Petición de Datos** | Observable (dataBaseService) | Async/Await (firebaseService) |
| **Estructura HTML** | `<footer class="footer">` | `<footer className="footer">` |
| **Eventos de Click** | `(click)="goTo(url)"` | `onClick={() => goTo(url)}` |

## 4. Conclusión del Punto
El Footer ha sido migrado exitosamente, eliminando placeholders y estableciendo una conexión robusta con la base de datos. Se han mantenido las funcionalidades originales como la apertura de enlaces en nuevas pestañas (`_blank`) con medidas de seguridad adicionales (`noopener,noreferrer`).
