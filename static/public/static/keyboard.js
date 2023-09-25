const keyboard = document.querySelector('.keyboard');
const keyboardIcon = document.querySelector('.keyboard__icon');
const keyboardHeader = document.querySelector('.keyboard__header');
const keyboardEnglish = document.getElementById('keyboard__english');
const keyboardRussian = document.getElementById('keyboard__russian');
const changeLangButtons = document.querySelectorAll('.keyboard__lang');
const changeBackspaces = document.querySelectorAll('.keyboard__backspace');
const keyboardLetters = document.querySelectorAll('.keyboard__letter');
const keyboardShifts = document.querySelectorAll('.keyboard__shift');
const keyboardCapslocks = document.querySelectorAll('.keyboard__caps');
const keyboardCtrlAlts = document.querySelectorAll('.keyboard__ctrl-alt');
const keyboardEnters = document.querySelectorAll('.keyboard__enter');
const closeButton = document.querySelector('.keyboard__close');
const headerPage = document.querySelector('.header__page');
const searchForm = document.querySelector('.main__form');
const searchInput = document.querySelector('.header__input');

let keyboardShiftStatus = false;
let keyboardCtrlAltStatus = false;
let keyboardCapsStatus = false;
let keyboardMoveStatus = false;

const letters = {
	letter1: {
		lowCase: 'ё',
		capsLock: 'Ё',
		shift: 'Ё',
		ctrlAlt: '`',
	},
	letter2: {
		lowCase: '1',
		capsLock: '1',
		shift: '!',
		ctrlAlt: '~',
	},
	letter3: {
		lowCase: '2',
		capsLock: '2',
		shift: '"',
		ctrlAlt: '@',
	},
	letter4: {
		lowCase: '3',
		capsLock: '3',
		shift: '№',
		ctrlAlt: '#',
	},
	letter5: {
		lowCase: '4',
		capsLock: '4',
		shift: ';',
		ctrlAlt: '$',
	},
	letter6: {
		lowCase: '5',
		capsLock: '5',
		shift: '%',
		ctrlAlt: '%',
	},
	letter7: {
		lowCase: '6',
		capsLock: '6',
		shift: ':',
		ctrlAlt: '^',
	},
	letter8: {
		lowCase: '7',
		capsLock: '7',
		shift: '?',
		ctrlAlt: '&',
	},
	letter9: {
		lowCase: '8',
		capsLock: '8',
		shift: '*',
		ctrlAlt: '*',
	},
	letter10: {
		lowCase: '9',
		capsLock: '9',
		shift: '(',
		ctrlAlt: '(',
	},
	letter11: {
		lowCase: '0',
		capsLock: '0',
		shift: ')',
		ctrlAlt: ')',
	},
	letter12: {
		lowCase: '-',
		capsLock: '-',
		shift: '_',
		ctrlAlt: '_',
	},
	letter13: {
		lowCase: '=',
		capsLock: '=',
		shift: '+',
		ctrlAlt: '+',
	},
	letter14: {
		lowCase: 'й',
		capsLock: 'Й',
		shift: 'Й',
		ctrlAlt: '',
	},
	letter15: {
		lowCase: 'ц',
		capsLock: 'Ц',
		shift: 'Ц',
		ctrlAlt: '',
	},
	letter16: {
		lowCase: 'у',
		capsLock: 'У',
		shift: 'У',
		ctrlAlt: '',
	},
	letter17: {
		lowCase: 'к',
		capsLock: 'К',
		shift: 'К',
		ctrlAlt: '',
	},
	letter18: {
		lowCase: 'е',
		capsLock: 'Е',
		shift: 'Е',
		ctrlAlt: '',
	},
	letter19: {
		lowCase: 'н',
		capsLock: 'Н',
		shift: 'Н',
		ctrlAlt: '',
	},
	letter20: {
		lowCase: 'г',
		capsLock: 'Г',
		shift: 'Г',
		ctrlAlt: '',
	},
	letter21: {
		lowCase: 'ш',
		capsLock: 'Ш',
		shift: 'Ш',
		ctrlAlt: '',
	},
	letter22: {
		lowCase: 'щ',
		capsLock: 'Щ',
		shift: 'Щ',
		ctrlAlt: '[',
	},
	letter23: {
		lowCase: 'з',
		capsLock: 'З',
		shift: 'З',
		ctrlAlt: ']',
	},
	letter24: {
		lowCase: 'х',
		capsLock: 'Х',
		shift: 'Х',
		ctrlAlt: '{',
	},
	letter25: {
		lowCase: 'ъ',
		capsLock: 'Ъ',
		shift: 'Ъ',
		ctrlAlt: '}',
	},
	letter26: {
		lowCase: '\\',
		capsLock: '\\',
		shift: '/',
		ctrlAlt: '|',
	},
	letter27: {
		lowCase: 'ф',
		capsLock: 'Ф',
		shift: 'Ф',
		ctrlAlt: '',
	},
	letter28: {
		lowCase: 'ы',
		capsLock: 'Ы',
		shift: 'Ы',
		ctrlAlt: '',
	},
	letter29: {
		lowCase: 'в',
		capsLock: 'В',
		shift: 'В',
		ctrlAlt: '',
	},
	letter30: {
		lowCase: 'а',
		capsLock: 'А',
		shift: 'А',
		ctrlAlt: '',
	},
	letter31: {
		lowCase: 'п',
		capsLock: 'П',
		shift: 'П',
		ctrlAlt: '',
	},
	letter32: {
		lowCase: 'р',
		capsLock: 'Р',
		shift: 'Р',
		ctrlAlt: '',
	},
	letter33: {
		lowCase: 'о',
		capsLock: 'О',
		shift: 'О',
		ctrlAlt: '',
	},
	letter34: {
		lowCase: 'л',
		capsLock: 'Л',
		shift: 'Л',
		ctrlAlt: '',
	},
	letter35: {
		lowCase: 'д',
		capsLock: 'Д',
		shift: 'Д',
		ctrlAlt: '',
	},
	letter36: {
		lowCase: 'ж',
		capsLock: 'Ж',
		shift: 'Ж',
		ctrlAlt: ':',
	},
	letter37: {
		lowCase: 'э',
		capsLock: 'Э',
		shift: 'Э',
		ctrlAlt: '"',
	},
	letter38: {
		lowCase: 'я',
		capsLock: 'Я',
		shift: 'Я',
		ctrlAlt: '',
	},
	letter39: {
		lowCase: 'ч',
		capsLock: 'Ч',
		shift: 'Ч',
		ctrlAlt: '',
	},
	letter40: {
		lowCase: 'с',
		capsLock: 'С',
		shift: 'С',
		ctrlAlt: '',
	},
	letter41: {
		lowCase: 'м',
		capsLock: 'М',
		shift: 'М',
		ctrlAlt: '',
	},
	letter42: {
		lowCase: 'и',
		capsLock: 'И',
		shift: 'И',
		ctrlAlt: '',
	},
	letter43: {
		lowCase: 'т',
		capsLock: 'Т',
		shift: 'Т',
		ctrlAlt: '',
	},
	letter44: {
		lowCase: 'ь',
		capsLock: 'Ь',
		shift: 'Ь',
		ctrlAlt: '',
	},
	letter45: {
		lowCase: 'б',
		capsLock: 'Б',
		shift: 'Б',
		ctrlAlt: '<',
	},
	letter46: {
		lowCase: 'ю',
		capsLock: 'Ю',
		shift: 'Ю',
		ctrlAlt: '>',
	},
	letter47: {
		lowCase: '.',
		capsLock: '.',
		shift: ',',
		ctrlAlt: '?',
	},
	letter48: {
		lowCase: '1',
		capsLock: '1',
		shift: '!',
		ctrlAlt: '~',
	},
	letter49: {
		lowCase: '2',
		capsLock: '2',
		shift: '@',
		ctrlAlt: '"',
	},
	letter50: {
		lowCase: '3',
		capsLock: '3',
		shift: '#',
		ctrlAlt: '№',
	},
	letter51: {
		lowCase: '4',
		capsLock: '4',
		shift: '$',
		ctrlAlt: ';',
	},
	letter52: {
		lowCase: '5',
		capsLock: '5',
		shift: '%',
		ctrlAlt: '%',
	},
	letter53: {
		lowCase: '6',
		capsLock: '6',
		shift: '^',
		ctrlAlt: ':',
	},
	letter54: {
		lowCase: '7',
		capsLock: '7',
		shift: '&',
		ctrlAlt: '?',
	},
	letter55: {
		lowCase: '8',
		capsLock: '8',
		shift: '*',
		ctrlAlt: '*',
	},
	letter56: {
		lowCase: '9',
		capsLock: '9',
		shift: '(',
		ctrlAlt: '(',
	},
	letter57: {
		lowCase: '0',
		capsLock: '0',
		shift: ')',
		ctrlAlt: ')',
	},
	letter58: {
		lowCase: '-',
		capsLock: '-',
		shift: '_',
		ctrlAlt: '_',
	},
	letter59: {
		lowCase: '=',
		capsLock: '=',
		shift: '+',
		ctrlAlt: '+',
	},
	letter60: {
		lowCase: 'q',
		capsLock: 'Q',
		shift: 'Q',
		ctrlAlt: '`',
	},
	letter61: {
		lowCase: 'w',
		capsLock: 'W',
		shift: 'W',
		ctrlAlt: '',
	},
	letter62: {
		lowCase: 'e',
		capsLock: 'E',
		shift: 'E',
		ctrlAlt: '',
	},
	letter63: {
		lowCase: 'r',
		capsLock: 'R',
		shift: 'R',
		ctrlAlt: '',
	},
	letter64: {
		lowCase: 't',
		capsLock: 'T',
		shift: 'T',
		ctrlAlt: '',
	},
	letter65: {
		lowCase: 'y',
		capsLock: 'Y',
		shift: 'Y',
		ctrlAlt: '',
	},
	letter66: {
		lowCase: 'u',
		capsLock: 'U',
		shift: 'U',
		ctrlAlt: '[',
	},
	letter67: {
		lowCase: 'i',
		capsLock: 'I',
		shift: 'I',
		ctrlAlt: ']',
	},
	letter68: {
		lowCase: 'o',
		capsLock: 'O',
		shift: 'O',
		ctrlAlt: '{',
	},
	letter69: {
		lowCase: 'p',
		capsLock: 'P',
		shift: 'P',
		ctrlAlt: '}',
	},
	letter70: {
		lowCase: '\\',
		capsLock: '\\',
		shift: '/',
		ctrlAlt: '|',
	},
	letter71: {
		lowCase: 'a',
		capsLock: 'A',
		shift: 'A',
		ctrlAlt: '',
	},
	letter72: {
		lowCase: 's',
		capsLock: 'S',
		shift: 'S',
		ctrlAlt: '',
	},
	letter73: {
		lowCase: 'd',
		capsLock: 'D',
		shift: 'D',
		ctrlAlt: '',
	},
	letter74: {
		lowCase: 'f',
		capsLock: 'F',
		shift: 'F',
		ctrlAlt: '',
	},
	letter75: {
		lowCase: 'g',
		capsLock: 'G',
		shift: 'G',
		ctrlAlt: '',
	},
	letter76: {
		lowCase: 'h',
		capsLock: 'H',
		shift: 'H',
		ctrlAlt: '',
	},
	letter77: {
		lowCase: 'j',
		capsLock: 'J',
		shift: 'J',
		ctrlAlt: '',
	},
	letter78: {
		lowCase: 'k',
		capsLock: 'K',
		shift: 'K',
		ctrlAlt: ':',
	},
	letter79: {
		lowCase: 'l',
		capsLock: 'L',
		shift: 'L',
		ctrlAlt: '"',
	},
	letter80: {
		lowCase: 'z',
		capsLock: 'Z',
		shift: 'Z',
		ctrlAlt: '',
	},
	letter81: {
		lowCase: 'x',
		capsLock: 'X',
		shift: 'X',
		ctrlAlt: '',
	},
	letter82: {
		lowCase: 'c',
		capsLock: 'C',
		shift: 'C',
		ctrlAlt: '',
	},
	letter83: {
		lowCase: 'v',
		capsLock: 'V',
		shift: 'V',
		ctrlAlt: '',
	},
	letter84: {
		lowCase: 'b',
		capsLock: 'B',
		shift: 'B',
		ctrlAlt: '',
	},
	letter85: {
		lowCase: 'n',
		capsLock: 'N',
		shift: 'N',
		ctrlAlt: '<',
	},
	letter86: {
		lowCase: 'm',
		capsLock: 'M',
		shift: 'M',
		ctrlAlt: '>',
	},
	letter87: {
		lowCase: '.',
		capsLock: '.',
		shift: ',',
		ctrlAlt: '?',
	},
	letter88: {
		lowCase: ' ',
		capsLock: ' ',
		shift: ' ',
		ctrlAlt: ' ',
	},
	letter89: {
		lowCase: ' ',
		capsLock: ' ',
		shift: ' ',
		ctrlAlt: ' ',
	},
};

