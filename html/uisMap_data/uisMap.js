/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function initMap() {}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

var assignShift = function (id) {
    var btnId = "btn_shift_" + id;
    var divId = "div_shift_" + id;
    var btnEvent = 'onclick="closeWindow()"';
    $("#" + btnId).hide();
    var div = $("#" + divId);
    var turn = Math.floor(Math.random() * Math.floor(200));
    var btn = $('<button class="btn btn-info" ' + btnEvent + '>Aceptar</button>');
    div.append("<h4>Turno " + turn + " asignado para las 2:00 pm</h4>");
    div.append(btn);
};

var closeWindow = function () {
    var botId = $.urlParam('botId');
    var chatId = $.urlParam('chatId');
    $.get(location.origin + "/flux/cbmsg", {
        botId: botId,
        chatId: chatId,
        cancel: 0
    }, function () {
        if (MessengerExtensions.isInExtension()) {
            MessengerExtensions.requestCloseBrowser();
        } else {
            window.close();
        }
    });
};

var fixedMarkers = function () {
    var markers = [
        {
            Regional: "Regional Eje Cafetero",
            Ciudad: "Armenia",
            Unidad: "Unidad Integral De Salud Armenia",
            Direccion: "Calle 17 Norte No. 11-70 Piso 3 Nogales Ala 1",
            tel: "(6) 340 0663 ",
            Horario: "Lunes a Viernes 7:00 am a 7:00 pm sábados: 7:00 am-1:00 pm ",
            lat: 4.554794245371928,
            lon: -75.65594859306731
        },
        {
            Regional: "Regional Caribe",
            Ciudad: "Barranquilla",
            Unidad: "Unidad Integral En Salud Norte Barranquilla",
            Direccion: "Calle 85 # 50 - 08",
            tel: "(5) 385 4249 ",
            Horario: "Lunes a Viernes: 7:00 am - 7:00 pm Sábados: 7:00 a.m - 1:00 pm",
            lat: 11.005035329195897,
            lon: -74.81976060944464
        },
        {
            Regional: "Regional Centrooriente",
            Ciudad: "Bogotá",
            Unidad: "Unidad Integral En Salud Bogotá",
            Direccion: "Calle 102 N° 14 A - 70 pisos 3 y 4 Ed. Torre 102",
            tel: "(1) 390 7617",
            Horario: "Lunes a Viernes 6:30 am - 8:00 pm y sábados 7:00 am - 2:00 pm",
            lat: 4.6910733656800065,
            lon: -74.03845173453522
        },
        {
            Regional: "Regional Nororiente",
            Ciudad: "Bucaramanga",
            Unidad: "Unidad Integral En Salud Bucaramanga",
            Direccion: "Transversal 93 # 34-99 Locales SS01 SS02 Centro Comercial Cacique",
            tel: "(7) 697 3536",
            Horario: "Lunes a Viernes 6:00 am a 7:00 pm sábados: 7:00 am - 1:00 pm ",
            lat: 7.099450973870645,
            lon: -73.10749592395933
        },
        {
            Regional: "Regional Suroccidente ",
            Ciudad: "Cali",
            Unidad: "Unidad Integral En Salud Norte Cali",
            Direccion: "Calle 36N #6A-65 Piso 11 Edificio World Trade Center Pacific Mall",
            tel: "(2) 489 6083 ",
            Horario: "Lunes a Viernes: 7:00 am - 7:00 pm ",
            lat: 3.47441,
            lon: -76.52784199999999
        },
        {
            Regional: "Regional Suroccidente ",
            Ciudad: "Cali",
            Unidad: "Unidad Integral En Salud Unicentro Cali",
            Direccion: "Carrera 100 N° 5-169 CC Unicentro Local 810-810A piso 3 Ed.Pasoancho",
            tel: "(2) 489 6083 ",
            Horario: "Lunes a Viernes: 6:30 am - 7:00 pm ",
            lat: 3.3743001,
            lon: -76.5394348
        },
        {
            Regional: "Regional Noroccidente",
            Ciudad: "Medellín",
            Unidad: "Unidad Integral En Salud Laureles",
            Direccion: "Carrera 66B 32 D 36 Mall Más en Uno",
            tel: "(4) 604 4191",
            Horario: "Lunes a Viernes 6:00 am a 8:00 pm sábados: 6:00 am - 2:00 pm ",
            lat: 6.237753021686951,
            lon: -75.58726700155796
        },
        {
            Regional: "Regional Noroccidente",
            Ciudad: "Medellín",
            Unidad: "Unidad Integral En Salud Poblado",
            Direccion: "Carrera 43A 18 Sur -135 PI 4 Local 460- C.C.Sao Paulo",
            tel: "(4) 604 4191",
            Horario: "Lunes a Viernes 6:00 am a 8:00 pm sábados: 6:00 am - 2:00 pm ",
            lat: 6.18484457829801,
            lon: -75.5792251433304
        },
        {
            Regional: "Regional Suroccidente ",
            Ciudad: "Palmira",
            Unidad: "Unidad Integral En Salud Palmira",
            Direccion: "Cra. 28 N° 44 - 73 Bloque B segundo piso",
            tel: "(2) 489 6083 ",
            Horario: "Lunes a Viernes: 6:00 am - 7:00 pm Sábados: 7:00 a.m - 1:00pm",
            lat: 3.540587457689886,
            lon: -76.29705899755322
        },
        {
            Regional: "Regional Eje Cafetero",
            Ciudad: "Pereira",
            Unidad: "Unidad Integral En Salud Pereira",
            Direccion: "Carrera 12 No. 2B17 . 2 piso",
            tel: "(6) 340 0663 ",
            Horario: "Lunes a Viernes 6:30 am a 7:00 pm sábados: 7:00 am - 1:00 pm ",
            lat: 4.8086287,
            lon: -75.6788026
        },
        {
            Regional: "Regional Suroccidente ",
            Ciudad: "Tuluá",
            Unidad: "Unidad Integral En Salud Tuluá",
            Direccion: "Carrera 29 N° 27-25 ",
            tel: "(2) 235 9546",
            Horario: "Lunes a Viernes: 7:00 am - 6:00 pm Sábados: 7:00 a.m - 1:00pm",
            lat: 4.083839064841951,
            lon: -76.19498759192646
        }
    ];
    return markers;
};

