$(document).ready(function () {

    $('input[type="date"]').attr('type', 'text');

    $("#main-loading-div-background").css({ opacity: 0.8 });

     $("#main-loading-div-background").hide();

    var loginLink = $("a[id*='loginLink']");

    $("a[id*='loginLink']").on('click', function (e) {
        $("#main-loading-div-background").addClass("loadingContainer");
        $("#main-loading-div-background").show();

        $('#modalContent').load(this.href, function () {

            $("#main-loading-div-background").hide();

            $('#modal-container').modal('show');
            $('#loginform', this).submit(function (e) {
                e.preventDefault();
                if (!$(this).valid()) {
                    return false;
                }
                $.ajax({
                    url: this.action,
                    type: this.method,
                    data: $(this).serialize(),
                    async : true,
                    beforeSend: function () {
                        $("#modal-loading-div-background").width($("#modalContent").width());
                        $("#modal-loading-div-background").show();
                    }
                }).done(function (returnedJSON) {
                    $("#modal-loading-div-background").hide();
                    if (returnedJSON.success) {
                        $('#modal-container').modal('hide');
                        window.location.href = returnedJSON.returnUrl;
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
                }).fail(function (xhr, status, error) {
                    alert('failed');
                });
            });
        });

        $('#modal-dialog').removeClass("modal-register");
        $('#modal-dialog').addClass("modal-login");
        return false;
    });

    $('#registerLink').on('click', function (e) {

        $("#main-loading-div-background").addClass("loadingContainer");
        $("#main-loading-div-background").show();

        $('#modalContent').load(this.href, function () {

            $("#main-loading-div-background").hide();

            $('#modal-dialog').removeClass("modal-login");
            $('#modal-dialog').addClass("modal-register");
            $('#modal-container').modal('show');
        });
        return false;
    });

   

   
    $("#ModalLogin").on("hidden.bs.modal", function (e) {
        Sample.Web.ModalLogin.Views.LoginModal.resetLoginForm();
    });

    $("#ModalRegister").on("hidden.bs.modal", function (e) {
        Sample.Web.ModalRegister.Views.RegisterModal.resetRegisterForm();
    });

    
    $("#ModalLogin").on("shown.bs.modal", function (e) {
        $("#Email").focus();
    });

    $("#ModalRegister").on("shown.bs.modal", function (e) {
        $("#Email").focus();
    });

});

var Sample = Sample || {};
Sample.Web = Sample.Web || {};
Sample.Web.ModalLogin = Sample.Web.ModalLogin || {};
Sample.Web.ModalLogin.Views = Sample.Web.ModalLogin.Views || {};

Sample.Web.ModalRegister = Sample.Web.ModalRegister || {};
Sample.Web.ModalRegister.Views = Sample.Web.ModalRegister.Views || {};

var VGWager = VGWager || {};
VGWager.Web = VGWager.Web || {};
VGWager.Web.ExtLogin = VGWager.Web.ExtLogin || {};

VGWager.Web.ExtLogin.Login = VGWager.Web.ExtLogin.Login || {};

VGWager.Web.ExtLogin.Login.Views = VGWager.Web.ExtLogin.Login.Views || {};
VGWager.Web.ExtLogin.Google = VGWager.Web.ExtLogin.Google || {};
VGWager.Web.ExtLogin.Login.Views.Google = VGWager.Web.ExtLogin.Login.Views.Google || {};


Sample.Web.ModalLogin.Views.Common = {
    getAntiForgeryValue: function () {
        return $('input[name="__RequestVerificationToken"]').val();
    }
}

Sample.Web.ModalLogin.Views.LoginModal = {
    resetLoginForm: function () {
        $("#loginform").get(0).reset();
        $("#alertBox").css("display", "none");
    },

    loginFailure: function (message) {
        var alertBox = $("#alertBox");
        alertBox.html(message);
        alertBox.css("display", "block");
    },

    loginSuccess: function () {
        window.location.href = window.location.href;
    }
}

Sample.Web.ModalRegister.Views.RegisterModal = {
    resetRegisterForm: function () {
        $("#registerform").get(0).reset();
        $("#alertBox").css("display", "none");
    },

    registerFailure: function (message) {
        var alertBox = $("#alertRegBox");
        alertBox.html(message);
        alertBox.css("display", "block");
    },

    registerSuccess: function () {
        window.location.href = window.location.href;
    }
}

Sample.Web.ModalLogin.Identity = {
    LoginIntoStd: function (username, password, rememberme, antiForgeryToken, successCallback, failureCallback) {
       
        var form = $('#loginform');
        var data = { "__RequestVerificationToken": antiForgeryToken, "username": username, "password": password, "rememberme": rememberme };

        $.ajax({
            url: "/Account/LoginJson",
            type: "POST",
            //data: data
            data: form.serialize()
        })
        .done(function (loginSuccessful) {
            if (loginSuccessful) {
                successCallback();
            }
            else {
                failureCallback("Invalid login attempt.");
            }
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            failureCallback(errorThrown);
        });
    }
}

Sample.Web.ModalRegister.Identity = {
    RegisterIntoStd: function (email, password, confirmPassword, antiForgeryToken, successCallback, failureCallback) {
        var form = $('#registerform');
        var data = { "__RequestVerificationToken": antiForgeryToken, "email": email, "password": password, "confirmPassword": confirmPassword };

        $.ajax({
            url: "/Account/RegisterJson",
            type: "POST",
            //data: data
            data: form.serialize()
        })
        .done(function (loginSuccessful) {
           
            if (loginSuccessful.success == true) {
                successCallback();
            }
            else {
                failureCallback(loginSuccessful.msg);
            }
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            failureCallback(errorThrown);
        });
    }
}

VGWager.Web.ExtLogin.Login.Views.Google = {

    googleLoginFailure: function (message) {
        var alertBox = $("#alertRegBox");
        alertBox.html(message);
        alertBox.css("display", "block");
    },

    googleLoginSuccess: function (returnedJSON) {
        $.post(returnedJSON.Url, function (partial) {
            $('#divlogin').html(partial);
        });
        //window.location.href = window.location.href;
    }
}

VGWager.Web.ExtLogin.Google = {
    Login: function (provider, returnURL, antiForgeryToken, successCallback, failureCallback) {
        
        var form = $('#extLogin');
        var data = { "__RequestVerificationToken": antiForgeryToken, "provider": provider, "returnURL": returnURL };

        $.ajax({
            url: "/Account/ExternalLoginJson",
            type: "POST",
            //data: data
            data: data
        })
        .done(function (returnedJSON) {
           
            if (returnedJSON.success == true) {
                successCallback(returnedJSON);
            }
            else {
               
                failureCallback(returnedJSON.msg);
            }
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            failureCallback(errorThrown);
        });
    }
}
