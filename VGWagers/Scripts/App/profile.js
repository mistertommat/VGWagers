﻿
$.validator.unobtrusive.adapters.add("agerangevalidation", ["minage", "maxage"], function (options) {
    options.rules["agerangevalidation"] = options.params;
    options.messages["agerangevalidation"] = options.message;
});

$.validator.addMethod("agerangevalidation", function (value, elements, params) {
    debugger;
    var dateOfBirth = value;
    var arr_dateText = dateOfBirth.split("/");
    day = arr_dateText[0];
    month = arr_dateText[1];
    year = arr_dateText[2];

    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var maxDate = new Date();
    maxDate.setYear(maxDate.getYear() - 18);

    if (maxDate < mydate) {
        $.validator.messages.agerangevalidation = "Sorry, only persons over the age of 16 can be covered";
        return false;
    }
    return true;
});

$.validator.addMethod("uploadFile", function (val, element) {
    debugger;
    var size = element.files[0].size;
    console.log(size);

    if (size > 1048576)// checks the file more than 1 MB
    {
        console.log("returning false");
        return false;
    } else {
        console.log("returning true");
        return true;
    }

}, "File type error");



$(function () {

    $("#iconExists").hide();
    $("#iconOK").hide();
    $("#iconBusy").hide();

    $("#editProfile").validate({
        rules: {
            txtDOB: { agerangevalidation: true }
        }
    });

   // $('input[type="date"]').attr('type', 'text').val("");

    $(".datepicker").datetimepicker({
        format: 'DD/MM/YYYY',

        showClose: true,

        showClear: true,

        toolbarPlacement: 'bottom'


    });

    $(".tip-right").tooltip({ placement: 'right' });

    $('#txtUsername').focus(function (e) {
        $("#iconExists").hide();
        $("#iconOK").hide();
    });

    $('#txtUsername').blur((function (e) {
        e.preventDefault();
        var extform = $("form");

       
        if (this.value == "") return false;
        $.ajax({
            url: "http://dev.vgwagers.com/Account/CheckUsernameExistsProfile",
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
    

    $("#formPhoto", this).submit(function (e) {
        e.preventDefault();
        var alertBox = $("#alertBox");
        alertBox.css("display", "none");
       
        $("#main-loading-div-background").addClass("imgLoadingContainer");
        var offsetImg = $("#divProfilePhoto").offset();
        $("#main-loading-div-background").css("left", offsetImg.left);
        $("#main-loading-div-background").css("top", offsetImg.top);

        $("#main-loading-div-background").show();

        if (!$(this).valid()) {
            return false;
        }
        var data = new FormData();
        var files = $("#pickPhoto").get(0).files;
        if (files.length > 0) {
            data.append("profileImage", files[0]);
        }
        $.ajax({
            url: "http://dev.vgwagers.com/Manage/UploadProfilePhoto",
            //url: "@Url.Action('UploadProfilePhoto', 'Manage')",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                //code after success
                var photo = $("#pickPhoto").get(0).files;
                if (photo.length > 0) {
                    $("#profilePhoto").attr("src", URL.createObjectURL(photo[0]));
                }

                $("#main-loading-div-background").hide();
            },
            error: function (er) {
                alert(er);
            }
        }).done(function (returnedJSON) {
            if (returnedJSON.success) {

            }
            else {
            var alertBox = $("#alertBox");
            alertBox.html(returnedJSON.msg);
            alertBox.css("display", "block");
               
                return false;
            }
        });
    });

   

   

    //$('#editProfile', this).submit(function (e) {
    //    e.preventDefault();
    //    if (!$(this).valid()) {
    //        return false;
    //    }
    //});
    //allow validation framework to parse DOM
    $.validator.unobtrusive.parse('#formPhoto');

    //$.validator.unobtrusive.parse('#editProfile');

    


});