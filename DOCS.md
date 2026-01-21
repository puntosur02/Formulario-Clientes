# 📋 Registro de Clientes - Punto Sur

Sistema de registro de clientes simple, responsive y conectado con Google Sheets. Perfecto para distribuidoras que necesitan gestionar su base de clientes.

## 🚀 Características

- ✅ **Formulario público** para que los clientes se registren solos
- 🔐 **Panel de administración** para gestionar clientes
- 🔍 Búsqueda en tiempo real
- 📱 Diseño 100% responsive (móvil, tablet, desktop)
- ☁️ Almacenamiento en Google Sheets (gratis)
- 🎨 Interfaz moderna y fácil de usar
- 💾 Sin necesidad de base de datos ni servidor

## 📦 Archivos del proyecto

- `registro-cliente.html` - **Formulario público** (compartir con clientes)
- `index.html` - **Panel de administración** (solo para vos)
- `styles.css` - Estilos responsive
- `script.js` - Lógica del panel de administración
- `google-sheets-script.gs` - Script para Google Sheets
- `README.md` - Este archivo

## 🛠️ Configuración paso a paso

### 1️⃣ Crear tu Google Sheet

1. Abre [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Ponle un nombre (ej: "Clientes Punto Sur")
4. **No necesitas crear columnas**, el script las creará automáticamente

### 2️⃣ Agregar el script a Google Sheets

1. En tu Google Sheet, ve a **Extensiones** → **Apps Script**
2. Borra el código que aparece por defecto
3. Copia TODO el contenido del archivo `google-sheets-script.gs`
4. Pégalo en el editor de Apps Script
5. Dale un nombre al proyecto (ej: "API Clientes")
6. Haz clic en el ícono de **💾 Guardar**

### 3️⃣ Publicar como Web App

1. En Apps Script, haz clic en **Implementar** → **Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configura:
   - **Descripción**: API Clientes (o cualquier nombre)
   - **Ejecutar como**: Yo (tu correo)
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **⚠️ IMPORTANTE**: Copia la **URL de la aplicación web** que aparece
   - Se verá algo así: `https://script.google.com/macros/s/AKfycbx.../exec`

### 4️⃣ Configurar la aplicación web

1. Abre el archivo `script.js` en tu editor de código
2. En las primeras líneas, busca:
   ```javascript
   const CONFIG = {
       WEBAPP_URL: 'TU_URL_DE_WEBAPP_AQUI',
   ```
3. Reemplaza `'TU_URL_DE_WEBAPP_AQUI'` con la URL que copiaste en el paso anterior
4. Guarda el archivo
5. **IMPORTANTE**: Abre también `registro-cliente.html` y actualiza la misma URL en la línea 125 aproximadamente

### 5️⃣ Usar el sistema

**Para vos (administrador):**
1. Abre `index.html` en tu navegador
2. Ahí podrás ver, editar y eliminar clientes
3. También podrás agregar clientes manualmente

**Para tus clientes:**
1. Compartí el archivo `registro-cliente.html` o súbelo a internet
2. Los clientes completan el formulario con sus datos
3. ¡Automáticamente aparecerán en tu Google Sheet y en el panel de administración!

## 🌐 Cómo compartir el formulario con tus clientes

## 🌐 Cómo compartir el formulario con tus clientes

### Opción 1: Por WhatsApp/Email (requiere subir a internet)
1. Sube `registro-cliente.html` a GitHub Pages o Netlify (ver sección más abajo)
2. Compartí el link: "Registrate acá: https://tu-sitio.com/registro-cliente.html"

### Opción 2: Código QR
1. Usa una herramienta online para generar un QR de tu URL
2. Imprímelo y ponelo en tu local/negocio
3. Los clientes escanean y se registran desde su celular

### Opción 3: Local (sin internet)
1. Enviá el archivo `registro-cliente.html` por email
2. El cliente lo abre en su navegador y completa
3. Al enviar, se guarda en tu Google Sheet automáticamente

## 📱 Modo de prueba (sin Google Sheets)

Si quieres probar la interfaz del panel de administración antes de configurar Google Sheets:

1. Abre `script.js`
2. Ve al final del archivo
3. Descomenta estas líneas:
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
       modoPrueba();
   });
   ```
4. Guarda y abre `index.html` en tu navegador
5. Verás clientes de ejemplo (los cambios no se guardarán)

**Nota:** El formulario público (`registro-cliente.html`) requiere sí o sí la conexión con Google Sheets para funcionar.

## 🎨 Personalización

### Cambiar colores

Edita el archivo `styles.css` en las primeras líneas:

```css
:root {
    --primary-color: #2563eb;  /* Color principal */
    --secondary-color: #64748b; /* Color secundario */
    --success-color: #10b981;   /* Color de éxito */
    --danger-color: #ef4444;    /* Color de peligro */
}
```

### Cambiar título

Edita `index.html` línea 7 y 14:
```html
<title>Tu Nombre - Clientes</title>
...
<h1>📋 Tu Nombre - Clientes</h1>
```

## 📊 Estructura de datos en Google Sheets

El sistema crea automáticamente estas columnas:

| ID | Nombre | Teléfono | Dirección | Email | Notas | Fecha Registro |
|----|--------|----------|-----------|-------|-------|----------------|
| 1  | Juan   | 555-0001 | Av. 123   | ...   | ...   | 19/1/2026      |

## 🌐 Publicar en internet (opcional)

### Opción 1: GitHub Pages (Gratis) - RECOMENDADO
1. Crea una cuenta en [GitHub](https://github.com)
2. Crea un nuevo repositorio público
3. Sube estos archivos:
   - `registro-cliente.html`
   - `styles.css`
   - `index.html` (opcional, solo si querés acceder al admin online)
   - `script.js` (si subiste index.html)
4. Ve a Settings → Pages
5. Activa GitHub Pages desde la rama "main"
6. Tu formulario estará en: `https://tuusuario.github.io/nombre-repo/registro-cliente.html`
7. **¡Compartí ese link con tus clientes!**

