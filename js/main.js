let listaDocumentos = [];
let numeradorFactura = 0;
let numeradorNotaDeCredito = 0;
let numeradorNotaDeDebito = 0;
let iterador = true;

const calcularTotal = (listaDocumentoDetalle) => {
    let impuesto;
    let total = 0;

    listaDocumentoDetalle.forEach( (det) => {
        impuesto = 1 + det.producto.impuesto / 100;
        total += det.producto.precio * det.cantidad * impuesto;
    });
    return total;
}

class Producto{
    constructor (id, nombre, precio, impuesto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.impuesto = impuesto;
    }
}

class Documento{
    constructor (cuit, tipo, centroEmisor, numero, listaDocumentoDetalle){
        this.cuit = cuit;
        this.tipo = tipo;
        this.centroEmisor = centroEmisor;
        this.numero = numero;
        this.listaDocumentoDetalle = listaDocumentoDetalle;
        this.total = calcularTotal(listaDocumentoDetalle);
    }

    mostrarDocumento(){
        let documentoStr;

        documentoStr = `${this.tipo}, centro emisor ${this.centroEmisor}, número ${this.numero}, para ${this.cuit} por un total de $${this.total}. `;
        return documentoStr;
    }

    mostrarMensajeDocumentoCreado(){
        let mensajeDocumento;

        mensajeDocumento = `Se creó correctamente la ${this.tipo}, centro emisor ${this.centroEmisor}, número ${this.numero}, para ${this.cuit} por un total de $${this.total}. La misma contiene los siguientes productos: `;
        this.listaDocumentoDetalle.forEach( (det) => {  mensajeDocumento += `\n${det.cantidad} x ${det.producto.nombre} con un precio de $${det.producto.precio} c/u y un ${det.producto.impuesto}% de impuestos.`;  });
        alert(mensajeDocumento);
    }
}

