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
    // Sélectionne une citation aléatoire
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    const selectedQuote = quotes[randomIndex];

    // Sélectionne l'élément contenant la citation (assure-toi que tu as un élément .quote dans ton HTML)
    const quoteElement = document.querySelector('.quote');
    quoteElement.innerHTML = ''; // Vide le contenu précédent de l'élément


    selectedQuote.text.split('').forEach(char => {
        const span = document.createElement('span'); // Crée un nouvel élément <span>
        // Vérifie si le caractère est un espace
        if (char === ' ') {
            span.textContent = ' '; // Ajoute un espace explicite dans le span
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

    // Assure-toi que les citations sont stockées sous un format correct avec l'auteur
    // Par exemple, chaque objet dans `quotes` doit être un objet avec `text` et `author` comme propriétés
    document.querySelector('.author').textContent = `- ${selectedQuote.author}`;
}
