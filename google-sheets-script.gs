// Script para Google Sheets (Google Apps Script)
// Este código debe copiarse en el editor de scripts de tu Google Sheet

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getAll') {
    return getClientes();
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Acción no válida'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = e.parameter.action;
    
    if (action === 'add') {
      return addCliente(data);
    } else if (action === 'update') {
      return updateCliente(data);
    } else if (action === 'delete') {
      return deleteCliente(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Acción no válida'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getClientes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Clientes');
  
  // Si no existe la hoja, crearla con encabezados
  if (!sheet) {
    createClientesSheet();
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      clientes: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const clientes = [];
  
  // Saltar el encabezado (fila 0)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) { // Solo si tiene ID
      clientes.push({
        id: data[i][0],
        nombre: data[i][1],
        telefono: data[i][2],
        direccion: data[i][3],
        localidad: data[i][4],
        email: data[i][5],
        notas: data[i][6],
        fecha: data[i][7]
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    clientes: clientes
  })).setMimeType(ContentService.MimeType.JSON);
}

function addCliente(data) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Clientes');
  
  // Si no existe la hoja, crearla
  if (!sheet) {
    sheet = createClientesSheet();
  }
  
  // Generar nuevo ID
  const lastRow = sheet.getLastRow();
  const newId = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;
  
  // Agregar nueva fila
  const fecha = new Date().toLocaleString('es-AR');
  sheet.appendRow([
    newId,
    data.nombre,
    data.telefono,
    data.direccion || '',
    data.localidad || '',
    data.email || '',
    data.notas || '',
    fecha
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Cliente agregado correctamente',
    id: newId
  })).setMimeType(ContentService.MimeType.JSON);
}

function updateCliente(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Clientes');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Hoja no encontrada'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const allData = sheet.getDataRange().getValues();
  
  // Buscar el cliente por ID
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0] == data.id) {
      // Actualizar fila
      sheet.getRange(i + 1, 2, 1, 6).setValues([[
        data.nombre,
        data.telefono,
        data.direccion || '',
        data.localidad || '',
        data.email || '',
        data.notas || ''
      ]]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Cliente actualizado correctamente'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Cliente no encontrado'
  })).setMimeType(ContentService.MimeType.JSON);
}

function deleteCliente(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Clientes');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Hoja no encontrada'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const allData = sheet.getDataRange().getValues();
  
  // Buscar el cliente por ID
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0] == data.id) {
      // Eliminar fila
      sheet.deleteRow(i + 1);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Cliente eliminado correctamente'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Cliente no encontrado'
  })).setMimeType(ContentService.MimeType.JSON);
}

function createClientesSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.insertSheet('Clientes');
  
  // Configurar encabezados
  const headers = ['ID', 'Nombre', 'Teléfono', 'Dirección', 'Localidad', 'Email', 'Notas', 'Fecha Registro'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formato de encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#2563eb')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  
  // Ajustar anchos de columna
  sheet.setColumnWidth(1, 60);  // ID
  sheet.setColumnWidth(2, 200); // Nombre
  sheet.setColumnWidth(3, 120); // Teléfono
  sheet.setColumnWidth(4, 200); // Dirección
  sheet.setColumnWidth(5, 150); // Localidad
  sheet.setColumnWidth(6, 200); // Email
  sheet.setColumnWidth(7, 250); // Notas
  sheet.setColumnWidth(8, 150); // Fecha
  
  // Congelar primera fila
  sheet.setFrozenRows(1);
  
  return sheet;
}
