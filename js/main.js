let listaDocumentos = [];
let numeradorFactura = 0;
let numeradorNotaDeCredito = 0;
let numeradorNotaDeDebito = 0;
let iterador = true;

const calcularTotal = (listaDocumentoDetalle) => {
    let impuesto;
    let total = 0;

    listaDocumentoDetalle.forEach( (det) => {
        impuesto = 1 + det.impuesto / 100;
        total += det.precio * det.cantidad * impuesto;
    });
    return total;
}

class Documento{
    constructor (tipo, numero, listaDocumentoDetalle){
        this.tipo = tipo;
        this.numero = numero;
        this.listaDocumentoDetalle = listaDocumentoDetalle;
        this.total = calcularTotal(listaDocumentoDetalle);
    }

    mostrarDocumento(){
        alert(`${this.tipo} número ${this.numero} por un total de $${this.total}. `)
    }

    mostrarMensajeDocumentoCreado(){
        let mensajeDocumento;

        mensajeDocumento = `Se creó correctamente la ${this.tipo} número ${this.numero} por un total de $${this.total}. La misma contiene los siguientes productos: `;
        this.listaDocumentoDetalle.forEach( (det) => {  mensajeDocumento += `\n${det.cantidad} x ${det.producto} con un precio de $${det.precio} c/u y un ${det.impuesto}% de impuestos.`;  });
        alert(mensajeDocumento);
    }
}

class DocumentoDetalle{
    constructor (producto, cantidad, precio, impuesto){
        this.producto = producto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.impuesto = impuesto;
    }
}

// Bucle principal
while (iterador){
    opcionMenu = gestionarMenu();
    if (opcionMenu == 1) crearDocumento();
    if (opcionMenu == 2) mostrarListaDocumentos();
    if (opcionMenu == 3) iterador = false;
}

function gestionarMenu(){
    inputOpcionMenu = prompt('Bienvenido a Coder Facturación! Ingrese:\n1 - Para crear un Documento.\n2 - Para mostrar los Documentos creados.\n3 - Para salir.');
    opcionMenu = validarInputMenu(inputOpcionMenu);
    return opcionMenu;
}

function validarInputMenu(inputOpcionMenu){
    while(!(inputOpcionMenu == '1' || inputOpcionMenu == '2' || inputOpcionMenu == '3')){
        inputOpcionMenu = prompt('Opción inválida. Ingrese:\n1 - Para crear un Documento.\n2 - Para mostrar los Documentos creados.\n3 - Para salir.');
    }
    return inputOpcionMenu;
}

function crearDocumento(){    
    let tipoDocumento;
    let numeroDocumento;
    let listaDocumentoDetalle;
    let documento;

    tipoDocumento = seleccionarTipoDocumento();
    numeroDocumento =  asignarNumero(tipoDocumento);
    listaDocumentoDetalle = cargarDetalle();
    documento = new Documento(tipoDocumento, numeroDocumento, listaDocumentoDetalle);
    listaDocumentos.push(documento);  
    documento.mostrarMensajeDocumentoCreado();
}

function seleccionarTipoDocumento(){
    let inputTipoDocumento;
    let tipoDocumento;

    inputTipoDocumento = prompt('Seleccione el Tipo de Documento que desea crear! Ingrese:\n1 - Factura.\n2 - Nota de Crédito.\n3 - Nota de Débito.');
    tipoDocumento = validarInputTipoDocumento(inputTipoDocumento);
    return tipoDocumento;
}

function validarInputTipoDocumento(inputTipoDocumento){
    let tipoDocumento;

    while(!(inputTipoDocumento == '1' || inputTipoDocumento == '2' || inputTipoDocumento == '3')){
        inputTipoDocumento = prompt('Opción inválida. Ingrese:\n1 - Factura.\n2 - Nota de Crédito.\n3 - Nota de Débito.');
    }  
    if (inputTipoDocumento == '1') tipoDocumento = 'Factura';
    if (inputTipoDocumento == '2') tipoDocumento = 'Nota de Crédito';
    if (inputTipoDocumento == '3') tipoDocumento = 'Nota de Débito';
    return tipoDocumento;
}

