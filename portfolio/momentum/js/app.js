(() => {
	'use strict';
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image();
			webP.onload = webP.onerror = function () {
				callback(2 == webP.height);
			};
			webP.src =
				'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
		}
		testWebP(function (support) {
			let className = true === support ? 'webp' : 'no-webp';
			document.documentElement.classList.add(className);
		});
	}
	let addWindowScrollEvent = false;
	setTimeout(() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event('windowScroll');
			window.addEventListener('scroll', function (e) {
				document.dispatchEvent(windowScroll);
			});
		}
	}, 0);
	let lang = 'be';

	const selectLangEl = document.querySelector('.footer__select-lang');

	selectLangEl.addEventListener('change', () => {
		lang = selectLangEl.value;
		showTime();
		getTimeOfDay();
		getWeather();
	});

	const time = document.querySelector('.date__time');
	const day = document.querySelector('.date__day');
	function showTime() {
		const currentTime = new Date().toLocaleTimeString(lang);
		time.textContent = `${currentTime}`;
		setTimeout(showTime, 1e3);
	}
	showTime();
	function showDay() {
		const date = new Date();
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		const currentDate = date.toLocaleDateString(lang, options);
		day.textContent = `${currentDate}`;
		setTimeout(showDay, 1e3);
	}
	showDay();
	function getTimeOfDay() {
		const date = new Date().getHours();
		const greetingText = document.querySelector('.greeting__text');
		if (date >= 6 && date < 12) {
			greetingText.textContent =
				'en' === lang ? `Good morning,` : `Добрага ранку,`;
			return 'morning';
		} else if (date >= 12 && date < 18) {
			greetingText.textContent =
				'en' === lang ? `Good afternoon,` : `Добрага дня,`;
			return 'afternoon';
		} else if (date >= 18 && date < 24) {
			greetingText.textContent =
				'en' === lang ? `Good evening,` : `Добрага вечара,`;
			return 'evening';
		} else if (date >= 0 && date < 6) {
			greetingText.textContent = 'en' === lang ? `Good night,` : `Добрай ночы,`;
			return 'night';
		}
	}
	document.querySelector('.greeting__name').placeholder =
		'en' === lang ? `Enter name` : 'Ваша імя';
	const timeOfDay = getTimeOfDay();
	function getRandomNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let randomNum = getRandomNum(1, 20);
	function setBg(day, num) {
		const body = document.querySelector('body');
		if (num < 10) num = `0${num}`;
		const img = new Image();
		img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${day}/${num}.jpg`;
		img.onload = () => {
			body.style.backgroundImage = `url(${img.src})`;
		};
	}
	setBg(timeOfDay, randomNum);
	const next = document.querySelector('.slide-next');
	const prev = document.querySelector('.slide-prev');
	next.addEventListener('click', getSlideNext);
	prev.addEventListener('click', getSlidePrev);
	function getSlideNext() {
		if (randomNum >= 20) randomNum = 0;
		randomNum += 1;
		setBg(timeOfDay, randomNum);
	}
	function getSlidePrev() {
		if (randomNum < 2) randomNum = 21;
		randomNum -= 1;
		setBg(timeOfDay, randomNum);
	}
	const greetingName = document.querySelector('.greeting__name');
	const weatherIcon = document.querySelector('.weather-icon');
	const temperature = document.querySelector('.weather__temperature');
	const wind = document.querySelector('.weather__wind');
	const humidity = document.querySelector('.weather__humidity');
	const weatherDescription = document.querySelector(
		'.weather__weather-description'
	);
	const weatherCity = document.querySelector('.weather__city');
	let city = gettingCityInput();
	function gettingCityInput() {
		if (localStorage.getItem('city')) return localStorage.getItem('city');
		else return 'Minsk';
	}
	weatherCity.placeholder = `${city}`;
	function invalidCityInput() {
		let ruAlert = 'Вы неправильно ввели название города';
		let enAlert =
			'You entered the city name incorrectly. Please input correct city.';
		alert(`${'en' === lang ? enAlert : ruAlert}`);
	}
	async function getWeather() {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=912fcdd8a7834b64be0a88faccdf65c8&units=metric`;
		const res = await fetch(url);
		if (404 === res.status) {
			invalidCityInput();
			city = 'Minsk';
			weatherCity.placeholder = `Minsk`;
			weatherCity.value = '';
			getWeather();
		}
		const data = await res.json();
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent =
			'en' === lang
				? `Temperature: ${Math.round(data.main.temp)}°C`
				: `Тэмпература: ${Math.round(data.main.temp)} °C`;
		wind.textContent =
			'en' === lang
				? `Wind speed: ${Math.round(data.wind.speed)} m/s`
				: `Хуткасць ветру: ${Math.round(data.wind.speed)} м/с`;
		humidity.textContent =
			'en' === lang
				? `Humidity: ${data.main.humidity} %`
				: `Вільготнасць: ${data.main.humidity}%`;
		let weatherDescr = data.weather[0].description;
		weatherDescription.textContent =
			'en' === lang
				? `Weather: ${weatherDescr[0].toUpperCase() + weatherDescr.slice(1)}`
				: `${weatherDescr[0].toUpperCase() + weatherDescr.slice(1)}`;
	}
	getWeather();
	weatherCity.addEventListener('change', () => {
		if ('' === weatherCity.value)
			weatherCity.placeholder = 'en' === lang ? `Your city` : 'Ваш горад';
		city = weatherCity.value;
		getWeather();
	});
	const quoteText = document.querySelector('.quote__text');
	const quoteAuthor = document.querySelector('.quote__author');
	const quoteRefresh = document.querySelector('.quote__button');
	async function getQuotes() {
		const res = await fetch('https://type.fit/api/quotes');
		const data = await res.json();
		let randomNum = getRandomNum(1, data.length);
		let quote = data[randomNum].text;
		let author = data[randomNum].author;
		quoteText.textContent = `${quote}`;
		quoteAuthor.textContent = `${author || ''}`;
	}
	getQuotes();
	quoteRefresh.addEventListener('click', getQuotes);
	const playListArray = [
		{
			title: 'Aqua Caelestis',
			src: 'audio/Aqua Caelestis.mp3',
			duration: '00:39',
		},
		{
			title: 'Ennio Morricone',
			src: 'audio/Ennio Morricone.mp3',
			duration: '01:37',
		},
		{
			title: 'River Flows In You',
			src: 'audio/River Flows In You.mp3',
			duration: '01:37',
		},
		{
			title: 'Summer Wind',
			src: 'audio/Summer Wind.mp3',
			duration: '01:50',
		},
	];
	const playerPrev = document.querySelector('.player-controls__play-prev');
	const playerPlay = document.querySelector('#play');
	const playerPause = document.querySelector('#pause');
	const playerNext = document.querySelector('.player-controls__play-next');
	const playList = document.querySelector('.player-controls__playlist');
	function createPlayList(array) {
		array.forEach(el => {
			const playListEl = document.createElement('li');
			playListEl.classList.add('player-controls__playlist-item');
			playListEl.textContent = `${el.title}`;
			playList.append(playListEl);
		});
	}
	createPlayList(playListArray);
	const playListItem = document.querySelectorAll(
		'.player-controls__playlist-item'
	);
	let isPlay = false;
	let currTrack = 0;
	const audio = new Audio();
	function playAudio() {
		audio.src = playListArray[currTrack].src;
		audio.currentTime = 0;
		audio.play();
		playListItem.forEach(el =>
			el.classList.remove('player-controls__playlist-item_active')
		);
		playListItem[currTrack].classList.add(
			'player-controls__playlist-item_active'
		);
	}
	function pauseAudio() {
		audio.pause();
	}
	function changeSvgAudio(isplay) {
		if (true === isplay) {
			playerPlay.style.display = 'none';
			playerPause.style.display = 'block';
			playerPause.classList.add('active');
		} else {
			playerPlay.style.display = 'block';
			playerPause.style.display = 'none';
		}
	}
	changeSvgAudio(isPlay);
	playerPlay.addEventListener('click', () => {
		isPlay = !isPlay;
		if (isPlay) playAudio();
		else pauseAudio();
		changeSvgAudio(isPlay);
	});
	playerPause.addEventListener('click', () => {
		isPlay = !isPlay;
		if (isPlay) playAudio();
		else pauseAudio();
		changeSvgAudio(isPlay);
	});
	playerPrev.addEventListener('click', () => {
		currTrack -= 1;
		if (currTrack <= 0) currTrack = playListArray.length - 1;
		playAudio();
		if (false === isPlay) {
			isPlay = !isPlay;
			changeSvgAudio(isPlay);
		}
	});
	playerNext.addEventListener('click', () => {
		currTrack += 1;
		if (currTrack > playListArray.length - 1) currTrack = 0;
		playAudio();
		if (false === isPlay) {
			isPlay = !isPlay;
			changeSvgAudio(isPlay);
		}
	});
	const progress = document.querySelector('.player__progress');
	const endTimeEl = document.querySelector('.player__end-time');
	const currTimeEl = document.querySelector('.player__start-time');
	audio.addEventListener('timeupdate', updateProgress);
	function updateProgress(e) {
		const { duration, currentTime } = e.srcElement;
		progress.value = currentTime;
		progress.max = duration;
		let endTime = duration;
		let second = endTime % 60;
		let minut = (endTime - second) / 60 || 0;
		endTimeEl.textContent = `${minut}:${second.toFixed(0)}`;
		let currentTimer = currentTime;
		let currSecond = currentTimer % 60;
		let currMin = (currentTimer - currSecond) / 60;
		currTimeEl.textContent = `${currMin}:${
			currSecond < 10 ? '0' + currSecond.toFixed(0) : currSecond.toFixed(0)
		}`;
	}
	function setLocalStorage() {
		localStorage.setItem('name', greetingName.value);
		localStorage.setItem('city', weatherCity.value);
	}
	window.addEventListener('beforeunload', setLocalStorage);
	function getLocalStorage() {
		if (localStorage.getItem('name') || localStorage.getItem('city')) {
			greetingName.value = localStorage.getItem('name');
			weatherCity.value = localStorage.getItem('city');
		}
	}
	window.addEventListener('load', getLocalStorage);
	const tasks = [
		{
			_id: '5d2ca9e2e03d40b326596aa7',
			completed: true,
			body: 'Drink cofee\r\n',
			title: 'Drink a cap cofee',
		},
	];
	(function (arrOfTasks) {
		const objOfTasks = arrOfTasks.reduce((acc, task) => {
			acc[task._id] = task;
			return acc;
		}, {});
		const listContainer = document.querySelector('.task-list__group');
		const form = document.forms['addTask'];
		const inputTitle = form.elements['title'];
		const inputBody = form.elements['body'];
		renderAllTasks(objOfTasks);
		form.addEventListener('submit', onFormSubmitHandler);
		listContainer.addEventListener('click', onDeletehandler);
		function renderAllTasks(taskList) {
			if (!taskList) {
				console.error('Передайте список задач');
				return;
			}
			const fragment = document.createDocumentFragment();
			Object.values(taskList).forEach(task => {
				const li = listItemTemplate(task);
				fragment.append(li);
			});
			listContainer.append(fragment);
		}
		function listItemTemplate({ _id, title, body } = {}) {
			const li = document.createElement('li');
			li.classList.add('list-group__item');
			li.setAttribute('data-task-id', _id);
			const h4 = document.createElement('h4');
			h4.textContent = title;
			h4.classList.add('list-group__title');
			const deleteBtn = document.createElement('button');
			deleteBtn.textContent = 'Delete Task';
			deleteBtn.classList.add('list-group__btn');
			const article = document.createElement('p');
			article.textContent = body;
			article.classList.add('list-group__text');
			li.append(h4);
			li.append(article);
			li.append(deleteBtn);
			return li;
		}
		function onFormSubmitHandler(e) {
			e.preventDefault();
			const titleValue = inputTitle.value;
			const bodyValue = inputBody.value;
			if (!titleValue || !bodyValue) {
				alert('No Title & Body');
				return;
			}
			const task = createNewTask(titleValue, bodyValue);
			const listItem = listItemTemplate(task);
			listContainer.insertAdjacentElement('afterbegin', listItem);
			form.reset();
		}
		function createNewTask(title, body) {
			const newTask = {
				title,
				body,
				completed: false,
				_id: `Task-${Math.random()}`,
			};
			objOfTasks[newTask._id] = newTask;
			return {
				...newTask,
			};
		}
		function deleteTask(id) {
			const { title } = objOfTasks[id];
			const isConfirm = confirm(`Sure delete ${title}?`);
			if (!isConfirm) return isConfirm;
			delete objOfTasks[id];
			return isConfirm;
		}
		function deleteTaskFromHtml(confirmed, el) {
			if (!confirmed) return;
			el.remove();
		}
		function onDeletehandler({ target }) {
			if (target.classList.contains('list-group__btn')) {
				const parent = target.closest('[data-task-id]');
				const id = parent.dataset.taskId;
				const confirmed = deleteTask(id);
				deleteTaskFromHtml(confirmed, parent);
			}
		}
	})(tasks);
	window['FLS'] = true;
	isWebp();
})();