$(function () {
    var map;
    var url = window.location.origin + "/cruzverde/genMarkers";
    var nearUrl = window.location.origin + "/cruzverde/genNearMarkers";
    var getInfoWindowContent = function (item) {
        var content = $('<div/>');
        content.addClass("col-12");
        content.append($('<h4>' + item.Unidad + '</h4>'));
        content.append($('<hp>' + item.Direccion +
                '<br> ' + item.Ciudad + '-' + item.Regional +
                '<br>' + item.Horario +
                '</p>'));
        return content[0].outerHTML;
    };

    var getMarkers = function (url, lat, lon, map) {
        var ret = [];
        var infowindow = new google.maps.InfoWindow();
        var data = {
            markers: fixedMarkers()
        };
        for (var i = 0; i < data.markers.length; i++) {
            var position = {
                lat: data.markers[i].lat,
                lng: data.markers[i].lon
            };
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: data.markers[i].title,
                icon: data.markers[i].icon
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(getInfoWindowContent(data.markers[i]));
                    infowindow.open(map, marker);
                }
            })(marker, i));
            ret.push(marker);
        }
        return ret;
    };



    var initMap = function () {
        var lat = 5.354776;
        var lon = -74.489274;
        var center = {lat: lat, lng: lon};
        map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: 6
        });
        /*var marker = new google.maps.Marker({
         position: center,
         map: map,
         title: 'Usted se encuentra aquí'
         });*/

        if (Number($.urlParam("near")) === 1) {
            url = nearUrl;
        }
        getMarkers(url, lat, lon, map);

    };

    $("#back").on("click", function () {
        $("#pane1").hide();
        $("#map").show();
    });

    initMap();

});


