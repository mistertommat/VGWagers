// ================================================================
//  Description: Avatar Upload supporting script
//  License:     MIT - check License.txt file for details
//  Author:      Codative Corp. (http://www.codative.com/)
// ================================================================
var jcrop_api,
    boundx,
    boundy,
    xsize,
    ysize;

// ToDo - change the size limit of the file. You may need to change web.config if larger files are necessary.
var maxSizeAllowed = 2;     // Upload limit in MB
var maxSizeInBytes = maxSizeAllowed * 1024 * 1024;
var keepUploadBox = false;  // ToDo - Remove if you want to keep the upload box
var keepCropBox = false;    // ToDo - Remove if you want to keep the crop box

$(function () {
    if (typeof $('#avatar-upload-form') !== undefined) {
        var aspectRatio = $('#avatar-upload-form').attr("aspectRatio");
        var defaultFullSelection = $('#avatar-upload-form').attr("defaultFullSelection");        

        initAvatarUpload(aspectRatio, defaultFullSelection);
        $('#avatar-max-size').html(maxSizeAllowed);

        $('#avatar-upload-form input:file').on("change", function (e) {
            var files = e.currentTarget.files;
            for (var x in files) {
                if (files[x].name != "item" && typeof files[x].name != "undefined") {
                    if (files[x].size <= maxSizeInBytes) {
                        // Submit the selected file
                        $('#avatar-upload-form .upload-file-notice').removeClass('bg-danger');
                        $('#preview-pane').removeClass('hidden');
                        $('#crop-avatar-target').removeClass('hidden');
                        $('#crop-avatar-target').css('visibility', 'visible');
                        $('#crop-avatar-target').show();
                        $('#current-Image').addClass('hidden');
                        $('.jcrop-holder').removeClass('hidden');
                        $('#avatar-upload-box').addClass('hidden');
                        $('.upload-progress').removeClass('hidden');
                        $('#avatar-upload-form').addClass('hidden');
                        $('#saveImageButton').removeClass('hidden');

                        var resizeOnImageSelect = $('#avatar-upload-form').attr("resizeOnImageSelect");

                        if (resizeOnImageSelect == "1") {
                            $('#saveGameDetails').addClass('hidden');
                            mainDiv = $('#avatar-upload-box').parent();
                            var iMainDivLeft = mainDiv.left;
                            var iMainDivWidth = mainDiv.width();
                            var iMainDivHeight = mainDiv.height();
                            var adjacentDivWidth = $('#divGameDetails').width();
                            $('#divGameDetails').width(adjacentDivWidth - 100);

                            mainDiv.animate({
                                width: iMainDivWidth + 190,
                                //height: iMainDivHeight + 30,
                                left: iMainDivLeft - 30
                            }, 1, function () {

                            }).addClass('focus');
                        }

                        $('#avatar-upload-form').submit();
                    } else {
                        // File too large
                        $('#avatar-upload-form .upload-file-notice').addClass('bg-danger');
                    }
                }
            }
        });

        $('#cancelImageUpload').click(function () {
            cancelCrop();
        });
    }
});

function cancelCrop()
{
    $('#preview-pane').addClass('hidden');
    $('#crop-avatar-target').addClass('hidden');
    $('#current-Image').removeClass('hidden');
    $('#avatar-upload-box').removeClass('hidden');
    $('.upload-progress').addClass('hidden');
    $('#avatar-upload-form').removeClass('hidden');
    $('#avatar-upload-form').get(0).reset();
    $('#crop-avatar-target').attr("src", "");
    $('#saveImageButton').addClass('hidden');

    var defaultPreviewPaneHTML = '<div id="preview-pane" class="hidden"> <div class="preview-container"> <img src="" class="jcrop-preview" alt="Preview" /> </div> </div>';

    jcropHolderDiv = $('#preview-pane').parent();
    jCropHolderParentDiv = $(jcropHolderDiv).parent();
    $(jcropHolderDiv).remove();
    $(jCropHolderParentDiv).append(defaultPreviewPaneHTML);

    var resizeOnImageSelect = $('#avatar-upload-form').attr("resizeOnImageSelect");

    if (resizeOnImageSelect == "1") {
        $('#saveGameDetails').removeClass('hidden');
        mainDiv = $('#avatar-upload-box').parent();
        var iMainDivLeft = mainDiv.left;
        var iMainDivWidth = mainDiv.width();
        var iMainDivHeight = mainDiv.height();
        var adjacentDivWidth = $('#divGameDetails').width();
        $('#divGameDetails').width(adjacentDivWidth + 100);

        mainDiv.animate({
            width: iMainDivWidth - 130,
            //height: iMainDivHeight + 30,
            left: iMainDivLeft + 30
        }, 300, function () {

        }).addClass('focus');
    }
    jcrop_api.destroy();
    var aspectRatio = $('#avatar-upload-form').attr("aspectRatio");
    var defaultFullSelection = $('#avatar-upload-form').attr("defaultFullSelection");
    initAvatarUpload(aspectRatio, defaultFullSelection);
}

