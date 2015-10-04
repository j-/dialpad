(function () {

var form = document.querySelector('.phone');
var input = document.querySelector('.phone-input');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	var value = input.value;
	window.location = 'tel:' + value;
});

})();
