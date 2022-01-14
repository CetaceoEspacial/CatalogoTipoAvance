    var NombreReporte = "";
var tiporeporteGlobal = 0;

function consultarBeneficiarios() {
   
    var jsonGral = [];
    var a = "";
    $('#tablaBeneficiario').empty();
    $.ajax({
        url: '/Reports/buscarBeneficiarios',
        data: { parametro: a },
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            if (json.StatusCode == "404") {
                jsonGral = [];
                alert("No se encontraron resultados");
                return false;
            } else {
                if (json) {
                    var trHTML = '';
                    jsonGral = JSON.parse(json);
                    $.each(jsonGral, function (i, item) {
                        trHTML += '<tr>' +
                            '<td>' + item.Row + '</td >' +
                            '<td>' + item.vNumeroEmpleado + '</td >' +
                            '<td>' + item.vNombre + '</td>' +
                            '<td>' + item.vNombreBeneficiario + '</td>' +
                            '<td><button type="button" id="btnGuardar' + item.Row + '" name="btnGuardar' + item.Row + '" class="btn btn-default btn-sm" onclick = "generarConstancia(' + item.nIdPension + ',\'' + item.vNumeroEmpleado + '\')" > <span class="glyphicon glyphicon-print"></span>  Generar Constancia</button ></td > ' +
                            '</tr> ';
                    });
                    $('#tablaBeneficiario').append(trHTML);
                }
            }
        },
        error: function (xhr, status) {
            if (xhr.status.toString() == "535") {
                alert('La sesión se ha caducado o no ha iniciado sesión ');
                window.location.pathname = "/Login";
            }
        }
    });
}