class DocumentoDetalle{
    constructor (producto, cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

let productos = [new Producto(1, 'Microfono', 25000, 21), new Producto(2, 'Monitor', 80000, 0), new Producto(3, 'Mouse', 20000, 21), new Producto(4, 'Parlantes', 50000, 27), new Producto(5, 'Teclado', 30000, 10.5)];

const gestionarMenu = () => {
    inputOpcionMenu = prompt('Bienvenido a Coder Facturación! Ingrese:\n1 - Para crear un Documento.\n2 - Para mostrar los Documentos creados.\n3 - Para salir.');
    opcionMenu = validarInputMenu(inputOpcionMenu);
    return opcionMenu;
}

const validarInputMenu = (inputOpcionMenu) => {
    while(!(inputOpcionMenu == '1' || inputOpcionMenu == '2' || inputOpcionMenu == '3')){
        inputOpcionMenu = prompt('Opción inválida. Ingrese:\n1 - Para crear un Documento.\n2 - Para mostrar los Documentos creados.\n3 - Para salir.');
    }
    return inputOpcionMenu;
}

const crearDocumento = () => {    
    let cuit;
    let tipoDocumento;
    let centroEmisor;
    let numeroDocumento;
    let listaDocumentoDetalle;
    let documento;

    cuit = ingresarCuit();
    tipoDocumento = seleccionarTipoDocumento();
    centroEmisor = seleccionarCentroEmisor();
    numeroDocumento =  asignarNumero(centroEmisor, tipoDocumento);
    listaDocumentoDetalle = cargarDetalle();
    documento = new Documento(cuit, tipoDocumento, centroEmisor, numeroDocumento, listaDocumentoDetalle);
    listaDocumentos.push(documento);  
    documento.mostrarMensajeDocumentoCreado();
}

const ingresarCuit = () => {
    let inputCuit;
    let cuit;

    inputCuit = prompt('Ingrese el CUIT al que desea emitirle el Documento.');
    cuit = validarInputCuit(inputCuit);
    return cuit;
}

const validarInputCuit = (inputCuit) => {
    while(inputCuit < 100000000 && inputCuit > 99999999999){
        inputCuit = prompt('El CUIT ingresado es incorrecto. El mismo debe ser mayor o igual a 100000000 y menor o igual a 99999999999');
    }  
    return inputCuit;
}

const seleccionarTipoDocumento = () => {
    let inputTipoDocumento;
    let tipoDocumento;

    inputTipoDocumento = prompt('Seleccione el Tipo de Documento que desea crear! Ingrese:\n1 - Factura.\n2 - Nota de Crédito.\n3 - Nota de Débito.');
    tipoDocumento = validarInputTipoDocumento(inputTipoDocumento);
    return tipoDocumento;
}

const validarInputTipoDocumento = (inputTipoDocumento) => {
    let tipoDocumento;

    while(!(inputTipoDocumento == '1' || inputTipoDocumento == '2' || inputTipoDocumento == '3')){
        inputTipoDocumento = prompt('Opción inválida. Ingrese:\n1 - Factura.\n2 - Nota de Crédito.\n3 - Nota de Débito.');
    }  
    if (inputTipoDocumento == '1') tipoDocumento = 'Factura';
    if (inputTipoDocumento == '2') tipoDocumento = 'Nota de Crédito';
    if (inputTipoDocumento == '3') tipoDocumento = 'Nota de Débito';
    return tipoDocumento;
}

const seleccionarCentroEmisor = () => {
    let inputCentroEmisor;
    let centroEmisor;

    inputCentroEmisor = prompt('Seleccione el Centro Emisor! Ingrese:\n1 - 00001.\n2 - 00002.\n3 - 00003.\n4 - 00004.\n5 - 00005.');
    centroEmisor = validarInputCentroEmisor(inputCentroEmisor);
    return centroEmisor;
}

const validarInputCentroEmisor = (inputCentroEmisor) => {
    let centroEmisor;

    while(!(inputCentroEmisor == '1' || inputCentroEmisor == '2' || inputCentroEmisor == '3' || inputCentroEmisor == '4' || inputCentroEmisor == '5')){
        inputCentroEmisor = prompt('Opción inválida. Ingrese:\n1 - 00001.\n2 - 00002.\n3 - 00003.\n4 - 00004.\n5 - 00005.');
    }  
    if (inputCentroEmisor == '1') centroEmisor = '00001';
    if (inputCentroEmisor == '2') centroEmisor = '00002';
    if (inputCentroEmisor == '3') centroEmisor = '00003';
    if (inputCentroEmisor == '4') centroEmisor = '00004';
    if (inputCentroEmisor == '5') centroEmisor = '00005';
    return centroEmisor;
}

const asignarNumero = (centroEmisor, tipoDocumento) => {
    let documentosFiltrados;
    let numeroDocumento;

    documentosFiltrados = listaDocumentos.filter( (d) => d.tipo == tipoDocumento && d.centroEmisor == centroEmisor);    // Consigo los documentos del mismo tipo y centro emisor.
    if (documentosFiltrados.length == 0) return 1;
    documentosFiltrados.sort( (a,b) => b.numero - a.numero); // Ordeno los documentos filtrados de mayor a menor para obtener el más grande fácilmente.
    numeroDocumento = documentosFiltrados[0].numero + 1;
    return numeroDocumento;
}

const cargarDetalle = () => {
    let indexProducto;
    let cantidad;
    let listaDocumentoDetalle = [];
    let documentoDetalle;
    let iteradorDetalle = true;
    let inputOpcionDetalle;
    let opcionDetalle;

    while (iteradorDetalle) {
        indexProducto = seleccionarProducto();
        indexProducto--;
        cantidad = ingresarCantidad();
        documentoDetalle = new DocumentoDetalle(productos[indexProducto], cantidad);
        listaDocumentoDetalle.push(documentoDetalle);

        inputOpcionDetalle = prompt('Desea cargar otra línea de detalle al documento? Ingrese "S" para sí o "N" para no.');
        opcionDetalle = validarInputOpcionDetalle(inputOpcionDetalle);

        if(opcionDetalle.toUpperCase() == 'N') iteradorDetalle = false;
    }
    return listaDocumentoDetalle;
}

const validarInputOpcionDetalle = (inputOpcionDetalle) => {
    while(!(inputOpcionDetalle.toUpperCase() == 'S' || inputOpcionDetalle.toUpperCase() == 'N')){
        inputOpcionDetalle = prompt('Opción inválida. Ingrese "S" para sí o "N" para no.');
    }  
    return inputOpcionDetalle;
}

const seleccionarProducto = () => {
    let mensajeInputProducto;
    let inputProducto;
    let producto;

    mensajeInputProducto = 'Seleccione el Producto que desea facturar! Ingrese: ';
    productos.forEach( (p) => {  mensajeInputProducto += `\n${p.id} - ${p.nombre} por $${p.precio} con un ${p.impuesto}% de impuestos.`;  });

    inputProducto = prompt(mensajeInputProducto);
    producto = validarInputProducto(inputProducto);
    return producto;
}

const validarInputProducto = (inputProducto) => {
    let mensajeInputProducto;

    mensajeInputProducto = 'Opción inválida! Ingrese: ';
    productos.forEach( (p) => {  mensajeInputProducto += `\n${p.id} - ${p.nombre} por $${p.precio} con un ${p.impuesto}% de impuestos.`;  });
    while(inputProducto < 1 || inputProducto > 5){
        inputProducto = prompt(mensajeInputProducto);
    }  
    return inputProducto;
}

const ingresarCantidad = () => {
    let inputCantidad;
    let cantidad;

    inputCantidad = prompt('Ingrese la cantidad del producto.');
    cantidad = validarInputCantidad(inputCantidad);
    return cantidad;
}

const validarInputCantidad  = (inputCantidad) => {
    while(inputCantidad < 1){
        inputCantidad = prompt('La cantidad debe ser mayor que 0, ingrésela nuevamente.');
    }  
    return inputCantidad;
}

const mostrarListaDocumentos = () => {
    let listaDocumentosStr = '';

    if(listaDocumentos.length == 0){
        alert("Todavía no hay documentos creados.");
        return;
    }
    listaDocumentosStr += 'Se crearon los siguientes documentos: ';
    listaDocumentos.forEach( (doc) => { listaDocumentosStr +=  '\n'+ doc.mostrarDocumento() });
    alert(listaDocumentosStr);
}

// Bucle principal
while (iterador){
    opcionMenu = gestionarMenu();
    if (opcionMenu == 1) crearDocumento();
    if (opcionMenu == 2) mostrarListaDocumentos();
    if (opcionMenu == 3) iterador = false;
}