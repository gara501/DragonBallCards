import {characters} from './data.js';

const App = () => {
  let dataObj = document.querySelector('.figure-data');
  let figureImage = document.querySelector('.figure-image');
  let title = dataObj.querySelector('h4');
  let race = dataObj.querySelector('.race');
  let children = dataObj.querySelector('.children');
  let parents = dataObj.querySelector('.parents');
  let siblings = dataObj.querySelector('.siblings');
  let power = document.querySelector('.power');
  let powerName = document.querySelector('.power-name');
  let powerInfo = document.querySelector('.power-info');
  let characterImage = document.querySelector('.character-image');
  let charactersContainer = document.querySelector('.characters');
  let currentCharacter = null;
  const backgrounds = ['bg1', 'bg2', 'bg3'];

  power.addEventListener('change', (e) => {
    setPower(e.currentTarget.value-1);
  })

  function getCharacter(id) {
    let selectedItem = null;
    characters.forEach((item) => {
      if (id === parseInt(item.id)) {
        selectedItem = item;
      }
    });

    return selectedItem;
  }

  function createCharacters(data) {
    data.forEach((item, index) => {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = item.profile;
      img.id = item.id;
      img.alt = item.name;
      div.addEventListener('click', (e)=> {
        removeSelected();
        e.currentTarget.dataset.id = item.id;
        e.currentTarget.classList.add('selected');
        setCharacter(item);
      });
      
      if (index === 0) {
        div.classList.add('selected');
      }

      div.appendChild(img);
      charactersContainer.appendChild(div);
    });
  }

  function removeSelected() {
    const pics = document.querySelectorAll('.characters div');

    pics.forEach((item) => {
      item.classList.remove('selected');
    })
  }

  function setCharacter(item) {
    if (item) {
      title.textContent = item.name;
      race.textContent = item.race;
      children.textContent = item.children;
      siblings.textContent = item.siblings;
      parents.textContent = item.parents;
      power.max = item.powers.length;
      characterImage.src = item.profile;
      powerName.textContent = item.powers[0].name;
      powerInfo.textContent = item.powers[0].info;
      power.value = 1;
      backgrounds.forEach((item) => {
        figureImage.classList.remove(item);
      });
      figureImage.classList.add(item.background);
      currentCharacter = item;
    }
  }

  function setPower(powerValue) {
    characterImage.src = currentCharacter.powers[powerValue].image;
    characterImage.classList.add('blurred');
    powerName.textContent = currentCharacter.powers[powerValue].name;
    powerInfo.textContent = currentCharacter.powers[powerValue].info;

    setTimeout(()=> {
      characterImage.classList.remove('blurred');
    }, 400);
  }

  createCharacters(characters);
  setCharacter(characters[0]);
  
}

export default App();
