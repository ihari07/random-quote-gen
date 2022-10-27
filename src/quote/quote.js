import React from "react";
const QUOTES_URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            quotes: [],
            currentQuote: { quote: "", author: "", color: '#333' },
            color: "#333"
        };
        this.randomColors = [
            "rgb(231, 76, 60)",
            "rgb(155, 89, 182)",
            "rgb(251, 105, 100)",
            "rgb(231, 76, 60)",
            "rgb(189, 187, 153)",
            "rgb(52, 34, 36)"
        ];
        this.getRandomQuote = this.getRandomQuote.bind(this);
        this.fetchNewQuote = this.fetchNewQuote.bind(this);
    }

    componentDidMount() {
        const response = fetch(QUOTES_URL).then((res) => res.json())
        response.then((result) => {
            this.setState({ quotes: result.quotes }, () => {
                this.fetchNewQuote();
            });
        })
    }

    getRandomQuote() {
        let random = Math.round(Math.random() * this.state.quotes.length - 1);
        this.getRandomColor();
        return this.state.quotes[random];
    }

    getRandomColor() {
        const randomColor = this.randomColors[Math.floor(Math.random() * this.randomColors.length - 1)];
        this.setState({
            color: randomColor
        });
    }

    fetchNewQuote() {
        let randomQuote = this.getRandomQuote();
        this.setState({ currentQuote: randomQuote });
    }

    render() {
        let color, quoteTweetURL = "https://twitter.com/intent/tweet";
        if (this.state.currentQuote && this.state.currentQuote.quote) {
            const { quote, author } = this.state.currentQuote;
            quoteTweetURL =
                "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                quote + " - " +
                author;    
            color = this.state.color;
        }
        return (
            <div className="wrapper" style={{ backgroundColor: color }}>
                <div id="quote-box" style={{ color: color }}>
                    <div id="quote-text">
                        <i className="fa fa-quote-left"></i>
                        {this.state.currentQuote && this.state.currentQuote.quote}
                    </div>
                    <br />
                    <div id="quote-author">
                        - {this.state.currentQuote && this.state.currentQuote.author}
                    </div>
                    <br />
                    <div className="buttons-container">
                        <button id="tweet-button" style={{ backgroundColor: color }}>
                            <a className="button" id="tweet-quote" href={quoteTweetURL} title="Quote this Tweet!" target="_top" rel="noreferrer">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </button>
                        <button
                            id="new-quote"
                            onClick={this.fetchNewQuote}
                            style={{ backgroundColor: color }}
                        >
                            New Quote
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Quote;
