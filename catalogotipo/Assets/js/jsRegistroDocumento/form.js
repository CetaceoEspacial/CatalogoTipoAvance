/****** Form:  Registro de Documento    Java Script Date: 10/09/2021 13:45:58 ******/
/****** Autor: Luisa Lopez Vazquez @LLV******/

///***************************************Sesion storare**********************************
$(document).ready(function () {
    var y = new Date().getFullYear();
    if (sessionStorage.getItem("IdUsuario") != "" && sessionStorage.getItem("IdUsuario") != null) {
        llenarUsuario();
    } else {
        $("#mainContent").load("/Assets/vistas/ErrorDeCredenciales.html");
    }
});
function llenarUsuario() {

    $("#lCargo").html(atob(sessionStorage.getItem("Cargo")));
    $("#lNombre").html(atob(sessionStorage.getItem("NombreCompleto")));
    $("#lClaveArea").html(atob(sessionStorage.getItem("OrganoSuperior")));
    $("#lArea").html(atob(sessionStorage.getItem("TxtOrganoSuperior")));
    $("#lClaveUR").html(atob(sessionStorage.getItem("UnidadPresupuestal")));
    $("#lUnidad").html(atob(sessionStorage.getItem("TxtUnidadPresupuestal")));
    $("#idUsuario").html(atob(sessionStorage.getItem("IdUsuario")));

}
///***************************************Save Document**********************************
$(document).ready(function () {
    var ejercicio = new Date().getFullYear();
    $("#cEjercicio").val(ejercicio);
    select = "";
    trHTML = "";
    $("#divResultados").hide();
    $.ajax({
        type: "POST",
        url: "/RegistroDeDocumento/obtenerRemitente",
        data: JSON.stringify({
                        'lClaveArea': $('#lClaveArea').html(),
                        'lClaveUR': $('#lClaveUR').html(),
                        'lUnidad': $("#lUnidad").html(),
                    }),
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            jsonRemitente = JSON.parse(response);
            if (jsonRemitente.length > 0) {
                select = select;
            } else {
                select = select + '<option value=0>No Existen Remitentes</option>';
            }
        },
        failure: function (response) {
            console.log('Error 1');
        },
        error: function (response) {
            console.log('Error 2');
        }
    });

    $.each(jsonRemitente, function (j, item) {
        var id = $("#nIdRemitenteAnt").val();
        console.log(item);
        select = select + '<option value="' + item.nIdRemitente + '" ';
        if (j == 0) {
            $("#nombreRemiente").val(item.vNombreRemitente);
        }
        if ($("#nIdRemitenteAnt").val() == item.nIdRemitente) {
            select2 = select2 + 'selected="selected"';
        }
        select = select + '>' + item.vNombreRemitente + '</option>';
    });

    $("#remitente").change(function () {
        var aid = $('#remitente').val();
        var $selectedOption = $(this).find('option:selected');
        var selectedLabel = $selectedOption.text();
        var selectedValue = $selectedOption.val();
        var partsOfStr = selectedLabel.split('-');
        var aux = partsOfStr[1];
        $("#nombreRemiente").val(selectedLabel);
    });

    trHTML += select;
    $('#remitente').append(trHTML);

    select2 = "";
    trHTML2 = "";
    $.ajax({
        type: "POST",
        url: "/RegistroDeDocumento/obtenerTipoDocumento",
        data: '',
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            jsonTipoProcedimiento = JSON.parse(response);
            if (jsonTipoProcedimiento.length > 0) {
                select2 = select2;
            } else {
                select2 = select2 + '<option value=0>No Existen Tipos de Documento</option>';
            }
        },
        failure: function (response) {
            console.log('Error 1');
        },
        error: function (response) {
            console.log('Error 2');
        }
    });


    $.each(jsonTipoProcedimiento, function (j, item) {
        var id = $("#nIdTipoDocumentoAnt").val();
        select2 = select2 + '<option value="' + item.nIdTipoDocumento + '" ';
        if ($("#nIdTipoDocumentoAnt").val() == item.nIdTipoDocumento) {

            select2 = select2 + 'selected="selected"';
        }
        select2 = select2 + '>' + item.vDescripcion + '</option>';
    });

    $("#tipoDocumento").change(function () {
        var aid = $('#tipoDocumento').val();
    });

    trHTML2 += select2;
    $('#tipoDocumento').append(trHTML2);


    select3 = "";
    trHTML3 = "";
    $.ajax({
        type: "POST",
        url: "/RegistroDeDocumento/obtenerOrganoSuperior",
        data: JSON.stringify({
            'cEjercicio': $("#cEjercicio").val(),
        }),
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            jsonOrganoSuperior = JSON.parse(response);
            if (jsonOrganoSuperior.length > 0) {
                select3 = select3;
            } else {
                select3 = select3 + '<option value=0>No Existen Organos Superiores</option>';
            }
        },
        failure: function (response) {
            console.log('Error 1');
        },
        error: function (response) {
            console.log('Error 2');
        }
    });


    $.each(jsonOrganoSuperior, function (j, item) {
        var id = $("#cveOrganoAnt").val();
        select3 = select3 + '<option value="' + item.Cve_Organo_Superior + '" ';
        if (j == 0) {
           $("#descripcionOrgano").val(item.Txt_Organo_Superior);
        }
        if ($("#cveOrganoAnt").val() == item.Cve_Organo_Superior) {

            select3 = select3 + 'selected="selected"';
        }
        select3 = select3 + '>' + item.Txt_Organo_Superior_clave + '</option>';
        
    });

    var cveOrgano = 4;
    $("#organoSuperior").change(function () {
        cveOrgano = $('#organoSuperior').val();

        var $selectedOption = $(this).find('option:selected');
        var selectedLabel = $selectedOption.text();
        var selectedValue = $selectedOption.val();

        var partsOfStr = selectedLabel.split('-');
        var aux = partsOfStr[1];
        $("#descripcionOrgano").val(aux);

        select5 = "";
        trHTML5 = "";
        $('#ur').html("");

        $.ajax({
            type: "POST",
            url: "/RegistroDeDocumento/obtenerUnidadResponsable",
            data: JSON.stringify({
                'cveOrgano': cveOrgano,
                'cEjercicio': $("#cEjercicio").val(),
            }),
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (response) {
                jsonUnidad = JSON.parse(response);
                if (jsonUnidad.length > 0) {
                    select5 = select5;
                 
                } else {
                    select5 = select5 + '<option value=0>No Existen Organos Superiores</option>';
                }
            },
            failure: function (response) {
                console.log('Error 1');
            },
            error: function (response) {
                console.log('Error 2');
            }
        });


        $.each(jsonUnidad, function (j, item) {
            var id = $("#cveURAnt").val();
            select5 = select5 + '<option value="' + item.Cve_Unidad_Presupuestal + '" ';

            if (j == 0) {
                $("#descripcionUR").val(item.Txt_Unidad_Presupuestal);
            }

            if ($("#cveURAnt").val() == item.Cve_Unidad_Presupuestal) {

                select5 = select5 + 'selected="selected"';
            }
            select5 = select5 + '>' + item.Txt_Unidad_Presupuestal_clave + '</option>';
        });

        $("#ur").change(function () {
            var aid = $('#ur').val();
            var $selectedOption = $(this).find('option:selected');
            var selectedLabel = $selectedOption.text();
            var selectedValue = $selectedOption.val();
            var partsOfStr = selectedLabel.split('-');
            var aux = partsOfStr[1];
            $("#descripcionUR").val(aux);
        });

        trHTML5 += select5;
        $('#ur').append(trHTML5);


    });

    trHTML3 += select3;
    $('#organoSuperior').append(trHTML3);


    select = "";
    trHTML = "";
    $.ajax({
        type: "POST",
        url: "/RegistroDeDocumento/obtenerUnidadResponsable",
        data: JSON.stringify({
            'cveOrgano': cveOrgano,
            'cEjercicio': $("#cEjercicio").val(),
        }),
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            jsonOrganoSuperior = JSON.parse(response);
            if (jsonOrganoSuperior.length > 0) {
                select = select;
            } else {
                select = select + '<option value=0>No Existen Organos Superiores</option>';
            }
        },
        failure: function (response) {
            console.log('Error 1');
        },
        error: function (response) {
            console.log('Error 2');
        }
    });


    $.each(jsonOrganoSuperior, function (j, item) {
        var id = $("#cveURAnt").val();
        select = select + '<option value="' + item.Cve_Unidad_Presupuestal + '" ';
        if (j == 0) {
            $("#descripcionUR").val(item.Txt_Unidad_Presupuestal);
        }
        if ($("#cveURAnt").val() == item.Cve_Unidad_Presupuestal) {

            select = select + 'selected="selected"';
        }
        select = select + '>' + item.Txt_Unidad_Presupuestal_clave + '</option>';
    });

    $("#ur").change(function () {
        var aid = $('#ur').val();
        var $selectedOption = $(this).find('option:selected');
        var selectedLabel = $selectedOption.text();
        var selectedValue = $selectedOption.val();
        var partsOfStr = selectedLabel.split('-');
        var aux = partsOfStr[1];
        $("#descripcionUR").val(aux);
    });

    trHTML += select;
    $('#ur').append(trHTML);


    $(function () {
        $('body').on('focus', ".datepicker", function () {
            $.fn.datepicker.defaults.language = 'es';
            $(this).datepicker({
                format: "dd/mm/yyyy",
                autoclose: true
            });
        });
    });

    //Metodo para validar los campos que son requeridos
    function ValidaForm() {
        var errores = 0;
        var idRemitente = $("#remitente").val();
        if (idRemitente == 0) {
            $("#error-tipo-evento").html("Campo requerido");
            errores++;
        }
        var cveOrgano = $("#organoSuperior").val();
        if (cveOrgano == "") {
            $("#error-tipo-evento").html("Campo requerido");
            errores++;
        }
        if (!$("#descripcionOrgano").val()) {
            $("#error-descripcion-organo").html("Campo requerido");
            $("#descripcionOrgano").addClass("invalid");
            errores++;
        }
        var cveUnidad = $("#ur").val();
        if (cveUnidad == "") {
            $("#error-unidad").html("Campo requerido");
            errores++;
        }
        if (!$("#descripcionUR").val()) {
            $("#error-descripcion-unidad").html("Campo requerido");
            $("#descripcionUR").addClass("invalid");
            errores++;
        }
        if (!$("#nombreRemiente").val()) {
            $("#error-descripcion-remitente").html("Campo requerido");
            $("#nombreRemiente").addClass("invalid");
            errores++;
        }
        var idTipoDocumento = $("#tipoDocumento").val();
        if (idTipoDocumento == 0) {
            $("#error-tipo-documento").html("Campo requerido");
            errores++;
        }
        if (!$("#noDocumento").val()) {
            $("#error-numero-documento").html("Campo requerido");
            $("#noDocumento").addClass("invalid");
            errores++;
        }
        if (!$("#fFechaDocumento").val()) {
            $("#error-fecha-documento").html("Campo requerido");
            $("#fFechaDocumento").addClass("invalid");
            errores++;
        }
        if (!$("#fFechaRecepcion").val()) {
            $("#error-fecha-recepcion").html("Campo requerido");
            $("#fFechaRecepcion").addClass("invalid");
            errores++;
        }
        if ($("#fFechaDocumento").val() > $("#fFechaRecepcion").val()) {
            $("#error-fecha-documento").html("La Fecha de Documento no debe ser mayor a la Fecha de Recepción");
            $("#fFechaDocumento").addClass("invalid");
            errores++;
        }
        if (!$("#hora").val()) {
            $("#error-hora").html("Campo requerido");
            $("#hora").addClass("invalid");
            errores++;
        } else {
          
        }

        if (!$("#vAsunto").val()) {
            $("#error-asunto").html("Campo requerido");
            $("#vAsunto").addClass("invalid");
            errores++;
        }
        if (!$("#vReferencia").val()) {
            $("#error-referencia").html("Campo requerido");
            $("#vReferencia").addClass("invalid");
            errores++;
        }
        return errores;
    }

    //Funcion que guarda un registro
    $("#btnSave").click(function () {
        if (ValidaForm() > 0) {
            return false;
        }
        var remitente = $('#remitente option:selected').html();
        var descDocumento = $('#tipoDocumento option:selected').html();
        var mensaje = "";
        $.ajax({
            type: "POST",
            url: "/RegistroDeDocumento/guardarDocumento",
            data: JSON.stringify({
                'noDocumento': $("#noDocumento").val(),
                'fFechaDocumento': $("#fFechaDocumento").val(),
                'fFechaRecepcion': $("#fFechaRecepcion").val(),
                'hora': $("#hora").val(),
                'vAsunto': $("#vAsunto").val(),
                'vObservaciones': $("#vObservaciones").val(),
                'vReferencia': $("#vReferencia").val(),
                'remitente': $("#nombreRemiente").val(),
                'vCargo': $("#vCargo").val(),
                'ur': $("#ur").val(),
                'organoSuperior': $("#organoSuperior").val(),
                'ur': $("#ur").val(),
                'descripcionUR': $("#descripcionUR").val(),
                'descripcionOrgano': $("#descripcionOrgano").val(),
                'tipoDocumento': $("#tipoDocumento").val(),
                'lClaveUR': $('#lClaveUR').html(),
                'lUnidad': $("#lUnidad").html(),
                'descDocumento': descDocumento,
                'cEjercicio': $("#cEjercicio").val(),
                'nombreRemiente': $("#lNombre").html(),
                'lNumUsuario': $("#idUsuario").html(),
            }),
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (json) {
                if (json) {

                    if (json.noFolio) {
                        console.log("¡Mi mensaje recuperado es");
                        console.log(json.noFolio);
                        mensaje = json.noFolio;
                        $("#mensaje").html(mensaje);
                        $("#noFolio").modal({ backdrop: 'static', keyboard: false, show: true });
                        // $("#CerradoCorrecatamente").modal('show');

                    }
                }
                else {
                    alert('Ha ocurrido un error en el servidor ');
                }
            },
            failure: function (response) {
                alert(response.responseText);
            },
        });

    });

    $("#btnCerrarGuardado").click(function () {
        window.location.pathname = "/RegistroDeDocumento";
    });

    //Funcion que valida si el perfil tiene permisos de editar la fecha de recepcion de documento
    var perfil = "captura";
    if (perfil == "adminRegistro") {
        document.getElementById("fFechaRecepcion").disabled = false;
        var d = new Date();
        var aux = d.getHours() + ':' + d.getMinutes();
        $("#hora").val(d.getHours() + ':' + d.getMinutes());
        document.getElementById("hora").disabled = false;
    } else {
        document.getElementById("fFechaRecepcion").disabled = true;
        var d = new Date();
        var aux = d.getHours() + ':' + d.getMinutes();
        $("#hora").val(d.getHours() + ':' + d.getMinutes());
        document.getElementById("hora").disabled = true;
    }

    //Funcion que permite cargar un documentoss
    $('#btnUpload').click(function () {
        //alert("Ingreso!!");

        $.ajax({
            type: "POST",
            url: "/RegistroDeDocumento/obtenerAreas",
            data: JSON.stringify({
                'lClaveArea': $('#lClaveArea').html(),
                'lClaveUR': $('#lClaveUR').html(),
                'lUnidad': $("#lUnidad").html(),
                'nombreUsuario': $("#lNombre").html(),
                'cEjercicio': $("#cEjercicio").val(),
            }),
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (response) {
                jsonRemitente = JSON.parse(response);
                if (jsonRemitente.length > 0) {
                    select = select;
                } else {
                    select = select + '<option value=0>No Existen Remitentes</option>';
                }
            },
            failure: function (response) {
                console.log('Error 1');
            },
            error: function (response) {
                console.log('Error 2');
            }
        });

        // Checking whether FormData is available in browser
        if ($("#dataFile").val() != "") {

            $("#divMsjLayout").removeClass("alert alert-danger");
            $("#divMsjLayout").removeClass("alert alert-success");
            $("#msjLayout").text("");

            if (window.FormData !== undefined) {

                var fileUpload = $("#dataFile").get(0);
                var files = fileUpload.files;

                // Create FormData object
                var fileData = new FormData();

                // Looping over all files and add it to FormData object
                for (var i = 0; i < files.length; i++) {
                    fileData.append(files[i].name, files[i]);
                }

                // Adding one more key to FormData object
                fileData.append('origen', '2');
                trHTML = "";
                $('#tbody_archivos').empty();
                $.ajax({
                    url: '/RegistroDeDocumento/Upload',
                    type: "POST",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    data:fileData,
                     success: function (json) {
                        jsonGral = JSON.parse(json);
                        if (jsonGral.length > 0) {
                            $.each(jsonGral, function (i, item) {
                            
                                trHTML += '<tr>' +
                                    '<input type="hidden" id="nIdArchivo" name="id_' + i + '" value="' + item.nIdArchivo + '">'+
                                    '<td>' + item.vNombre + '</td>' +
                                    '<td>' + '<a class="btn btn-danger btn-sm  btnDelete   id="eliminar_' + item.nIdArchivo + '" ' + '">&nbsp;Eliminar</a>' + '</td>'
                                    +'</tr> ';
                            });
                            $('#tbody_archivos').append(trHTML);
                            $("#divResultados").show();
                        } else { $("#divResultados").hide(); }
                    },
                    error: function (err) {
                        $("#divMsjLayout").addClass("alert alert-danger");
                        $("#msjLayout").text(result);
                    }
                });
            } else {
                alert("FormData is not supported.");
            }
        } else {
            $("#divMsjLayout").addClass("alert alert-danger");
            $("#msjLayout").text("Selecciona el archivo a subir");
        }
    });


    EliminarRegistro();
    var nIdBus, tr;
    function EliminarRegistro() {
        $("#tbody_archivos tr").on("click", ".btnDelete", function (i, e) {
            console.log("entre-----");
        });
    }

});

///***************************************delete document**********************************
$(document).on('click', '.btnDelete', function (event) {
    tr = $(this).parents("tr");
    var nIdArchivo = $(this).parents("tr").find("#nIdArchivo").val();
    console.log("id: " + nIdArchivo);
    event.preventDefault();
    $(this).closest('tr').remove();
    $.ajax({
        type: "POST",
        url: "/RegistroDeDocumento/QuitarArchivo",
        data: JSON.stringify({
            'nIdArchivo': nIdArchivo,
        }),
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (json) {
            if (json) {
                if (json.error) {
                    alert(json.error);
                }
            }
            else {
                alert('Ha ocurrido un error en el servidor ');
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
    });

});
