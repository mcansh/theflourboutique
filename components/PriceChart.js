import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { chart } from '../theme';

const breakLines = string => string.split('\n').map(i => <p key={i}>{i}</p>);

const PriceChart = ({ prices, intl: { formatNumber } }) => (
  <div className="chart">
    <div className="price">
      <div className="size">{breakLines('Per Cookie')}</div>
      <div className="basic">{breakLines('Basic\n(1 color)')}</div>
      <div className="detailed">{breakLines('Detailed\n(2-5 colors)')}</div>
    </div>
    {prices.map(({ id, size, basicPrice, detailedPrice }) => (
      <div key={id} className="price">
        {size && (
          <div className="size">
            {size}
            {'"'}
          </div>
        )}
        {basicPrice && (
          <div className="basic">
            {formatNumber(basicPrice, { style: 'currency', currency: 'USD' })}
          </div>
        )}
        {detailedPrice && (
          <div className="detailed">
            {formatNumber(detailedPrice, {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        )}
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
  intl: intlShape.isRequired,
};

export default injectIntl(PriceChart);
