// import React from 'react';

import { AddEmUp } from './Helpers';
import { TaxPage } from './TaxPage';
import './App.css';

export default function App() {
  let numbers = [0, 1, 2, 3, 4];
  let names = ["react wiki", "sam", "jim"];
  let links = [
    {
      url: 'https://en.wikipedia.org/wiki/React_(software)',
      name: 'React Docs'
    },
    {
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      name: "MDN HTML Docs"
    },
    {
      url: "https://www.google.com",
      name: "Google.com"
    }
  ]
  return (
    <div>
      <header>

        <div>
          <TaxPage />
        </div>

        <p>
          <ul>
            {links.map(link => (
              <li>
                <a className='red'
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </p>
        <p>
          {names.map(name => (<div>Name: {name}</div>))}
        </p>
        <p>
          {numbers.map(number => (<div>{number}</div>))}
        </p>

        <ul>
          {numbers.map(number => (<li>{AddEmUp(number, 10)}</li>))}
        </ul>
        <p>
          {numbers.map(number => number * 10)}
        </p>

        <p>
          {numbers.map(number => (<div>HORSE: {number}</div>))}
        </p>



        <p>
          Hello World 22
          <div>hi</div>

        </p>
        <p>
          Hello World 2
        </p>
        <a
          href="https://en.wikipedia.org/wiki/React_(software)"
          target="_blank"
          rel="noopener noreferrer"
        >
          react wiki
        </a>

        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          target="_blank"
          rel="noopener noreferrer"
        >
          HTML: HyperText Markup Language
        </a>
      </header>
    </div>
  );
}


