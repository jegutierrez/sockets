
var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function(data){
	render(data);
})

function render(data){
	var html = data.map(function(elem, index){
		return `<div>
					author:<strong>${elem.author}<strong>
					<br>
					text:<em>${elem.text}</em>
				</div>`;
	}).join(`<br>`);

	document.getElementById('msg').innerHTML = html;
}

function addMessage(e){
	var payload = {
		author: document.getElementById('username').value,
		text: document.getElementById('text').value,
	}
	socket.emit('send-msg', payload);
	return false;
}