import React from 'react';
import Link from 'next/link';
import { transitions } from '../theme';
import { productName } from '../package.json';

const currentYear = new Date().getFullYear();

const Footer = () => (
  <nav>
    <Link href="/prices" prefetch>
      <a>Price Guide</a>
    </Link>
    <p>
      &copy; {currentYear}{' '}
      <Link href="/" prefetch>
        <a>{productName}</a>
      </Link>
    </p>
    <Link href="/order" prefetch>
      <a>Order</a>
    </Link>
    <style jsx>{`
      nav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100vw;
        height: 100px;
        font-size: 1.6rem;
      }

      a {
        margin: 1rem;
        color: #666;
        text-decoration: none;
        transition: ${transitions.default};
        will-change: color;
        position: relative;
      }

      a::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: black;
        opacity: 0;
        transition: ${transitions.default};
        will-change: opacity;
      }

      a:hover {
        color: black;
      }

      a:hover::after {
        opacity: 1;
      }

      p {
        margin: 0 1rem;
      }

      p a {
        color: currentColor;
        margin: 0;
      }

      @media (max-width: 550px) {
        nav {
          flex-direction: column;
          margin: 2rem 0;
        }

        p {
          order: -1;
          margin: 1rem 0;
        }
      }
    `}</style>
  </nav>
);

export default Footer;
