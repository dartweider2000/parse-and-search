const microphone = document.getElementById('microphone');
const inputSearch = document.querySelector('.audio-input-search');
const formSearch = document.getElementById('main__form');
let langPage = microphone.dataset.lang;

sendNotification = message => {
	const notification = document.createElement('div');
	notification.classList.add('voice__notification');
	const text = document.createElement('p');
	text.classList.add('voice__text');
	text.innerText = message;
	const buttonClose = document.createElement('button');
	buttonClose.type = 'button';
	buttonClose.innerHTML = '&times;';
	buttonClose.ariaLabel = langPage === 'ru' ? 'Закрыть' : 'Close';
	buttonClose.classList.add('voice__button');
	notification.append(buttonClose, text);
	formSearch.append(notification);
	buttonClose.addEventListener('click', () => {
		notification.remove();
	});
};

if (
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition
) {
	let SpeechRecognition = new (window.SpeechRecognition ||
		window.webkitSpeechRecognition ||
		window.mozSpeechRecognition ||
		window.msSpeechRecognition)();
	SpeechRecognition.lang = langPage === 'ru' ? 'ru-RU' : 'en-US';

	microphone.addEventListener('click', () => {
		let notification = document.querySelector('.voice__notification');
		try {
			SpeechRecognition.start();
		} catch (e) {
			console.log(e);
		}
		navigator.permissions.query({ name: 'microphone' }).then(function (permissionStatus) {
			if (permissionStatus.state === 'denied' && notification === null) {
				let messageNotification =
					langPage === 'ru'
						? 'Доступ к микрофону запрещен. Разрешите доступ в правом верхнем углу.'
						: 'Microphone access denied. Allow access in the upper right corner.';
				sendNotification(messageNotification);
			} else if (notification !== null) {
				notification.remove();
			}
		});
	});

	SpeechRecognition.onresult = e => {
		inputSearch.value = e.results[0][0].transcript;
		formSearch.submit();
	};

	SpeechRecognition.onstart = () => {
		microphone.classList.add('microphone__active');
	};

	SpeechRecognition.onend = () => {
		microphone.classList.remove('microphone__active');
	};

	SpeechRecognition.onspeechend = () => {
		microphone.classList.remove('microphone__active');
	};
} else {
	microphone.style.display = 'none';
}
