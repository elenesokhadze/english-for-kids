import { count, cards } from './data.js';
let state = false;
let play = false;
let page;
let gameStart = true;
let correct = 0;
let currentSound = 0;
let errors = 0;
let sound = [];

//Menu
document.querySelector('.navigation').addEventListener('click', () => {
  document.querySelector('.burger').classList.toggle('burger--clicked');
  document.querySelector('.menu').classList.toggle('menuActive');
});

//Switch Mode
document.querySelector('.switch-input').addEventListener('click', () => {
  defaultRemove();
  document.querySelector('.switch-label').classList.toggle('switch-label-play');
  document
    .querySelector('.switch-handle')
    .classList.toggle('switch-handle-active');
});

document.querySelector('.switch').addEventListener('mouseup', () => {
  if (play) {
    document.querySelectorAll('.rotate').forEach((key) => {
      key.classList.remove('rotate-none');
    });
    play = false;
  } else {
    document.querySelectorAll('.rotate').forEach((key) => {
      key.classList.add('rotate-none');
    });
    play = true;
  }
  document.querySelectorAll('.main-card').forEach((key) => {
    key.classList.toggle('pink');
  });
  document.querySelectorAll('.card').forEach((key) => {
    key.classList.toggle('card-cover');
  });
  document.querySelectorAll('.card-header').forEach((key) => {
    key.classList.toggle('display-none');
  });
  document.querySelector('.btn--start').classList.toggle('display-none');
});

//Rotate Cards
document.querySelectorAll('.rotate').forEach((key) => {
  key.addEventListener('click', () => {
    key.parentElement.classList.toggle('flip-card');
    state = true;
  });
});

document.querySelectorAll('.card').forEach((key) => {
  key.addEventListener('mouseleave', () => {
    if (state) {
      key.classList.toggle('flip-card');
      state = false;
    }
  });
});

//Navigation
document.querySelectorAll('.menu__item').forEach((key) => {
  key.addEventListener('click', (e) => {
    page = e.currentTarget.innerText;
    let i = 0;
    let j;
    if (
      !e.currentTarget.classList.contains('active') &&
      e.currentTarget.innerHTML !==
        document.querySelectorAll('.menu__item')[0].text
    ) {
      document
        .querySelector('.secondary-container')
        .classList.remove('display-none');
      document.querySelector('.main-container').classList.add('display-none');
      document.querySelectorAll('.card--front').forEach((key) => {
        j = count[i];
        key.style.backgroundImage = cards[page][j].image;
        i++;
      });
      i = 0;
      document.querySelectorAll('.card--back').forEach((key) => {
        j = count[i];
        key.style.backgroundImage = cards[page][j].image;
        i++;
      });
      i = 0;
      document.querySelectorAll('.card-header--front').forEach((key) => {
        j = count[i];
        key.innerHTML = cards[page][j].word;
        i++;
      });
      i = 0;
      document.querySelectorAll('.card-header-back').forEach((key) => {
        j = count[i];
        key.innerHTML = cards[page][j].translation;
        i++;
      });
      i = 0;
    } else {
      if (
        e.currentTarget.innerHTML ===
        document.querySelectorAll('.menu__item')[0].text
      ) {
        document
          .querySelector('.secondary-container')
          .classList.add('display-none');
        document
          .querySelector('.main-container')
          .classList.remove('display-none');
      }
    }
    defaultRemove();
    document.querySelector('.active').classList.remove('active');
    e.currentTarget.classList.toggle('active');
  });
});

//Sound
document.querySelectorAll('.card--front').forEach((key) => {
  let currentTarget;
  key.addEventListener('click', (e) => {
    if (play === false) {
      currentTarget = cards[page][e.currentTarget.getAttribute('num')].audioSRC;
      document.querySelector('.sound').src = currentTarget;
      console.log(currentTarget);
    }
  });
});

//Navigate to Main
document.querySelectorAll('.main-card').forEach((key) => {
  key.addEventListener('click', (e) => {
    page = e.currentTarget.innerText;
    console.log(page);
    let i = 0;
    let j;
    document
      .querySelector('.secondary-container')
      .classList.remove('display-none');
    document.querySelector('.main-container').classList.add('display-none');
    document.querySelectorAll('.card--front').forEach((key) => {
      j = count[i];
      key.style.backgroundImage = cards[page][j].image;
      i++;
    });
    i = 0;
    document.querySelectorAll('.card--back').forEach((key) => {
      j = count[i];
      key.style.backgroundImage = cards[page][j].image;
      i++;
    });
    i = 0;
    document.querySelectorAll('.card-header--front').forEach((key) => {
      j = count[i];
      key.innerText = cards[page][j].word;
      i++;
    });
    i = 0;
    document.querySelectorAll('.card-header-back').forEach((key) => {
      j = count[i];
      key.innerText = cards[page][j].translation;
      i++;
    });
    i = 0;
    document.querySelector('.active').classList.remove('active');
    document.querySelectorAll('.menu__item').forEach((key) => {
      if (page === key.innerText) {
        key.classList.toggle('active');
      }
    });
  });
});

