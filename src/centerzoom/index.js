var fs = require('fs'),
    $ = require('jquery'),
    async = require('async'),
    mustache = require('mustache');

function loadStyle() {
    fs.readFile(__dirname + '/style.css', function (err, data) {
        if (err) throw err;
        $('<style>').append(data.toString()).appendTo($('head'));
    });
}

function loadHtml(options, callback) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) throw err;
        callback(mustache.render(data.toString(), options));
    });
}

module.exports = function (map, options, callback) {

    loadStyle();

    loadHtml({}, function (html) {
        $('body').append($(html));

        function update() {
            $('#centerzoom').html([
                map.getCenter().lat.toFixed(5),
                map.getCenter().lng.toFixed(5),
                map.getZoom()
            ].join(' '));
        }

        map.on('ready, moveend', update);
        update();
    });


}