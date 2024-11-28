var images = [
    {
        title: "BATMAN BEGINS",
        src: "assets/BEGIN.jpg",
        link: "https://batman.fandom.com/wiki/Batman_Begins"
    },
    {
        title: "THE DARK KNIGHT",
        src: "assets/dark-knight.jpg",
        link: "https://batman.fandom.com/pt-br/wiki/Batman:_O_Cavaleiro_das_Trevast"
    },
    {
        title: "THE DARK KNIGHT RISES",
        src: "assets/dark-knight-rises.jpg",
        link: "https://batman.fandom.com/wiki/The_Dark_Knight_Rises"
    }
];

var currentIndex = 0;

function changeImage(direction) {
    var imageElement = document.getElementById('card-image');
    imageElement.classList.add('fade-out'); // Adiciona a classe de fade-out

    setTimeout(function() {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateCarousel();
        imageElement.classList.remove('fade-out'); // Remove a classe de fade-out após a mudança
    }, 500); // Tempo da animação deve ser igual ao tempo da transição no CSS
}

function updateCarousel() {
    var titleElement = document.getElementById('card-title');
    var imageElement = document.getElementById('card-image');
    var readMoreButton = document.getElementById('lerMais'); // Seleciona o botão com id "lerMais"
    
    // Atualiza o título da imagem
    titleElement.textContent = images[currentIndex].title;
    
    // Atualiza a imagem do carrossel
    imageElement.src = images[currentIndex].src;
    
    // Atualiza o link do botão "LER MAIS"
    readMoreButton.href = images[currentIndex].link;
}
