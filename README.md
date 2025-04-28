
# GitHub Repos IMEXHS

Este proyecto es una aplicación web desarrollada en **Angular 18** con autenticación vía **Firebase + GitHub OAuth**, que permite visualizar información detallada de cualquier usuario de GitHub y sus repositorios, con filtros, paginación y un diseño moderno (100% Tailwind CSS).

## 🚀 Características

- Login seguro con GitHub usando Firebase Authentication.
- Visualización de perfil de usuario y repositorios públicos.
- Filtros avanzados por nombre y lenguaje de programación.
- Paginación de repositorios.
- Modo oscuro/claro persistente (con toggle).
- Responsive: se adapta a dispositivos móviles y desktop.
- Despliegue optimizado para Vercel.

---

## ⚙️ Requisitos previos

- **Node.js** v18 o superior
- **Angular CLI** v18+
- **Cuenta de GitHub** (para autenticación)
- **Cuenta en Firebase** (opcional para login local; en producción ya está configurado)

---

## 🛠️ Instalación y configuración

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/TuUsuario/github-repos-imexhs.git
   cd github-repos-imexhs
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno de Firebase**

   - Crea el archivo `src/environments/environment.ts` y/o `src/environments/environment.prod.ts`:
     ```typescript
     export const environment = {
       production: false,
       firebase: {
         apiKey: "TU_API_KEY",
         authDomain: "TU_AUTH_DOMAIN",
         projectId: "TU_PROJECT_ID",
         storageBucket: "TU_STORAGE_BUCKET",
         messagingSenderId: "TU_MESSAGING_SENDER_ID",
         appId: "TU_APP_ID"
       }
     };
     ```
  Solicitar por MD las credenciales

4. **Configura GitHub OAuth en Firebase**

   - Ve a la consola de Firebase → Authentication → Métodos de inicio de sesión → GitHub.
   - Crea una aplicación OAuth en [GitHub Developer Settings](https://github.com/settings/developers).
     - **Homepage URL:** `http://localhost:4200` (o tu dominio de producción)
     - **Authorization callback URL:**  
       - Local: `http://localhost:4200/__/auth/handler`
       - Producción (Vercel): `https://tu-app.vercel.app/__/auth/handler`
   - Copia el Client ID y Secret en Firebase.

---

## 🖥️ Ejecución en desarrollo

```bash
ng serve
```

- La aplicación estará disponible en `http://localhost:4200`.

---

## 📝 Scripts útiles

- `ng serve` — Levanta el entorno de desarrollo.
- `ng build` — Compila la app para producción.
- `npm run lint` — Corre linter.
- `npm run format` — Aplica formateo de código.

---

## 📦 Estructura de carpetas

```
src/
├── app/
│   ├── features/
│   │   ├── auth/...
│   │   └── repos/...
│   ├── shared/
│   │   ├── components/
│   │   ├── models/
│   │   └── ...
│   └── core/
│       ├── services/
│       └── guards/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── ...
```

---

## ✨ Créditos

- Hecho con ❤️ por [Teven](https://github.com/TevenV27)
- Inspirado en la interfaz de GitHub y mejores prácticas de Angular + Tailwind CSS.

---

