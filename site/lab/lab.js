const quotes = [
    {
        text: "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
        author: "Gandhi"
    },
    {
        text: "L'imagination est plus importante que le savoir.",
        author: "Albert Einstein"
    },
    {
        text: "Celui qui déplace une montagne commence par déplacer de petites pierres.",
        author: "Confucius"
    },
    {
        text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
        author: "Nelson Mandela"
    },
    {
        text: "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il vient de vos propres actions.",
        author: "Dalai Lama"
    }
];


function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    const quoteElement = document.querySelector('.quote');
    quoteElement.innerHTML = ''; // Vide le contenu précédent de l'élément


    selectedQuote.text.split('').forEach(char => {
        const span = document.createElement('span');
        if (char === ' ') {
            span.textContent = ' ';
        } else {
            span.classList.add('letter'); // Ajoute la classe "letter" pour les lettres
            span.textContent = char; // Définit le texte du span comme étant le caractère actuel
        }

        // Ajoute un écouteur d'événements pour redémarrer l'animation et appliquer de nouvelles valeurs à chaque itération
        span.addEventListener('animationiteration', () => {
            var newShakeX = Math.random() < 0.5 ? -1 : 1;
            var newShakeY = Math.random() < 0.5 ? -1 : 1;
            span.style.setProperty('--shake-x', `${newShakeX}px`);
            span.style.setProperty('--shake-y', `${newShakeY}px`);
        });

        quoteElement.appendChild(span); // Ajoute le <span> au conteneur principal (.quote)
    });

    document.querySelector('.author').textContent = `- ${selectedQuote.author}`;
}

function stopQuote() {
    document.querySelector('.quote').textContent = "";
    document.querySelector('.author').textContent = "";
}


// ------------------ Colored Text ------------------ //
function shineText() {
    const textElement = document.querySelector('.colored-text');
    var textParts = textElement.textContent.split(" ");
    console.log(textElement);
    textElement.innerHTML = ""

    textParts.forEach(word => {
        const span = document.createElement('span');
        span.classList.toggle('shine');
        span.textContent = word; // Définit le texte du span comme étant le caractère actuel

        // Ajoute un écouteur d'événements pour redémarrer l'animation et appliquer de nouvelles valeurs à chaque itération
        span.addEventListener('animationiteration', () => {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            span.style.setProperty('--r', r);
            span.style.setProperty('--g', g);
            span.style.setProperty('--b', b);
        });
        textElement.appendChild(span); // Ajoute le <span> au conteneur principal (.quote)
        textElement.appendChild(document.createTextNode(' '));        
    });
}


// ------------------ Rotate Picture ------------------ //
function rotatePicture() {
    document.querySelector(".turning-image").classList.toggle("animate")
}


// ------------------ Guess the numb ------------------ //
const superSecretNumber = Math.floor(Math.random() * 100);
document.getElementById("number-guess-button").addEventListener('click', guessMe);

function guessMe() {
    event.preventDefault();
    const numberInput = document.getElementById("guess-number-input").value;
    var guessDisplayText = "In this case I say nothing";
    if (numberInput == superSecretNumber){
        guessDisplayText = "Yahaha, you found me !!!"
    }
    if (numberInput > superSecretNumber){
        guessDisplayText = "Oh no, big boy being too big";
    }
    if (numberInput < superSecretNumber){
        guessDisplayText = "You smaller number";
    }
    document.getElementById("guessDisplay").innerText = guessDisplayText;
}


// ------------------ Bouncing Brick ------------------ //

// TODO Shitty AI code, need to be changed, I've used the wrong approach.
// Need to put things in proper functions / lambdas
// Need to stop chasing the wrong way
// It's still a good project to learn things! 
const canvas = document.getElementById("first-canvas")
const ctx = canvas.getContext("2d");


// Load the image
const img = new Image();
img.src = '../images/goofy-bald.webp'; // Replace with your image URL


let x = 0, y = 0; // Starting position
var targetX = Math.floor(Math.random() * (canvas.width - 200));
var targetY = Math.floor(Math.random() * (canvas.height - 200));

// Speed of movement
const speed = 5;

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, 200, 200); //TODO replace 200, 200 by image size constants

    // Calculate the distance to the target
    const dx = targetX - x;
    const dy = targetY - y;

    // Move the image towards the target
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > speed) {
        const angle = Math.atan2(dy, dx);
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;
        requestAnimationFrame(animate);
    } else {
        // Snap to the target when close enough
        x = targetX;
        y = targetY;
        ctx.drawImage(img, x, y, 200, 200); // Final render
    }
}

// Start the animation when the image loads
canvas.onclick = (event) => {
    const rect = canvas.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top; 
    animate();
};