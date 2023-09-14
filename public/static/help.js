function headerFixed() {
	let header = document.querySelector('.header');
	window.addEventListener('scroll', function () {
		if (pageYOffset > header.clientHeight) {
			header.classList.add('header-fixed');
		} else {
			header.classList.remove('header-fixed');
		}
	});
}

function dropMenuStyleTop() {
	let menu = document.querySelector('.drop__menu');
	let header = document.querySelector('.header');
	let headerH = header.clientHeight;
	if (window.innerWidth > 768) {
		menu.style.top = `${headerH}px`;
	}
}

dropMenuStyleTop();

// headerFixed()
function headerOnMedia() {
	let header = document.querySelector('.header');
	if (window.innerWidth < 1025) {
		header.classList.add('header-fixed');
	} else {
		header.classList.remove('header-fixed');
		headerFixed();
	}
}

headerOnMedia();

function gerBurger() {
	let burger = document.querySelector('.burger');
	if (burger) {
		let dropMenu = document.querySelector('.drop__menu');
		burger.addEventListener('click', function () {
			dropMenu.classList.toggle('drop__menu-active');
			burger.classList.toggle('burger__active');
			if (window.innerWidth < 768) {
				document.documentElement.style.overflow = 'hidden';
			}
		});
		closeBurger();
	}
}

gerBurger();

function closeBurger() {
	let dropMenu = document.querySelector('.drop__menu');
	dropMenu.addEventListener('click', function (event) {
		let { target } = event;
		if (target.closest('.half__screen') == null) {
			if (window.innerWidth < 768) {
				document.documentElement.style.overflow = '';
			}
			dropMenu.classList.remove('drop__menu-active');
		}
	});
	window.addEventListener('click', event => {
		let { target } = event;
		if (!target.closest('.header')) {
			dropMenu.classList.remove('drop__menu-active');
		}
	});
}

function sliderInfo() {
	if (document.querySelector('.swiper-info')) {
		let swiper = new Swiper('.swiper-info', {
			loop: false,
			autoHeight: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}

sliderInfo();

function sliderHelp() {
	if (document.querySelector('.swiper__help')) {
		let swiper = new Swiper('.swiper__help', {
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					allowTouchMove: true,
					loop: false,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
					allowTouchMove: true,
					loop: false,
				},
			},
		});
	}
}

sliderHelp();

function SwiperNews2() {
	if (document.querySelector('.news__photo')) {
		let galleryThumbs = new Swiper('.gallery-thumbs', {
			spaceBetween: 10,
			slidesPerView: 4,
			loop: false,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			allowTouchMove: true,
		});
		let galleryTop = new Swiper('.news__photo', {
			loop: false,
			slidesPerView: 1,
			loopedSlides: 5, //looped slides should be the same
			allowTouchMove: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs,
			},
			pagination: {
				el: '.swiper-pagination-slider',
				clickable: true,
			},

			breakpoints: {
				768: {
					allowTouchMove: true,
				},
			},
		});
	}
}

SwiperNews2();

function sliderNews2() {
	if (document.querySelector('.news__photo2')) {
		let galleryThumbs = new Swiper('.gallery-thumbs2', {
			spaceBetween: 10,
			slidesPerView: 4,
			loop: false,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			allowTouchMove: true,
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		let galleryTop = new Swiper('.news__photo2', {
			loop: false,
			loopedSlides: 5, //looped slides should be the same
			allowTouchMove: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs,
			},
			pagination: {
				el: '.swiper-pagination-slider',
				clickable: true,
			},
			breakpoints: {
				768: {
					allowTouchMove: true,
				},
			},
		});
	}
}

sliderNews2();

function horizonSlider() {
	if (document.querySelector('.news__photo3')) {
		let galleryThumbs = new Swiper('.gallery-thumbs3', {
			spaceBetween: 10,
			slidesPerView: 4,
			loop: false,
			longSwipes: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			allowTouchMove: true,
			touchMoveStopPropagation: true,
		});
		let galleryTop = new Swiper('.news__photo3', {
			loop: false,
			longSwipes: true,
			allowTouchMove: true,
			loopedSlides: 4, //looped slides should be the same
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs,
			},
			pagination: {
				el: '.swiper-pagination-slider',
				clickable: true,
			},
			breakpoints: {
				768: {
					allowTouchMove: true,
				},
			},
		});
	}
}

horizonSlider();

function getAccordion() {
	let accordion = document.querySelector('.accordion__policy');
	let oldTarget, oldDrop;
	if (accordion) {
		accordion.addEventListener('click', function (event) {
			let { target } = event;
			if (event.target.classList.contains('accordion__title')) {
				if (oldTarget && oldTarget != target) {
					oldTarget.classList.remove('accordion__title-active');
					oldDrop.classList.remove('accordion__drop-active');
				}
				let item = target.closest('.accordion__item');
				if (target.classList.contains('accordion__title')) {
					target.classList.toggle('accordion__title-active');
					let drop = item.querySelector('.accordion__drop');
					drop.classList.toggle('accordion__drop-active');
					oldTarget = target;
					oldDrop = drop;
				}
			}
		});
	}
}