function consultaAnios(tipoReporte) {
    //######################################################################################################
    //CONSULTA DE AREAS
    $.ajax({
        type: "POST",
        url: "/Reports/ConsultaAnios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (resultado) {
            var result = resultado;
            if (tipoReporte == 2) {
                $("#R2Anio").html('');
                for (var i in resultado) {
                    $("#R2Anio").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#R2Anio').val("");
                }
            }
            if (tipoReporte == 6) {
                $("#R6Anio").html('');
                for (var i in resultado) {
                    $("#R6Anio").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#R6Anio').val("");
                }
            }
            if (tipoReporte == 1 || tipoReporte == 3 || tipoReporte == 4 || tipoReporte == 5 || tipoReporte == 6 || tipoReporte == 7 || tipoReporte == 9 || tipoReporte == 10 ||
                tipoReporte == 11 || tipoReporte == 13 || tipoReporte == 14 || tipoReporte == 15 || tipoReporte == 16 || tipoReporte == 17 || tipoReporte == 18 || tipoReporte == 19 ||
                tipoReporte == 20 || tipoReporte == 21 || tipoReporte == 22 || tipoReporte == 23) {
                $("#RAnioGen").html('');
                for (var i in resultado) {
                    $("#RAnioGen").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#RAnioGen').val("");
                }
            }
            if (tipoReporte == 24) {
                $("#R24Anio").html('');
                for (var i in resultado) {
                    $("#R24Anio").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#R24Anio').val("");
                }
            }
            
            if (tipoReporte == 15) {
                $("#R15Anio").html('');
                for (var i in resultado) {
                    $("#R15Anio").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#R15Anio').val("");
                }
            }
            if (tipoReporte == 21) {
                $("#RAnio21").html('');
                for (var i in resultado) {
                    $("#RAnio21").append('<option value="' + resultado[i].nAnio + '">' + resultado[i].nAnio + '</option>');
                    $('#RAnio21').val("");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error interno del servidor");
        }
    });
}

function llamadoMes(tipoReporte) {
    var Anio = $("#R15Anio").val();
    var stringFiltro = 'R2Anio:"' + Anio + '"';
    var data = '{' + stringFiltro + '}';
    $.ajax({
        type: "POST",
        url: "/Reports/ConsultaMes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        async: true,
        success: function (resultado) {
            var result = resultado;
            
                $("#R15Quin").html('');
                for (var i in resultado) {
                    $("#R15Quin").append('<option value="' + resultado[i].Mes + '">' + resultado[i].MesDesc + '</option>');
                    $('#R15Quin').val("");
                    $("#R15Quin").prop('disabled', false);
                }
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error interno del servidor");
        }
    });
}

function llamadoQuincenas(tipoReporte) {
    if (tipoReporte == 2) {
        var Anio = $("#R2Anio").val();
        consultaQuincenas(Anio, tipoReporte);
    }
    if (tipoReporte == 6) {
        var Anio = $("#R6Anio").val();
        consultaQuincenas(Anio, tipoReporte);
    }
    if (tipoReporte == 24) {
        var Anio = $("#R24Anio").val();
        consultaQuincenas(Anio, tipoReporte);
    }
    if (tipoReporte == 21) {
        var Anio = $("#RAnio21").val();
        consultaQuincenas(Anio, tipoReporte);
    }
    if (tipoReporte == 0) {
        var Anio = $("#RAnioGen").val();
        consultaQuincenas(Anio, tipoReporte);
    }
}

function consultaQuincenas(Anio, tipoReporte) {
    //######################################################################################################
    //CONSULTA DE QUINCENAS
    var stringFiltro = 'R2Anio:"' + Anio + '"';
    var data = '{' + stringFiltro + '}';
    var urll = "/Reports/ConsultaQuincenas";
    if (tiporeporteGlobal == 21){
        urll = "/Reports/ConsultaQuincenasTodas";
    }
    $.ajax({
        type: "POST",
        url: urll,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        async: true,
        success: function (resultado) {
            var result = resultado;
            if (tipoReporte == 2) {
                $("#R2Quin").html('');
                for (var i in resultado) {
                    $("#R2Quin").append('<option value="' + resultado[i].nQuincena + '">' + resultado[i].nQuincena + '</option>');
                    $('#R2Quin').val("");
                    $("#R2Quin").prop('disabled', false);
                }
            }
            if (tipoReporte == 6) {
                $("#R6Quin").html('');
                for (var i in resultado) {
                    $("#R6Quin").append('<option value="' + resultado[i].nQuincena + '">' + resultado[i].nQuincena + '</option>');
                    $('#R6Quin').val("");
                    $("#R6Quin").prop('disabled', false);
                }
            }
            if (tipoReporte == 24) {
                $("#R24Quin").html('');
                for (var i in resultado) {
                    $("#R24Quin").append('<option value="' + resultado[i].nQuincena + '">' + resultado[i].nQuincena + '</option>');
                    $('#R24Quin').val("");
                    $("#R24Quin").prop('disabled', false);
                }
            }
            if (tipoReporte == 21) {
                $("#RQuin21").html('');
                for (var i in resultado) {
                    $("#RQuin21").append('<option value="' + resultado[i].nQuincena + '">' + resultado[i].nQuincena + '</option>');
                    $('#RQuin21').val("");
                    $("#RQuin21").prop('disabled', false);
                }
            }
            if (tipoReporte == 0) {
                $("#RQuinGen").html('');
                for (var i in resultado) {
                    $("#RQuinGen").append('<option value="' + resultado[i].nQuincena + '">' + resultado[i].nQuincena + '</option>');
                    $('#RQuinGen').val("");
                    $("#RQuinGen").prop('disabled', false);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error interno del servidor");
        }
    });
}


function consultaAreas(tipoReporte) {
    //######################################################################################################
    //CONSULTA DE AREAS
    $.ajax({
        type: "POST",
        url: "/Reports/ConsultaAreas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (resultado) {
            var result = resultado;
            if (tipoReporte == 2) {
                $("#R2Area").html('');
               // $("#R2Area").append('option value="0">Seleccione</option');
                for (var i in resultado) {
                    $("#R2Area").append('<option value="' + resultado[i].nIdArea + '">' + resultado[i].vArea + '</option>');
                    $('#R2Area').val("");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error interno del servidor");
        }
    });
}

function generarR1() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvDetalleSeguroSeparacionIndiv?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=" ;
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR2() { 
    var Error = 0;
    var R2Anio = $("#R2Anio").val(); if (R2Anio == "" || R2Anio == null) { $('#msgR2Anio').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;} 
    var R2Quin = $("#R2Quin").val(); if (R2Quin == "" || R2Quin == null) { $('#msgR2Quin').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; } 
    var R2Area = $("#R2Area").val();
    if (Error == 0) {
        url = "/Reports/rpvDepositoChequesDetalle?R2Anio=" + R2Anio + "&R2Quin=" + R2Quin + "&R2Area=" + R2Area + "&vOrigen="  ;
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}
function generarR3() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvNominaClavePres?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}


function generarR4() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvSubsidioEmpleo?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR5() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvClabesInters?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen;
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

$("#fecha").datepicker({
    format: 'yyyy/mm/dd',
    todayHighlight: true,
    autoclose: true
});

function generarR6() {
    var Error = 0;
    var R6Anio = $("#R6Anio").val(); if (R6Anio == "" || R6Anio == null) { $('#msgR6Anio').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var R6Quin = $("#R6Quin").val(); if (R6Quin == "" || R6Quin == null) { $('#msgR6Quin').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var R6Tipo = $("#R6Tipo").val(); if (R6Tipo == "" || R6Tipo == null) { $('#msgR6Tipo').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvNominaRaya?R6Anio=" + R6Anio + "&R6Quin=" + R6Quin + "&R6Tipo=" + R6Tipo + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}


function generarR7() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvGastosMedicos?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR9() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvNominaQuincenal?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR10() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvINFONAVIT?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR11() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvTotalesNomina?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
       // url = "/Reports/rpvNominaClaves?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}


function generarR12() {
    var Error = 0;
    var R12estatusArea = $("#R12estatusArea").val();
    var R12formato = $("#R12formato").val();
    if (R12estatusArea == "" || R12estatusArea == null) {
        $('#msgR12estatusArea').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;
    };
    if (Error == 0) {
        url = "/Reports/rpvReportePlazasPlantilla?R12estatusArea=" + R12estatusArea + "&R12formato=" + R12formato;
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}
function generarR13() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvNominaClaves?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        //url = "/Reports/rpvTotalesNomina?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}
function generarR14() {
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvRetencionesIMMS?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}

function generarR15() {
    var Error = 0;
    var RAnioGen = $("#R15Anio").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    var RQuinGen = $("#R15Quin").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
    if (Error == 0) {
        url = "/Reports/rpvImpuestoSoNomina?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen;
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}
function generarR16() {
    var Error = 0;
    var vNumeroEmpleado = $("#vNumeroEmpleado1").val();
    var Adscrito = $("#Adscrito").val();
    if (vNumeroEmpleado == "" || vNumeroEmpleado == null) {
        $('#vNumeroEmpleado1').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;
    }
   
        if (Error == 0) {
            url = "/Reports/rpvConstanciaLaboral?vNumeroEmpleado=" + vNumeroEmpleado + "&Adscrito=" + Adscrito;
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function generarR17() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvIncapacidades?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function generarR18() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvFONACOT?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }
    function generarR19() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvFaltas?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    
    function generarR20() {
        var Error = 0;
        var vNumeroEmpleado = $("#nIdEmpleado").val();
        if (vNumeroEmpleado == "" || vNumeroEmpleado == null) {
            $('#nIdEmpleado').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>');
        }
        if (Error == 0) {

            $.ajax({
                type: "POST",
                url: "/Reports/ConsultaExisteEmpleado?vNumeroEmpleado=" + vNumeroEmpleado,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (resultado) {
                    if (resultado==1){
                        url = "/Reports/rpvDatosEmpleado?vNumeroEmpleado=" + vNumeroEmpleado;
                        location.href = url;
                        $("#modalParamRep").modal('hide');
                    } else {
                        alert("El número de empleado no es valido");

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Error interno del servidor");
                }
            });
        }
    }

function pad(numEmpleado) {
    var numEmpleado = numEmpleado.toString();
    while (numEmpleado.length < 5)
        numEmpleado = "0" + numEmpleado;
    return numEmpleado;
    }

function generarConstancia(idPension, numEmpleado) {
    console.log(numEmpleado);
    var Error = 0;
    var RAnioGen = $("#RAnioGen").val();
    var Juez = $("#Juez").val();
    var Oficio = $("#Oficio").val();
    var fecha = $("#fecha").val();
    var NombreResponsa = $("#NombreResponsa").val();
    if (RAnioGen == "" || RAnioGen == null) {
        $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;
    }
    var RQuinGen = $("#RQuinGen").val();
    if (RQuinGen == "" || RQuinGen == null) {
        $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;
    }
    if (Error == 0) {
        url = "/Reports/rpvPension?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&Juez=" + Juez + "&Oficio=" + Oficio +
            "&fecha=" + fecha + "&NombreResponsa=" + NombreResponsa + "&idPension=" + idPension + "&numEmpleado=" + pad(numEmpleado);
        location.href = url;
        $("#modalParamRep").modal('hide');
    }
}



    function generarR22() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvAjusteIMSS?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function generarR23() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvSSIVoluntario?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen + "&vOrigen=";
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function generarR24() {
        var Error = 0;
        var vNumeroEmpleado = $("#vNumeroEmpleado24").val();
        if (vNumeroEmpleado == "" || vNumeroEmpleado == null) {
            $('#vNumeroEmpleado24').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++;
        }
        if (Error == 0) {
            url = "/Reports/rpvDatosEmpleado?&vNumeroEmpleado=" + vNumeroEmpleado;
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function generarR25() {
        var Error = 0;
        var RAnioGen = $("#RAnioGen").val(); if (RAnioGen == "" || RAnioGen == null) { $('#msgRAnioGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        //var RQuinGen = $("#RQuinGen").val(); if (RQuinGen == "" || RQuinGen == null) { $('#msgRQuinGen').html('<p style="color:#FF0000";>' + 'Campo Obligatorio' + '</p>'); Error++; }
        if (Error == 0) {
            url = "/Reports/rpvTresPorciento?RAnioGen=" + RAnioGen + "&RQuinGen=" + RQuinGen;
            location.href = url;
            $("#modalParamRep").modal('hide');
        }
    }

    function abreModalRep(tipoReporte) {
        //alert("SSI");
        $("#modalGenerico").hide();
        $("#modalEmpledo").hide();
        $("#pension").hide();
        $("#modalEmpleado2").hide();
        $("#recibo").hide();
        $("#tresPor").hide();
        $("#modalR2").hide();
        $("#modalR3").hide();
        $("#modalR6").hide();
        $("#modalR12").hide();
        $("#btnR1").hide();
        $("#btnR2").hide();
        $("#btnR3").hide();
        $("#btnR4").hide();
        $("#btnR5").hide();
        $("#btnR6").hide();
        $("#btnR7").hide();
        $("#btnR9").hide();
        $("#btnR10").hide();
        $("#btnR11").hide();
        $("#btnR12").hide();
        $("#btnR13").hide();
        $("#btnR14").hide();
        $("#btnR15").hide();
        $("#btnR16").hide();
        $("#btnR17").hide();
        $("#btnR18").hide();
        $("#btnR19").hide();
        $("#btnR20").hide();
        $("#btnR21").hide();
        $("#btnR22").hide();
        $("#btnR23").hide();
        $("#btnR24").hide();
        $("#btnR25").hide();

        if (tipoReporte == 1) {
            $("#myModalLabel").html("Seguro de Separación Individualizado");
            $("#modalGenerico").show();
            $("#btnR1").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 2) {
            $("#myModalLabel").html("Detalle de Depósitos y Cheques");
            $("#modalR2").show();
            $("#btnR2").show();
            consultaAnios(tipoReporte);
            $("#R2Quin").prop('disabled', true);
            $('#R2Quin').val("");
            consultaAreas(tipoReporte);
        }
        if (tipoReporte == 3) {
            $("#myModalLabel").html("Totales de Nómina por Clave Presupuestal");
            $("#modalGenerico").show();
            $("#btnR3").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }

        if (tipoReporte == 4) {
            $("#myModalLabel").html("Subsidio al Empleo");
            $("#modalGenerico").show();
            $("#btnR4").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 5) {
            $("#myModalLabel").html("CLABE Interbancaria");
            $("#modalGenerico").show();
            $("#btnR5").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 6) {
            $("#myModalLabel").html("Nómina Ordinaria");
            $("#modalR6").show();
            $("#btnR6").show();
            consultaAnios(tipoReporte);
            $("#R6Quin").prop('disabled', true);
            $('#R6Quin').val("");
        }
        if (tipoReporte == 7) {
            $("#myModalLabel").html("Gastos Médicos Mayores");
            $("#modalGenerico").show();
            $("#btnR7").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 9) {
            $("#myModalLabel").html("Nómina Quincenal");
            $("#modalGenerico").show();
            $("#btnR9").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 10) {
            $("#myModalLabel").html("Préstamo Hipotecario INFONAVIT");
            $("#modalGenerico").show();
            $("#btnR10").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 11) {
            $("#myModalLabel").html("Totales de Nómina, Cuentas Presupuestales y Contables");
            $("#modalGenerico").show();
            $("#btnR11").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 12) {
            $("#myModalLabel").html("Plantilla de Personal");
            $("#modalR12").show();
            $("#btnR12").show();
        }
        if (tipoReporte == 13) {
            $("#myModalLabel").html("Totales de Nómina por Centro de Costo");
            $("#modalGenerico").show();
            $("#btnR13").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 14) {
            $("#myModalLabel").html("Aportaciones y Retenciones del IMSS");
            $("#modalGenerico").show();
            $("#btnR14").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 15) {
            $("#myModalLabel").html("Impuesto sobre Nómina");
            $("#tresPor").show();
            $("#btnR15").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }

        if (tipoReporte == 16) {
            $("#myModalLabel").html("Constancia Laboral");
            $("#modalEmpledo").show();
            $("#btnR16").show();
        }
        if (tipoReporte == 17) {
            $("#myModalLabel").html("Incapacidades");
            $("#modalGenerico").show();
            $("#btnR17").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 18) {
            $("#myModalLabel").html("Crédito FONACOT");
            $("#modalGenerico").show();
            $("#btnR18").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 19) {
            $("#myModalLabel").html("Faltas Injustificadas");
            $("#modalGenerico").show();
            $("#btnR19").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 20) {
            $("#myModalLabel").html("Datos Empleado");
            $("#modalEmpleado2").show();
            $("#btnR20").show();
        }
        if (tipoReporte == 21) {
            $("#myModalLabel").html("Pensión Alimenticia");
            $("#pension").show();
            $("#modalGenerico").show();
            tiporeporteGlobal = tipoReporte;
            consultaAnios(tipoReporte);
            consultarBeneficiarios();
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }

        if (tipoReporte == 22) {
            $("#myModalLabel").html("Ajuste IMSS");
            $("#modalGenerico").show();
            $("#btnR22").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 23) {
            //alert("SSI");
            $("#myModalLabel").html("SSI Voluntario");
            $("#modalGenerico").show();
            $("#btnR23").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
        if (tipoReporte == 24) {
            $("#myModalLabel").html("Recibo de Nómina");
            $("#recibo").show();
            $("#btnR24").show();
            consultaAnios(tipoReporte);
            $("#R24Quin").prop('disabled', true);
            $('#R24Quin').val("");
        }
        $("#modalParamRep").modal('show');

        if (tipoReporte == 25) {
            $("#myModalLabel").html("Tres Porciento");
            $("#modalGenerico").show();
            $("#btnR25").show();
            consultaAnios(tipoReporte);
            $("#RQuinGen").prop('disabled', true);
            $('#RQuinGen').val("");
        }
    }


    function cierraModalRep () {
        $("#modalParamRep").modal('hide');
    }

    function generarReporte() {
        alert("Generando Reporte");
        var txtAnio = $("#txtAnio").val();
        var txtQuin =$("#txtQuin").val();
        var catArea = $("#catArea").val();
        alert(txtAnio);
        alert(txtQuin);
        alert(catArea);
    }
