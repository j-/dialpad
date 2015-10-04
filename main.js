(function () {

/* global phoneUtils */

var settings = {
	region: 'AU',
};

var form = document.querySelector('.phone');
var input = document.querySelector('.phone-input');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	var value = input.value;
	var international = phoneUtils.formatInternational(value, settings.region);
	window.location = 'tel:' + international;
});

})();