getAccordion();

function dropForm() {
	let input = document.querySelector('.input__them');
	if (input) {
		let trapValue = input.querySelector('.input__trap');
		let drop = input.querySelector('.input__drop');
		let hidden = input.querySelector('.form__input-hidden');
		input.addEventListener('click', event => {
			drop.classList.toggle('input__drop-active');
			if (event.target.closest('p') != null) {
				trapValue.innerHTML = event.target.innerText;
				input.classList.add('active');

				hidden.value = event.target.innerText;
			}
		});
	}
}

dropForm();

// <span class="tooltip">${main[i].dataset.lip}</span>
function paginationCheck() {
	let main = document.querySelectorAll('[data-lip]');
	// let mainChildren = document.querySelectorAll("[data-lip]").childElementCount;
	let pagination = document.querySelector('.pagination-page');
	if (pagination) {
		for (let i = 0; i < main.length; i++) {
			main[i].id = `b${i}`;
			pagination.insertAdjacentHTML('beforeend', `<a class="doted" href=#b${i}></a>`);
		}
		activeDoted(main);
	}
}

paginationCheck();

function activeDoted(children) {
	let dot = document.querySelectorAll('.doted');
	let heightW = window.innerHeight;
	for (let i = 0; i < children.length; i++) {
		let heightChild = children[i].getBoundingClientRect().height;
		document.addEventListener('scroll', function () {
			if (heightChild > heightW) {
				if (
					0 < children[i].getBoundingClientRect().top + heightChild / 2 &&
					children[i].getBoundingClientRect().top + heightChild / 2 < heightW
				) {
					if (document.querySelectorAll('.dot-active').length > 1) {
						document.querySelectorAll('.dot-active').forEach(element => {
							element.classList.remove('dot-active');
						});
					}
					dot[i].classList.add('dot-active');
				}
			} else {
				if (
					0 < children[i].getBoundingClientRect().top + heightChild / 2 &&
					children[i].getBoundingClientRect().top + heightChild < heightW
				) {
					if (document.querySelectorAll('.dot-active').length > 1) {
						document.querySelectorAll('.dot-active').forEach(element => {
							element.classList.remove('dot-active');
						});
					}
					dot[i].classList.add('dot-active');
				}
			}
		});
	}
}

function currentYPosition() {
	// Firefox, Chrome, Opera, Safari
	if (self.pageYOffset) return self.pageYOffset;
	// Internet Explorer 6 - standards mode
	if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
	// Internet Explorer 6, 7 and 8
	if (document.body.scrollTop) return document.body.scrollTop;
	return 0;
}

function elmYPosition(eID) {
	let elm = document.getElementById(eID);
	let y = elm.offsetTop;
	let node = elm;
	while (node.offsetParent && node.offsetParent != document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	}
	return y;
}

function smoothScroll(eID) {
	let startY = currentYPosition();
	let stopY = elmYPosition(eID) - 80;
	let distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100) {
		scrollTo(0, stopY);
		return;
	}
	let speed = Math.round(distance / 100);
	if (speed >= 20) speed = 20;
	let step = Math.round(distance / 25);
	let leapY = stopY > startY ? startY + step : startY - step;
	let timer = 0;
	if (stopY > startY) {
		for (let i = startY; i < stopY; i += step) {
			setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
			leapY += step;
			if (leapY > stopY) leapY = stopY;
			timer++;
		}
		return;
	}
	for (let i = startY; i > stopY; i -= step) {
		setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
		leapY -= step;
		if (leapY < stopY) leapY = stopY;
		timer++;
	}
}

function clickArrow() {
	let linkNav = document.querySelectorAll('[href^="#"]');
	linkNav.forEach(element => {
		element.addEventListener('click', function () {
			hash = this.href.substr(-2);
			smoothScroll(hash);
		});
	});
}
clickArrow();

//Очистка формы
function clearForm() {
	let form = document.querySelector('.form');
	let input = form.querySelectorAll('input');
	let textarea = form.querySelectorAll('textarea');
	let inputTheme = form.querySelector('.input__them');
	input.forEach(element => (element.value = ''));
	textarea.forEach(element => (element.value = ''));
	inputTheme.classList.remove('active');
	inputTheme.querySelector('.input__trap').innerText = 'Тема';
}

function getCongratulat() {
	let popup = document.querySelector('.hiddenBlock');
	popup.classList.toggle('hiddenBlock-active');
}

function clickClose() {
	let close = document.querySelector('.btn_clear');
	let input = document.querySelector('.header__input');
	let form = document.querySelector('.header__form');
	input.addEventListener('input', function () {
		if (input.value.length > 0) {
			close.addEventListener('click', function () {
				input.value = '';
				form.classList.remove('active');
				close.classList.remove('header__close-active');
			});
		}
	});
}

clickClose();

