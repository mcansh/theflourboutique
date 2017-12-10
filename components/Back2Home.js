import React from 'react';
import Link from 'next/link';
import { colors } from '../theme';

const Back2Home = () => (
  <Link href="/" prefetch>
    <a>
      Back to home
      <style jsx>{`
        a {
          position: absolute;
          top: 0;
          left: 0;
          align-self: flex-start;
          padding: 1rem;
          text-decoration: none;
          color: #000;
          transition: all 300ms ease-in-out;
          margin: 1.5rem;
          border-radius: 3px;
          font-size: 1.6rem;
          margin-left: env(safe-area-inset-left);
          margin-left: constant(safe-area-inset-left);
        }
        a:hover {
          background: ${colors.peach};
          color: black;
        }
      `}</style>
    </a>
  </Link>
);

export default Back2Home;