const changeLetterState = (keyboardKeyStatus, keyboardKeyState, keyboardButtons) => {
	if (keyboardLetters) {
		keyboardKeyStatus = keyboardKeyStatus === false;
		keyboardLetters.forEach(keyboardLetter => {
			if (keyboardKeyStatus === true) {
				keyboardLetter.textContent = letters[keyboardLetter.id][keyboardKeyState];
				if (keyboardButtons) {
					keyboardButtons.forEach(keyboardButton => {
						keyboardButton.classList.add('keyboard__button--active');
					});
				}
			} else {
				keyboardLetter.textContent = letters[keyboardLetter.id].lowCase;
				if (keyboardButtons) {
					keyboardButtons.forEach(keyboardButton => {
						keyboardButton.classList.remove('keyboard__button--active');
					});
				}
			}
		});
		return keyboardKeyStatus;
	}
};

const addEventToInput = () => {
	searchInput.focus();
	let inputEvent = new Event('input', {
		bubbles: true,
		cancelable: true,
	});
	searchInput.dispatchEvent(inputEvent);
};

if (keyboardEnters) {
	keyboardEnters.forEach(keyboardEnter => {
		keyboardEnter.addEventListener('click', () => {
			searchForm.submit();
		});
	});
}

if (closeButton) {
	closeButton.addEventListener('click', () => {
		if (headerPage) {
			headerPage.classList.remove('header-fixed');
		}
		keyboard.classList.add('visually-hidden');
		keyboardIcon.classList.remove('keyboard__icon--active');
		addEventToInput();
	});
}