function cargarDetalle(){
    let producto;
    let precio;
    let cantidad;
    let impuesto;
    let listaDocumentoDetalle = [];
    let documentoDetalle;
    let iteradorDetalle = true;
    let inputOpcionDetalle;
    let opcionDetalle;

    while (iteradorDetalle) {
        producto = ingresarProducto();
        precio = ingresarPrecio();
        cantidad = ingresarCantidad();
        impuesto = seleccionarImpuesto();
        documentoDetalle = new DocumentoDetalle(producto, cantidad, precio, impuesto);
        listaDocumentoDetalle.push(documentoDetalle);

        inputOpcionDetalle = prompt('Desea cargar otra línea de detalle al documento? Ingrese "S" para sí o "N" para no.');
        opcionDetalle = validarInputOpcionDetalle(inputOpcionDetalle);

        if(opcionDetalle.toUpperCase() == 'N') iteradorDetalle = false;
    }
    return listaDocumentoDetalle;
}

function validarInputOpcionDetalle(inputOpcionDetalle){
    while(!(inputOpcionDetalle.toUpperCase() == 'S' || inputOpcionDetalle.toUpperCase() == 'N')){
        inputOpcionDetalle = prompt('Opción inválida. Ingrese "S" para sí o "N" para no.');
    }  
    return inputOpcionDetalle;
}

function ingresarProducto(){
    let inputProducto;
    let producto;

    inputProducto = prompt('Ingrese el producto que desea facturar.');
    producto = validarInputProducto(inputProducto);
    return producto;
}

function validarInputProducto(inputProducto){
    while(inputProducto == ''){
        inputProducto = prompt('Error. Ingrese el producto que desea facturar.');
    }  
    return inputProducto;
}

function ingresarPrecio(){
    let inputPrecio;
    let precio;

    inputPrecio = prompt('Ingrese el precio del producto.');
    precio = validarInputPrecio(inputPrecio);
    return precio;
}

function validarInputPrecio(inputPrecio){
    while(inputPrecio < 1){
        inputPrecio = prompt('El precio debe ser mayor que 0, ingréselo nuevamente.');
    }  
    return inputPrecio;
}

function ingresarCantidad(){
    let inputCantidad;
    let cantidad;

    inputCantidad = prompt('Ingrese la cantidad del producto.');
    cantidad = validarInputCantidad(inputCantidad);
    return cantidad;
}

function validarInputCantidad(inputCantidad){
    while(inputCantidad < 1){
        inputCantidad = prompt('La cantidad debe ser mayor que 0, ingrésela nuevamente.');
    }  
    return inputCantidad;
}

function seleccionarImpuesto(){
    let inputImpuesto;
    let impuesto;

    inputImpuesto = prompt('Seleccione el impuesto correspondiente para el producto! Ingrese:\n1 - 0%\n2 - 10.5%.\n3 - 21%.\n4 - 27%.');
    impuesto = validarInputImpuesto(inputImpuesto);
    return impuesto;
}

function validarInputImpuesto(inputImpuesto){
    let impuesto;

    while(!(inputImpuesto == '1' || inputImpuesto == '2' || inputImpuesto == '3' || inputImpuesto == '4')){
        inputImpuesto = prompt('Opción inválida. Ingrese:\n1 - 0%\n2 - 10.5%.\n3 - 21%.\n4 - 27%.');
    }  
    if (inputImpuesto == '1') impuesto = 0.00
    if (inputImpuesto == '2') impuesto = 10.50;
    if (inputImpuesto == '3') impuesto = 21.00;
    if (inputImpuesto == '4') impuesto = 27.00;
    return impuesto;
}

function asignarNumero(tipoDocumento){
    let numeroDocumento;

    if (tipoDocumento == 'Factura') {
        numeradorFactura++;
        numeroDocumento = numeradorFactura;
    }
    if (tipoDocumento == 'Nota de Crédito') {
        numeradorNotaDeCredito++;
        numeroDocumento = numeradorNotaDeCredito;
    }
    if (tipoDocumento == 'Nota de Débito') {
        numeradorNotaDeDebito++;
        numeroDocumento = numeradorNotaDeDebito;
    }
    return numeroDocumento;
}

function mostrarListaDocumentos(){
    if(listaDocumentos.length == 0){
        alert("Todavía no hay documentos creados.");
        return;
    }
    listaDocumentos.forEach( (doc) => { doc.mostrarDocumento() });
}

// function calcularTotal(listaDocumentoDetalle){
//     let impuesto;
//     let total = 0;

//     listaDocumentoDetalle.forEach( (det) => {
//         impuesto = 1 + det.impuesto / 100;
//         total += det.precio * det.cantidad * impuesto;
//     });
//     return total;
// }

