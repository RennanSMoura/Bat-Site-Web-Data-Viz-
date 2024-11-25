var images = [
    {
        title: "BATMAN BEGINS",
        src: "assets/begins.png"
    },
    {
        title: "THE DARK KNIGHT",
        src: "assets/dark-knight.jpg"
    },
    {
        title: "THE DARK KNIGHT RISES",
        src: "assets/dark-knight-rises.jpg"
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
    
    titleElement.textContent = images[currentIndex].title;
    imageElement.src = images[currentIndex].src;
}