if (keyboardIcon) {
	keyboardIcon.addEventListener('click', () => {
		if (headerPage) {
			headerPage.classList.toggle('header-fixed');
		}
		keyboard.classList.toggle('visually-hidden');
		keyboardIcon.classList.toggle('keyboard__icon--active');
		addEventToInput();
	});
}

if (changeLangButtons) {
	changeLangButtons.forEach(changeLangButton => {
		changeLangButton.addEventListener('click', () => {
			keyboardEnglish.classList.toggle('keyboard__hidden');
			keyboardRussian.classList.toggle('keyboard__hidden');
			addEventToInput();
		});
	});
}

if (keyboardCapslocks) {
	keyboardCapslocks.forEach(keyboardCapslock => {
		keyboardCapslock.addEventListener('click', () => {
			keyboardCapsStatus = changeLetterState(keyboardCapsStatus, 'capsLock', keyboardCapslocks);
			addEventToInput();
		});
	});
}

if (keyboardShifts) {
	keyboardShifts.forEach(keyboardShift => {
		keyboardShift.addEventListener('click', () => {
			keyboardShiftStatus = changeLetterState(keyboardShiftStatus, 'shift', keyboardShifts);
			addEventToInput();
		});
	});
}

if (keyboardCtrlAlts) {
	keyboardCtrlAlts.forEach(keyboardCtrlAlt => {
		keyboardCtrlAlt.addEventListener('click', () => {
			keyboardCtrlAltStatus = changeLetterState(keyboardCtrlAltStatus, 'ctrlAlt', keyboardCtrlAlts);
			addEventToInput();
		});
	});
}

