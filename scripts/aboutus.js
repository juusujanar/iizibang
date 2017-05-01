/**
 * Created by CARDOKAMBLA on 5/1/2017.
 */
function initMap() {
    var jLiivi2 = {lat: 58.378181, lng: 26.714634};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: jLiivi2
    });
    var marker = new google.maps.Marker({
        position: jLiivi2,
        map: map
    });
}