function sliderWithPAgination() {
	if (document.querySelector('.slider__news')) {
		var swiper = new Swiper('.slider__news', {
			loop: false,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}

sliderWithPAgination();

// Отправка формы страница about
function sendForm() {
	let form = document.querySelector('.form__about');
	if (form) {
		let body, email, subject;
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			body = form.querySelector("[name='body']").value;
			email = form.querySelector("[name='email']").value;
			subject = form.querySelector("[name='subject']").value;
			let information = {
				email: `${email}`,
				body: `${body}`,
				subject: `${subject}`,
			};
			clearForm();
			getCongratulat();
			fetchForm(form.action, information);
		});
	}
}

async function fetchForm(action, info) {
	let head = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: ' application/json',
		},
		body: JSON.stringify(info),
	};
	await fetch(action, head);
}
sendForm();

// Функция отправки запроса.
async function getSearchTip(input) {
	try {
		let response = await fetch(`https://api.involtago.org/v1/feed/suggest?query=${input.value}`);
		let json = await response.json();
		await getTip(json, input.value, input);
	} catch {
		return;
	}
}

//Отрисовка подсказок
function getTip(json, value, input) {
	let form = input.closest('form');
	let list = form.querySelector('.list-hints');
	let reg = new RegExp('^' + value, 'm');
	list.innerHTML = '';
	if (json?.data?.length != 0) {
		form.classList.add('active');
		json.data.forEach(element => {
			list.insertAdjacentHTML('afterbegin', `<li class="hint">${element.title}</li>`);
		});
	} else {
		form.classList.remove('active');
	}
}

function searchOnPage() {
	// let isTimed = false;
	let input = document.querySelectorAll('.js-search-input');
	if (input) {
		input.forEach(element =>
			element.addEventListener('input', function () {
				getSearchTip(element);
				if (element.value != 0) {
					getClearBtn(true, element);
				} else {
					getClearBtn(false, element);
				}
			})
		);
		input.forEach(element =>
			element.addEventListener('click', function () {
				if (element.value != 0) {
					getSearchTip(element);
				}
			})
		);
	}
}

function getClearBtn(bool, input) {
	let btn = input.parentElement.querySelector('.btn_clear');
	if (bool === true) {
		btn.classList.remove('d-none');
	} else {
		btn.classList.add('d-none');
	}
	btn.addEventListener('click', function (e) {
		input.value = '';
		input.focus();
		btn.classList.add('d-none');
	});
}

// Выбор подсказое
function keyboardHints() {
	let i = -1;
	let oldHint;
	let headerInput = document.querySelector('#search');
	window.addEventListener('keydown', function (event) {
		let hints = document.querySelectorAll('.hint');
		if (event.key == 'ArrowDown') {
			event.preventDefault();
			if (i == hints.length - 1) {
				i = -1;
			}
			++i;
			if (oldHint) {
				oldHint.classList.remove('active');
			}
			hints[i].classList.add('active');
			headerInput.value = hints[i].innerText;
			oldHint = hints[i];
		}
		if (event.key == 'ArrowUp') {
			event.preventDefault();
			--i;
			if (i < 0) {
				i = hints.length - 1;
			}
			if (oldHint) {
				oldHint.classList.remove('active');
			}
			hints[i].classList.add('active');
			headerInput.value = hints[i].innerText;
			oldHint = hints[i];
		}
		if (event.key == 'Enter') {
			if (hints[i]) {
				headerInput.value = hints[i].innerText;
			}
		}
	});
}

keyboardHints();

// LOCAL STORAGE
function getLocal() {
	let search = document.querySelector('.js-search-input');
	let key = localStorage.getItem('key');
	let newArr = key != null ? JSON.parse(localStorage.getItem('key')) : [];
	let newVal = search.value;

	if (newArr.length >= 7) {
		newArr.push(newVal);
		newArr.shift();
	} else {
		newArr.push(newVal);
	}
	localStorage.setItem('key', JSON.stringify(newArr));
}

function checkDataDrow(searchInput) {
	let form = searchInput.closest('form');
	let listUl = form.querySelector('.list-hints');
	let data = JSON.parse(localStorage.getItem('key'));

	if (searchInput.value.length === 0) {
		listUl.innerHTML = '';
		if (data) {
			data.forEach((element, index) => {
				listUl.insertAdjacentHTML('afterbegin', `<li class="hint">${element}</li>`);
			});
			listUl.classList.add('active');
			form.classList.add('active');
		} else {
			listUl.classList.remove('active');
			form.classList.remove('active');
		}
	}
	listUl.addEventListener('click', function (event) {
		let point = event.target.closest('li');
		searchInput.value = point.innerText;
		form.submit();
	});
}

// Отрисовка элемнтов истоии из localStorage
function historyDraw() {
	let searchInput = document.querySelector('.js-search-input');
	if (searchInput) {
		if (searchInput.value.length !== 0) {
			getClearBtn(true, searchInput);
			checkDataDrow(searchInput);
		}
	}
}

searchOnPage();
historyDraw();