if (keyboardLetters) {
	keyboardLetters.forEach(keyboardLetter => {
		keyboardLetter.addEventListener('click', () => {
			let lastCursorPosition = searchInput.selectionStart;
			searchInput.value =
				searchInput.value.slice(0, searchInput.selectionStart) +
				keyboardLetter.textContent +
				searchInput.value.slice(searchInput.selectionStart, searchInput.value.length);
			if (keyboardShiftStatus === true) {
				keyboardShiftStatus = changeLetterState(keyboardShiftStatus, 'shift', keyboardShifts);
			}
			addEventToInput();
			searchInput.selectionEnd = lastCursorPosition + 1;
		});
	});
}

if (changeBackspaces) {
	changeBackspaces.forEach(changeBackspace => {
		changeBackspace.addEventListener('click', () => {
			let lastCursorPosition = searchInput.selectionStart;
			if (searchInput.value.length > 0 && searchInput.selectionStart !== 0) {
				searchInput.value =
					searchInput.value.slice(0, searchInput.selectionStart - 1) +
					searchInput.value.slice(searchInput.selectionStart, searchInput.value.length);
				addEventToInput();
				searchInput.selectionEnd = lastCursorPosition - 1;
			} else {
				addEventToInput();
				searchInput.selectionEnd = lastCursorPosition;
			}
		});
	});
}

if (keyboardHeader) {
	let mouseInBlockX = 0;
	let mouseInBlockY = 0;
	document.addEventListener('mousedown', e => {
		if (!keyboardMoveStatus) {
			keyboardMoveStatus = true;
			mouseInBlockX = e.clientX - keyboard.offsetLeft;
			mouseInBlockY = e.clientY - keyboard.offsetTop;
		}
	});
	document.addEventListener('mouseup', () => {
		if (keyboardMoveStatus) {
			keyboardMoveStatus = false;
		}
	});
	document.addEventListener('mousemove', e => {
		if (
			keyboardMoveStatus &&
			mouseInBlockX > keyboardHeader.offsetLeft &&
			mouseInBlockY > keyboardHeader.offsetTop &&
			mouseInBlockX < keyboardHeader.offsetLeft + keyboardHeader.offsetWidth &&
			mouseInBlockY < keyboardHeader.offsetTop + keyboardHeader.offsetHeight
		) {
			let keyboardLeft = e.clientX - mouseInBlockX;
			let keyboardTop = e.clientY - mouseInBlockY;
			keyboard.style.left = String(keyboardLeft) + 'px';
			keyboard.style.top = String(keyboardTop) + 'px';
		}
	});
}
