$(function () {

    $("#iconExists").hide();
    $("#iconOK").hide();
    $("#iconBusy").hide();
    

    $('input[type="date"]').attr('type', 'text').val("");

    $(".datepicker").datetimepicker({
        format: 'DD/MM/YYYY',

        showClose: true,

        showClear: true,

        toolbarPlacement: 'bottom'

   
    });

    $("#ExternalLoginConfirmation").validate({
        rules: {
            txtDOB: {
                agerangevalidation: true,
                date: true
            }
        }
    });

    $(".tip-right").tooltip({ placement: 'right' });

    $('#txtUsername').focus(function (e) {
        $("#iconExists").hide();
        $("#iconOK").hide();
    });

    $('#txtUsername').blur((function (e) {
        e.preventDefault();
        var extform = $("form");
       
        debugger;
        if (this.value == "") return false;
        $.ajax({
            url: "http://dev.vgwagers.com/Account/CheckUsernameExists",
            type: "POST",
            data: extform.serialize(),
            beforeSend: function () {
                $("#iconBusy").show();
                $("#divUsername").addClass("inner-addon right-addon");
                //$("#iconBusy").show();
            }
        }).done(function (returnedJSON) {
            $("#iconBusy").hide();
            $("#divUsername").removeClass("inner-addon right-addon");
            if (returnedJSON.exists) {
                $("#divUsername").addClass("inner-addon right-addon");
                $("#iconExists").show();
                $("#iconOK").hide();
               
            }
            else {
                $("#divUsername").addClass("inner-addon right-addon");
                $("#iconOK").show();
                $("#iconExists").hide();
                return false;
            }
        });
    }));
    //allow validation framework to parse DOM
    $.validator.unobtrusive.parse('#ExternalLoginConfirmation');
});