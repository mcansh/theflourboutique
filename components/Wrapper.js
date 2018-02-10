import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => (
  <div className="wrapper">
    {children}
    <style jsx>{`
      .wrapper {
        min-height: calc(100vh - 100px);
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      @media (max-width: 700px) {
        .wrapper {
          margin-top: 3rem;
        }
      }
    `}</style>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
