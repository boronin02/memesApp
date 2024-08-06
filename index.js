const selectorNode = document.querySelector('#categorySelect');

// Запрос мемов с API
fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then(res => {
        const memes = res.data.memes;
        // Заполнение выпадающего списка мемами
        selectorNode.innerHTML += memes.map(meme => `
            <option class="mem" data-id="${meme.id}" value="${meme.url}">${meme.name}</option>
        `).join('');
    });


//view
const textUpNode = document.querySelector('.text-up');
const textDownNode = document.querySelector('.text-down');
const imgNode = document.querySelector('.img');

const inputUpTextNode = document.querySelector('#inputUp');
const inputDownTextNode = document.querySelector('#inputDown');

inputUpTextNode.addEventListener('input', getDataInput);
inputDownTextNode.addEventListener('input', getDataInput);


// model
let upText = '';
let downText = '';
let selectedMemeUrl = '';

function getDataInput() {
    upText = inputUpTextNode.value;
    downText = inputDownTextNode.value;
    render();
}

// view
function render() {
    textUpNode.innerText = upText;
    textDownNode.innerText = downText;
    imgNode.src = selectedMemeUrl;
}

// model
selectorNode.addEventListener('change', function (event) {
    const select = event.target.selectedOptions[0];
    const id = select.getAttribute('data-id');
    selectedMemeUrl = select.value;
    render();
});
