// Класс для создания рейтинговых звёзд
class Rating {
    constructor(dom, cardId) {
        this.cardId = cardId;
        dom.innerHTML = '<svg width="110" height="20"></svg>';
        this.svg = dom.querySelector('svg');
        for (let i = 0; i < 5; i++)
            this.svg.innerHTML += `<polygon data-value="${i + 1}" 
             transform="translate(${i * 22},0)"  
             points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
        this.svg.onclick = e => this.change(e);
        this.render();
        const savedRating = localStorage.getItem(`rating_${this.cardId}`);
        if (savedRating) {
            this.svg.parentNode.dataset.value = savedRating;
            this.render();
        }
    }

    change(e) {
        let value = e.target.dataset.value;
        if (value) {
            this.svg.parentNode.dataset.value = value;
        }
        localStorage.setItem(`rating_${this.cardId}`, value);
        this.render();
    }

    render() {
        this.svg.querySelectorAll('polygon').forEach(star => {
            let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
            star.classList.toggle('active', on);
        });
    }
}

// Загрузка данных из файла hero.json
fetch('hero.json')
    .then(response => response.json())
    .then(data => createHeroCards(data));

// Функция для создания карточек супергероев
function createHeroCards(heroes) {
    const container = document.querySelector('.container');

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Используем уникальный идентификатор карточки для сохранения рейтинга в Local Storage
        const cardId = hero.id;

        const name = document.createElement('p');
        name.textContent = `Имя: ${hero.name}`;
        card.appendChild(name);

        const universe = document.createElement('p');
        universe.textContent = `Вселенная: ${hero.universe}`;
        card.appendChild(universe);

        const alterego = document.createElement('p');
        alterego.textContent = `Альтер-эго: ${hero.alterego}`;
        card.appendChild(alterego);

        const occupation = document.createElement('p');
        occupation.textContent = `Род занятий: ${hero.occupation}`;
        card.appendChild(occupation);

        const friends = document.createElement('p');
        friends.textContent = `Друзья: ${hero.friends}`;
        card.appendChild(friends);

        const superpowers = document.createElement('p');
        superpowers.textContent = `Суперсилы: ${hero.superpowers}`;
        card.appendChild(superpowers);

        const image = document.createElement('img');
        image.src = hero.url;
        card.appendChild(image);

        const info = document.createElement('p');
        info.classList.add('info');
        info.textContent = `Информация: ${hero.info}`;
        card.appendChild(info);

        const rating = document.createElement('span');
        rating.classList.add('rating');
        rating.setAttribute('data-id', cardId); 
        card.appendChild(rating);

        container.appendChild(card);

        // Инициализация рейтинговых звезд для текущей карточки
        new Rating(rating, cardId);
    });
}