const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes =[];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Randomly pick API set
function generateQuote() {
    if (Math.random > 0.5) {
        getQuoteSet1();
    } else {
        getQuoteSet2();
    }
}

// Get Quote from API set 1 (using custom proxy server)
async function getQuoteSet1() {
    showLoadingSpinner();
    const proxyUrl = 'https://vast-ocean-77898.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'unknown'
        if (!data.quoteAuthor) {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;      
        removeLoadingSpinner();
    } catch (error) {
        generateQuote();
    }
}

// Get Quote from API set 2
async function getQuoteSet2() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        generateQuote();
    }
}

// Show new quote
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // If author is blank, add 'unknown'
    if (!quote.author) {
        authorText.innerText = "Unknown";
    } else {
        authorText.innerText = quote.author;
    }
    // Reduce font size for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote.text;      
    removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twiterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twiterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', generateQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
generateQuote();

