$(function () {
    //var device_width = $('#main-carousel').width();
    var device_width = $(window).width();
    var container_width = $('#main-carousel').width();
    var panel_width = 0.29;
    var build_nav = true;

    if (device_width < 768) {
        panel_width = 1;
        build_nav = false;
        //device_width = device_width - 20;
    }
    if (device_width == 768) {
        panel_width = 0.5;
    }
    if (992 <= device_width > 768) {
        panel_width = 0.39;
    }

    $('#slider').movingBoxes({
        /* width and panelWidth options deprecated, but still work to keep the plugin backwards compatible
        width: 500,
        panelWidth: 0.5,
        */
        panelWidth: panel_width,
        width: container_width,
        startPanel: 1,      // start with this panel
        wrap: true,  // if true, the panel will infinitely loop
        buildNav: build_nav,   // if true, navigation links will be added
        navFormatter: function () { return "&#9679;"; } // function which returns the navigation text for each panel
    });

});