document.querySelector('.btn--start').addEventListener('click', () => {
  if (gameStart) {
    for (let i = 0; i < 8; i++) {
      sound.push(cards[page][count[i]].audioSRC);
      cards.sound[cards[page][count[i]].audioSRC] = count[i];
    }
    shuffle(sound);
    document.querySelector('.btn--start').classList.add('btn--repeat');
    document.querySelectorAll('.card--front').forEach((key) => {
      key.classList.add('front-play');
    });
    gameStart = false;
    console.log(sound);
  }
  document.querySelector('.sound').src = sound[currentSound];
});

document.querySelectorAll('.card--front').forEach((key) => {
  let star;
  key.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('front-play')) {
      console.log(e.currentTarget.getAttribute('num'));
      console.log(cards.sound[sound[0]]);
      if (
        e.currentTarget.getAttribute('num') === cards.sound[sound[currentSound]]
      ) {
        star = document.createElement('div');
        e.currentTarget.classList.add('inactive');
        e.currentTarget.classList.remove('front-play');
        document.querySelector('.sound').src = sound[currentSound + 1];
        document.querySelector('.soundEffect').src = 'assets/audio/correct.mp3';
        star.classList.add('star-success');
        document.querySelector('.rating').appendChild(star);
        currentSound++;
        correct++;
        if (correct === 8) {
          goBackToMain();
        }
      } else {
        star = document.createElement('div');
        document.querySelector('.soundEffect').src = 'assets/audio/error.mp3';
        star.classList.add('star-error');
        document.querySelector('.rating').appendChild(star);
        errors++;
      }
    }
  });
});

function goBackToMain() {
  document.querySelectorAll('.card-container').forEach((key) => {
    key.classList.add('display-none');
  });
  document.querySelector('.btn-container').classList.add('display-none');
  document.querySelector('.rating').classList.add('text');
  document.querySelector('.header').classList.add('display-none');
  if (errors === 0) {
    document.body.classList.add('success');
    setTimeout(() => {
      document.body.classList.remove('success');
    }, 3000);
    document.querySelector('.rating').innerHTML = 'win!';
    document.querySelector('.soundEffect').src = 'assets/audio/success.mp3';
  } else {
    document.body.classList.add('failure');
    setTimeout(() => {
      document.body.classList.remove('failure');
    }, 3000);
    document.querySelector('.rating').innerHTML = `${errors} errors`;
    document.querySelector('.soundEffect').src = 'assets/audio/failure.mp3';
  }
  setTimeout(() => {
    document.querySelector('.rating').innerHTML = '';
  }, 3000);
  setTimeout(() => {
    defaultRemove();
    document.querySelectorAll('.card--front').forEach((key) => {
      key.classList.remove('front-play');
    });
    document.querySelectorAll('.card-container').forEach((key) => {
      key.classList.remove('display-none');
    });
    document.querySelector('.header').classList.remove('display-none');
    document.querySelector('.rating').classList.remove('text');
    document.querySelector('.btn-container').classList.remove('display-none');
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.menu__item').classList.add('active');
    document
      .querySelector('.secondary-container')
      .classList.add('display-none');
    document.querySelector('.main-container').classList.remove('display-none');

    document.querySelectorAll('.card--front').forEach((key) => {
      key.classList.toggle('front-play');
    });
  }, 3000);
}

function defaultRemove() {
  document.querySelectorAll('.card--front').forEach((key) => {
    key.classList.remove('front-play');
  });
  document.querySelectorAll('.inactive').forEach((key) => {
    key.classList.remove('inactive');
  });
  document.querySelector('.btn--start').classList.remove('repeat');
  document.querySelectorAll('.star-success').forEach((key) => {
    key.remove();
  });
  document.querySelectorAll('.star-error').forEach((key) => {
    key.remove();
  });
  sound = [];
  gameStart = true;
  correct = 0;
  currentSound = 0;
  errors = 0;
  cards.sound = {};
}

function shuffle(squareNum) {
  let currentIndex = squareNum.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = squareNum[currentIndex];
    squareNum[currentIndex] = squareNum[randomIndex];
    squareNum[randomIndex] = temporaryValue;
  }
  return squareNum;
}
