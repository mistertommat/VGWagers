
$.validator.unobtrusive.adapters.addBool("mandatory", "required");


$(function () {

    $('input[type="date"]').attr('type', 'text');
        
    $(".datepicker").datetimepicker({
        format: 'DD/MM/YYYY',

        showClose: true,

        showClear: true,

        toolbarPlacement: 'bottom'
    });

    $("#registerform").validate({
        rules: {
            txtDOB: {
                    agerangevalidation: true,
                    date: true
                    }
        }
    });

    $('#registerform', this).submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return false;
        }
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            beforeSend: function () {
                $("#modal-loading-div-background").width($("#modalContent").width());
                $("#modal-loading-div-background").show();
            }
        }).done(function (returnedJSON) {
            $("#modal-loading-div-background").hide();
            if (returnedJSON.success) {
                $('#modal-container').modal('hide');
                window.location.reload(true);
            }
            else {
                if (returnedJSON.msg != null) {
                    var alertBox = $("#alertBox");
                    alertBox.html(returnedJSON.msg);
                    alertBox.css("display", "block");
                }
                $.each(returnedJSON.errors, function (key, val) {
                    var container = $('span[data-valmsg-for="' + key + '"]');
                    container.removeClass("field-validation-valid").addClass("field-validation-error");
                    container.html(val[val.length - 1].ErrorMessage);
                });
                return false;
            }
        });
    });


    //allow validation framework to parse DOM
    $.validator.unobtrusive.parse('#registerform');
});