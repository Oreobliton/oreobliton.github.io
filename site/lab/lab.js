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

// TODO Shitty code, need to be changed, I've used the wrong approach.
// Need to put things in proper functions / lambdas
// Need to stop chasing the wrong way
// It's still a good project to learn things! 
const canvas = document.getElementById("first-canvas")
const ctx = document.getElementById("first-canvas").getContext("2d");
const balgGuyimg = new Image();
balgGuyimg.src = '../images/goofy-bald.webp'; // Chemin de l'image

var baldGuyX = 0;
var baldGuyY = 0;
balgGuyimg.onload = () => {
    ctx.drawImage(balgGuyimg, baldGuyX, baldGuyY);
};

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect(); // Position du canvas dans la page
    const x = Math.floor(e.clientX - rect.left); // Coordonnée x de la souris dans le canvas
    const y = Math.floor(e.clientY - rect.top);  // Coordonnée y de la souris dans le canvas
    console.log(`valeur de x: ${x}`);
    console.log(`valeur de y: ${y}`);

    const t = 0.001; // le step en gros la vitesse à la quel on glisse sur le vecteur
    var values = calculateNewCoordinates(baldGuyX, baldGuyY, x, y, t);
    var newX = values[0];
    var newY = values[1];
    console.log(values);
    console.log(`newX: ${newX}`);
    console.log(`newY: ${newY}`);

    animerBaldGuy(newX, newY);
});

function calculateNewCoordinates(x1, y1, x2, y2, t){
    console.log(`x1: ${x1}`);
    console.log(`y1: ${y1}`);
    console.log(`x2: ${x2}`);
    console.log(`y2: ${y2}`);
    const newX = Math.floor(x1) + Math.floor(t * (Math.floor(x2) - Math.floor(x1)));
    const newY = Math.floor(y1) + Math.floor(t * (Math.floor(y2) - Math.floor(y1)));
    const tab = [newX, newY];
    return tab;
}

function animerBaldGuy(newX, newY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoie le canvas

    baldGuyX = newX;
    baldGuyY = newY;
    console.log(`BaldGuyY : ${baldGuyX}`);
    console.log(`BaldGuyY : ${baldGuyY}`);

    ctx.beginPath();
    ctx.drawImage(balgGuyimg, baldGuyX, baldGuyY);
    ctx.closePath();

    requestAnimationFrame(animerBaldGuy); // Continue l'animation
}
