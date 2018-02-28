import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../theme';

const StyledLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  align-self: flex-start;
  padding: 1rem;
  text-decoration: none;
  color: #000;
  transition: all 300ms ease-in-out;
  margin-left: env(safe-area-inset-left);
  margin-left: constant(safe-area-inset-left);
  margin: 1.5rem;
  border-radius: 3px;
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    background: ${colors.peach};
    color: black;
  }
`;

const Back2Home = () => (
  <Link href="/" prefetch>
    <StyledLink>Back to home</StyledLink>
  </Link>
);

export default Back2Home;
