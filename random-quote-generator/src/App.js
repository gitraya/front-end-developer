import axios from "axios";
import { useEffect, useState } from "react";
import { useLoading } from "@agney/react-loading";
import RandomQuote from "./components/RandomQuote";
import QuotesAuthor from "./components/QuotesAuthor";

const App = () => {
  // Quotes state
  const [quoteData, setQuoteData] = useState(null);
  const [quotesByAuthor, setQuotesByAuthor] = useState(null);
  const [loadDone, setLoadDone] = useState(null);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    loaderProps: { valueText: "Fetching quote from Quote Garden" },
  });

  // Get random quote
  const getRandomQuote = () => {
    setLoadDone(false);
    axios
      .get("https://quote-garden.herokuapp.com/api/v3/quotes/random")
      .then((res) => {
        const randomQuote = res.data.data[0];
        setQuoteData(randomQuote);
        setLoadDone(true);
        setQuotesByAuthor(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get all quotes by author
  const getQuotesByAuthor = () => {
    setLoadDone(false);
    axios
      .get("https://quote-garden.herokuapp.com/api/v3/quotes", {
        params: { author: quoteData.quoteAuthor },
      })
      .then((res) => {
        const quotesAuthor = res.data.data;
        setQuotesByAuthor(quotesAuthor);
        setLoadDone(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Displaying quotes data to the component
  const Quotes = () => {
    if (!loadDone)
      return (
        <div className="loaders" {...containerProps}>
          {indicatorEl}
        </div>
      );
    if (quotesByAuthor)
      return (
        <div>
          <div className="quote-author-name">
            <h1>{quoteData.quoteAuthor}</h1>
          </div>
          <QuotesAuthor quotesByAuthor={quotesByAuthor} />
        </div>
      );
    if (quoteData)
      return (
        <RandomQuote
          quoteData={quoteData}
          getQuotesByAuthor={getQuotesByAuthor}
        />
      );
  };

  useEffect(() => {
    if (!quoteData) {
      getRandomQuote();
    }
  }, [quoteData]);

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="btn-call-random-quote"
          type="button"
          onClick={getRandomQuote}
        >
          {`random `}
          <i className="material-icons-round">autorenew</i>
        </button>
      </header>
      <main className="App-main">
        <Quotes />
      </main>
      <footer className="App-footer">
        <small className="copyright">
          {`created by `}
          <b>
            <a
              href="https://github.com/gitraya"
              target="_blank"
              rel="noreferrer"
            >
              gitraya
            </a>
          </b>
          {`- devChallenges.io`}
        </small>
      </footer>
    </div>
  );
};

export default App;
