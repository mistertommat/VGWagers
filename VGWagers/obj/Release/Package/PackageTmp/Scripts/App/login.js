$(function () {

    $('#newRegLink').on('click', function (e) {
        debugger;
        $('#modalContent').load(this.href, function () {
            $('#modal-dialog').removeClass("modal-login");
            $('#modal-dialog').addClass("modal-register");
            $('#modal-container').modal('show');
        });

        return false;
    });

    $('#forgotPasswordLink').on('click', function (e) {
        debugger;
        $('#modal-container').modal('hide');
        $('#modalContent').load(this.href, function () {
            $('#modal-container').modal('show');

        });
        return false;
    });
    //allow validation framework to parse DOM
    $.validator.unobtrusive.parse('#loginform');
});