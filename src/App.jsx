import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import './App.css'

// https://type.fit/api/quotes
function App() {

  const [color, setColor] = useState('#f44336')
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');

  useEffect (() => {
    fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => {
      setQuotes(data)
      let randomIndx = Math.floor(Math.random() * data.length)
      setRandomQuote(data[randomIndx])
    })
  }, [])

  const getRandomQuote = () => {

    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b']

    let randomIndx = Math.floor(Math.random() * quotes.length)
    let randomColorIndx = Math.floor(Math.random() * colors.length)
    setRandomQuote(quotes[randomIndx])
    setColor(colors[randomColorIndx])
  }

  return (
    <div className='flex items-center justify-center h-screen'
    style={{
      backgroundColor: color
    }}>
      <div 
      id='quote-box'
      className="container mx-auto max-w-sm shadow-xl rounded bg-white ">
        <div className="card-header mx-5 py-5" id='text'>
          { randomQuote ? (
            <h1 className='text-2xl font-semibold'
            style={{
              color: color
            }}
            >&quot;{randomQuote.text}&quot;</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className="card-body mx-10" id="author">
          {randomQuote ? (
            <p className='text-right text-base font-normal font-style: italic'
            style={{ color: color}}>
                - {randomQuote.author || "No author"}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='flex justify-around py-5'>
            <a
            id="tweet-quote"
            target={'_blank'}
            href={`https://twitter.com/intent/tweet?text=%22${randomQuote.text}%22%0A%0A%20-%20${randomQuote.author ? randomQuote.author : 'Anonymous'}`}
            className='my-auto px-2 py-2 rounded'
            style={{
              backgroundColor: color
            }}
            >
              <FontAwesomeIcon 
              style={{color: 'white'}}
              icon={faTwitter} />
            </a>
          <button
          id='new-quote'
          onClick={getRandomQuote}
          type="button"
          className="px-4 py-2 text-white rounded"
          style={{
            backgroundColor: color
          }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