### Opción 2: Netlify (Gratis)
1. Crea cuenta en [Netlify](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. Tu formulario estará en: `https://tu-sitio.netlify.app/registro-cliente.html`

## 🔄 Flujo de trabajo

1. **Cliente** abre `registro-cliente.html` y completa sus datos
2. Los datos se envían automáticamente a **Google Sheets**
3. **Vos** abrís `index.html` y ves todos los clientes registrados
4. Podés editar, eliminar o agregar clientes manualmente desde el panel

## ❓ Solución de problemas

### "Error al cargar clientes" (Panel admin)
- Verifica que la URL de la Web App esté correcta en `script.js`
- Asegúrate de haber dado permisos al script en Google Apps Script
- Revisa la consola del navegador (F12) para ver errores

### "Error al enviar el registro" (Formulario cliente)
- Verifica que la URL de la Web App esté correcta en `registro-cliente.html` (línea ~125)
- Asegúrate de que sea la MISMA URL que en `script.js`
- Revisa que el script de Google Apps Script esté publicado como "Cualquier persona"

### No aparecen los cambios en Google Sheets
- Prueba hacer una **nueva implementación** en Apps Script
- Actualiza la URL en `script.js` con la nueva URL

### La página se ve mal en móvil
- Asegúrate de que el archivo `styles.css` esté en la misma carpeta que `index.html`

### Permisos de Google
- La primera vez que uses el script, Google pedirá permisos
- Es normal, acepta los permisos para que funcione

## 🔒 Seguridad

⚠️ **Importante**: Por defecto, cualquiera con la URL puede ver y editar los datos.

Para mayor seguridad:
1. En Apps Script, cambia "Quién tiene acceso" a "Solo yo"
2. Implementa autenticación con Google OAuth (requiere más configuración)

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todas las URLs estén correctas
3. Comprueba que los archivos estén en la misma carpeta

## 📝 Licencia

Este proyecto es de uso libre. Puedes modificarlo y adaptarlo a tus necesidades.

---

Hecho con ❤️ para Punto Sur
