import React from 'react';
import PropTypes from 'prop-types';
import { chart } from '../theme';

const breakLines = string => string.split('\n').map(i => <p key={i}>{i}</p>);

const PriceChart = ({ prices }) => (
  <div className="chart">
    {prices.map(p => (
      <div key={p.size} className="price">
        <div className="size">{p.size}</div>
        <div className="basic">{breakLines(p.basic)}</div>
        <div className="detailed">{breakLines(p.detailed)}</div>
      </div>
    ))}
    <style jsx>{`
      .chart {
        box-shadow: 0 4px 16px rgba(38, 38, 38, 0.1);
        width: 70vw;
        margin: 0 auto;
      }
      @media (max-width: 880px) {
        .chart {
          width: 80vw;
        }
      }
      @media (max-width: 550px) {
        .chart {
          width: 95vw;
        }
      }
      .price {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        width: 100%;
        font-size: 1.6rem;
      }
      .price > div {
        flex: 1;
      }
      .price:nth-of-type(n + 2) {
        color: white;
      }
      .price:nth-of-type(2) {
        background: ${chart.green};
      }
      .price:nth-of-type(3) {
        background: ${chart.orange};
      }
      .price:nth-of-type(4) {
        background: ${chart.yellow};
      }
      .price:nth-of-type(5) {
        background: ${chart.red};
      }
      .price:nth-of-type(6) {
        background: ${chart.salmon};
      }
      .price:last-of-type {
        background: ${chart.blue};
      }
    `}</style>
  </div>
);

PriceChart.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      basic: PropTypes.string,
      detailed: PropTypes.string,
    })
  ).isRequired,
};

export default PriceChart;
