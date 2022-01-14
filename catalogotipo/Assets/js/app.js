$(document).ready(function () {
    //$('input').focusout(function () {
    //    // Uppercase-ize contents
    //    this.value = this.value.toLocaleUpperCase();
    //    this.value = this.value.toLocaleUpperCase().trim();
    //}); 
    $('[data-toggle="tooltip"]').tooltip();
    $('input[type=text]').focusout(function () {
        // Uppercase-ize contents
        this.value = this.value.toLocaleUpperCase();
        this.value = this.value.toLocaleUpperCase().trim();
    }); $('input[type=radio]');

    $('textarea').focusout(function () {
        // Uppercase-ize contents
        this.value = this.value.toLocaleUpperCase();
        this.value = this.value.toLocaleUpperCase().trim();
    });

    $('body').on('focus', ".datepicker", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "dd/mm/yyyy",
            autoclose: true
        });
    });

    $('body').on('focus', ".datepickerAMD", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });
    });

    $('body').on('focus', ".datepickerCON", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "dd/mm/yyyy",
            assumeNearbyYear: true,
            autoclose: true
        });
    });

    $('body').on('focus', ".datepickerHabil", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            //beforeShowDay: $.fn.datepicker.noWeekends 
            daysOfWeekDisabled: [0, 6]
        });
    });

    $('body').on('focus', ".datepickerCARR", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });
    });

    $('body').on('focus', ".datepickerYearCARR", function () {
        $.fn.datepicker.defaults.language = 'es';
        $(this).datepicker({
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            autoclose: true
        });
    });

    //$('input[class=datepicker]').datepicker({
    //    format: "dd/mm/yyyy"
    //});
    //$.ajaxSetup({
    //    beforeSend: function () {
    //        // show gif here, eg:
    //        $("#loading").show();
    //    },
    //    complete: function () {
    //        // hide gif here, eg:
    //        $("#loading").hide();
    //    }
    //});
    //$.ajaxSetup({
    //    beforeSend: function () {
    //        // show gif here, eg:
    //        $("#loading").show();
    //    },
    //    complete: function () {
    //        // hide gif here, eg:
    //        $("#loading").hide();
    //    },
    //    error: function () {
    //        // hide gif here, eg:
    //        $("#loading").hide();
    //    },
    //    stop: function () {
    //        // hide gif here, eg:
    //        $("#loading").hide();
    //    },
    //    success: function () {
    //        // hide gif here, eg:
    //        $("#loading").hide();
    //    },
    //});

});


$(document).ajaxStart(function () {
    //$("#loading").modal();
    $("#loading").show();
});

$(document).ajaxComplete(function (event, request, settings) {
    //$("#loading").modal("hide");
    $("#loading").hide();
});
$(document).ajaxSuccess(function (event, request, settings) {
    //$("#loading").modal("hide");
    $("#loading").hide();
});
$(document).ajaxError(function (event, request, settings) {
    //$("#loading").modal("hide");
    $("#loading").hide();
});
$(document).ajaxSend(function (event, request, settings) {
    //$("#loading").modal();
    $("#loading").show();
});

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        splitRight += "00000"
        splitRight = splitRight.substring(0, 5);
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}

function validaEmail(email) {
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailRegex.test(email)) {
        return true;
    }
    else {
        return false;
    }
}


//PRESENTA UNA CIFRA EN FORMATO DE MONEDA SEPARADO POR COMA CON PUNTO DECIMAL (1,222,333,444.55)
Number.prototype.formatoMoneda = function () {
    return this.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}