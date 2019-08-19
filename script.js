(function () {
	var a = document.querySelectorAll('ul > li');
	var ul = document.querySelector('main > ul');
	var firstCard, secondCard; //хранение значений карты
	var k = 0; //счетчик открытий
	var firstWay, secondWay // узел события клика
	var l = 0; // счетчик первого клика для таймера
	var gog = 0; //cчетчик зеленых сдвоенных карт
	var lose = false; var win = false; // победы поражения счетчик без цифр

	for (let i = 0; i < a.length; i++) {
		let r = Math.round(Math.random() * 10);
		ul.insertBefore(a[i], a[r]);
	};

	function handler (event) {
		if (event.target.nextElementSibling === null) {
			//обратный переворот
			event.target.classList.toggle('clickBack');
			event.target.previousElementSibling.classList.toggle('clickFront');
			k = 0;
		} else {
			//первый переворот
			event.target.classList.toggle('clickFront');
			event.target.nextElementSibling.classList.toggle('clickBack');

			ovr(event.target.nextElementSibling.textContent, event.target.nextElementSibling);
			l += 1 ;
			if (l === 1) {
				timer();
			}
		}
	}


	for (let i = 0; i < a.length; i++) {
		a[i].addEventListener('click', handler)
	};

	function ovr (f, way) {
		if (k === 3) { //удаление красного фона
			firstWay.classList.toggle('red');
			secondWay.classList.toggle('red');
			firstWay.parentNode.addEventListener('click', handler); //ставлю обработчик кликов чтоб переворачивались
			secondWay.parentNode.addEventListener('click', handler);

			// переворот двух красных карточек в норм состояние
			firstWay.classList.toggle('clickBack');
			secondWay.classList.toggle('clickBack');
			firstWay.previousElementSibling.classList.toggle('clickFront');
			secondWay.previousElementSibling.classList.toggle('clickFront');
			k = 0;
		};

		if (k === 0) {
			firstCard = f;
			firstWay = way;
			k += 1;
		} else {
			secondCard = f;
			secondWay = way;

			if (firstCard === secondCard) { //постановка зеленого фона и отключение события
				firstWay.classList.add('green');
				secondWay.classList.add('green');

				firstWay.parentNode.removeEventListener('click', handler);
				secondWay.parentNode.removeEventListener('click', handler);

				gog += 1;
				k = 0;
			} else {// установка красного фона
					firstWay.classList.toggle('red');
					secondWay.classList.toggle('red');
					firstWay.parentNode.removeEventListener('click', handler);// удаляю обработчик чтоб не нажимался
					secondWay.parentNode.removeEventListener('click', handler);

					k = 3;
			};
		};
	};
	//Функция таймера с всплывающими окнами
	function timer () {
		var timeWay = document.querySelector('.timer');
		var minute = 60;
		timeWay.textContent = '1:00'

		var timerId = setInterval(function () {
			minute--;

			if (minute >= 10) {
				timeWay.textContent = 0 + ':' + minute;
			} else {
				timeWay.textContent = 0 + ':' + 0 + minute;
			}

			if (minute === 0) {
				clearInterval(timerId);
				gog = 0;
				l = 0;
				k = 0;
				loser();
			}

			if (gog === 6) {
				clearInterval(timerId);
				gog = 0;
				l = 0;
				k = 0;
				winer();
			}

		}, 1000)
	};

	function loser () {
		document.querySelector('.lose').classList.toggle('display');
		lose = true;
	};

	function winer () {
		document.querySelector('.win').classList.toggle('display');
		win = true;
	};

	document.querySelector('.button1').addEventListener('click', playAgain);
	document.querySelector('.button2').addEventListener('click', playAgain);

	function playAgain () {
		for (let i = 0; i < a.length; i++) {
			a[i].addEventListener('click', handler);

			a[i].firstElementChild.classList.remove('green');
			a[i].lastElementChild.classList.remove('green');
			a[i].firstElementChild.classList.remove('red');
			a[i].lastElementChild.classList.remove('red');

			a[i].firstElementChild.classList.remove('clickFront');
			a[i].lastElementChild.classList.remove('clickBack');
		}; // вернули всем карточкам кликабельность и удалили все навески классов

		for (let i = 0; i < a.length; i++) {
			let r = Math.round(Math.random() * 10);
			ul.insertBefore(a[i], a[r]);
		};// перемешивание карточек
		//если проиграл тоудаление окна лузера
		if (lose) {
			document.querySelector('.lose').classList.toggle('display');
			lose = false;
		};
		//если победил тоудаление окна победителя
		if (win) {
			document.querySelector('.win').classList.toggle('display');
			win = false;
		};

		document.querySelector('.timer').textContent = '1:00'// вернули таймер на 1 мин

	}
})()