function initAvatarUpload(aspectRatio, defaultFullSelection) {
    $('#avatar-upload-form').ajaxForm({
        beforeSend: function () {
            updateProgress(0);
            $('#avatar-upload-form').addClass('hidden');
        },
        uploadProgress: function (event, position, total, percentComplete) {
            updateProgress(percentComplete);
        },
        success: function (data) {
            updateProgress(100);
            if (data.success === false) {
                $('#status').html(data.errorMessage);
            } else {
                $('#preview-pane .preview-container img').attr('src', data.fileName);
                var img = $('#crop-avatar-target');
                img.attr('src', data.fileName);

                if (!keepUploadBox) {
                    $('#avatar-upload-box').addClass('hidden');
                }
                $('#avatar-crop-box').removeClass('hidden');
                initAvatarCrop(img, aspectRatio, defaultFullSelection);
            }
        },
        fail: function (e) {
            alert('Cannot upload image at this time');
        },
        complete: function (xhr) {
        }
    });
}

function updateProgress(percentComplete) {
    $('.upload-percent-bar').width(percentComplete + '%');
    $('.upload-percent-value').html(percentComplete + '%');
    if (percentComplete === 0) {
        $('#upload-status').empty();
        $('.upload-progress').removeClass('hidden');
    }
}

function initAvatarCrop(img, aspectRatio, defaultFullSelection) {
    img.Jcrop({
        onChange: updatePreviewPane,
        onSelect: updatePreviewPane,
        aspectRatio: xsize / ysize
    }, function () {
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];

        jcrop_api = this;
        jcrop_api.setOptions({ allowSelect: true });
        jcrop_api.setOptions({ allowMove: true });
        jcrop_api.setOptions({ allowResize: true });
        jcrop_api.setOptions({ aspectRatio: aspectRatio });

        // Maximise initial selection around the centre of the image,
        // but leave enough space so that the boundaries are easily identified.
        
        var padding = (defaultFullSelection < 1 ? 10 : 0)
        var shortEdge = (boundx < boundy ? boundx : boundy) - padding;
        var longEdge = boundx < boundy ? boundy : boundx;
        var xCoord = (defaultFullSelection < 1 ? longEdge / 2 - shortEdge / 2 : 0);
        jcrop_api.animateTo([xCoord, padding, shortEdge, shortEdge]);

        var pcnt = $('#preview-pane .preview-container');
        xsize = pcnt.width();
        ysize = pcnt.height();
        $('#preview-pane').appendTo(jcrop_api.ui.holder);
        jcrop_api.focus();
    });
}

function updatePreviewPane(c) {
    if (parseInt(c.w) > 0) {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $('#preview-pane .preview-container img').css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
    }
}

function saveAvatar() {
    var img = $('#preview-pane .preview-container img');
    var uploadedImage = $('.jcrop-tracker');
    var redirectURL = $('#avatar-upload-form').attr("redirectURL");
    var parameterValue = $('#avatar-upload-form').attr("parameterValue");

    $('#avatar-crop-box button').addClass('disabled');
    $('#saveGameDetails').removeClass('hidden');

    $.ajax({
        type: "POST",
        url: redirectURL,
        traditional: true,
        data: {
            w: uploadedImage.outerWidth(),
            h: uploadedImage.outerHeight(),
            l: img.css('marginLeft'),
            t: img.css('marginTop'),
            fileName: img.attr('src'),
            keyId: parameterValue
        }
    }).done(function (data) {
        if (data.success === true) {
            //$('#avatar-result img').attr('src', data.avatarFileLocation);
            var imgSrc = "data:image/png;base64," + data.updatedImage;
            $('#current-Image').removeClass('hidden');
            $('#current-Image').attr('src', imgSrc);

            //$('#avatar-result').removeClass('hidden');
            cancelCrop();
            $('#avatar-crop-box').removeClass('hidden');
            $('#avatar-crop-box button').removeClass('disabled');
            //if (!keepCropBox) {
            //    $('#avatar-crop-box').addClass('hidden');
            //}
        } else {
            alert(data.errorMessage)
        }
    }).fail(function (e) {
        alert('Cannot upload image at this time');
    });
}