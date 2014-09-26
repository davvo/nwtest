var fs = require('fs'),
    $ = require('jquery');

fs.watch('./', function() {
    if (location && location.reload) {
        location.reload();
    }
});

var map;

window.onload = function () {
    map = L.map('map', {
        center: [59.248326, 18.014578],
        zoom: 13,
        attributionControl: false
    });

    L.tileLayer('http://map.eniro.no/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.png', {
        tms: true
    }).addTo(map);

    require('./src/centerzoom/index')(map);

    $('#toggleSize').click(function (evt) {
        evt.preventDefault();
        $('body').toggleClass('big-right');
        map.invalidateSize();
    });

    $('#openFile').click(function (evt) {
        evt.preventDefault();
        $('input[type=file]').one('change', function () {
            var file = $(this).val();
            if (file) {
                fs.readFile(file, function (err, data) {
                    if (err) throw err;
                    $('textarea').val(data.toString());
                });
            }
        }).trigger('click');
    });

}