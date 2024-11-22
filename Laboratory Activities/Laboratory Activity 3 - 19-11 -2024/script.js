const textInput = document.getElementById('textInput');
const wordcount = document.getElementById('wordcount');
const sentenceCount = document.getElementById('sentenceCount');

let currentWords = 0;
let currentSentences = 0;

const animateNumberChange = (element, newValue, label) => {
    const oldValue = parseInt(element.textContent.split(': ')[1]);

    if (oldValue !== newValue) {
        const oldNumber = document.createElement('span');
        const newNumber = document.createElement('span');

        oldNumber.textContent = oldValue;
        oldNumber.className = 'number old';

        newNumber.textContent = newValue;
        newNumber.className = 'number new';

        element.textContent = `${label}: `;
        element.appendChild(oldNumber);
        element.appendChild(newNumber);

        if (newValue > oldValue) {
            setTimeout(() => {
                oldNumber.classList.add('move-up');
                newNumber.classList.add('move-in');

                setTimeout(() => oldNumber.remove(), 300);
            }, 100);
        } else {
            setTimeout(() => {
                oldNumber.classList.add('move-down');
                newNumber.classList.add('move-in-from-top');

                setTimeout(() => {
                    newNumber.classList.add('final-position');
                    oldNumber.remove();
                }, 300);
            }, 100);
        }
    }
};

textInput.addEventListener('input', () => {
    const text = textInput.value.trim();
    const words = text === "" ? 0 : text.split(/\s+/).filter(Boolean).length;
    const sentences = text === "" ? 0 : text.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length;

    if (words !== currentWords) {
        animateNumberChange(wordcount, words, "Words");
        currentWords = words;
    }

    if (sentences !== currentSentences) {
        animateNumberChange(sentenceCount, sentences, "Sentences");
        currentSentences = sentences;
    }
});
