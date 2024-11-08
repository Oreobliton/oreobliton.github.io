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