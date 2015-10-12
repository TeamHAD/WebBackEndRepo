var device_list = [];

$(function() {


  getDevicesFromAPI();

});



function getDevicesFromAPI() {
  var devicesContent = '';
  $.getJSON('http://localhost:3000/getDevices', function(data) {
    $.each(data, function() {
      devicesContent += '<li>' + this.description + ': ' + this.status + '</li>';
    });

    $('#devices_list').html(devicesContent);
  });
};
