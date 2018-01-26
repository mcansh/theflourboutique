import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { colors } from '../theme';

const ButtonWrap = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-flow: row wrap;
        margin-top: 5rem;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

const Button = props => {
  if ('basic' in props) {
    return (
      <button>
        {props.text}
        <style jsx>{`
          button {
            appearance: none;
            cursor: pointer;
            margin: 1rem 2rem;
            padding: 2rem 4rem;
            background: ${colors.peach};
            border-radius: 0.5rem;
            color: black;
            transition: padding 300ms cubic-bezier(0, 2.08, 0.44, 1.13),
              background 300ms ease-in-out;
            font-size: 1.6rem;
            text-decoration: none;
            border: 0;
          }
          button:hover {
            background: ${colors.orange};
            padding-left: 6rem;
            padding-right: 6rem;
            color: currentColor;
          }
        `}</style>
      </button>
    );
  }
  return (
    <Link href={props.href}>
      <a>
        {props.text}
        <style jsx>{`
          a {
            cursor: pointer;
            margin: 1rem 2rem;
            padding: 2rem 4rem;
            background: ${colors.peach};
            border-radius: 0.5rem;
            color: black;
            transition: padding 300ms cubic-bezier(0, 2.08, 0.44, 1.13),
              background 300ms ease-in-out;
            font-size: 1.6rem;
            text-decoration: none;
          }
          a:hover {
            background: ${colors.orange};
            padding-left: 6rem;
            padding-right: 6rem;
            color: currentColor;
          }
        `}</style>
      </a>
    </Link>
  );
};

Button.defaultProps = {
  href: null,
};

Button.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
};

ButtonWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ButtonWrap, Button };
