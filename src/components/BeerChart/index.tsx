import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Beer } from 'src/models';
import { IAppState } from 'src/redux/store';

interface IBeerChart {
  handleClick: (beers: Array<Beer>) => void;
  width?: string;
  height?: string;
}

const BeerChart: React.FC<IBeerChart> = ({ handleClick, width, height }) => {
  const { beers } = useSelector((state: IAppState) => state.beer);

  const handleClickBar = (_config: any) => {
    const { dataPointIndex, config } = _config;
    const beersByAvb = beers.filter(
      (beer) => beer.abv === Number(config.xaxis.categories[dataPointIndex])
    );
    handleClick(beersByAvb);
  };

  const { options, series } = useMemo(() => {
    const data: Array<{ abv: number; count: number }> = [];

    for (let i = 0; i < beers.length; i += 1) {
      const index = data.findIndex((item) => item.abv === beers[i].abv);
      if (index === -1) {
        data.push({ abv: beers[i].abv, count: 1 });
      } else {
        data[index] = { abv: beers[i].abv, count: data[index].count + 1 };
      }
    }

    data.sort((item1, item2) => (item1.abv <= item2.abv ? -1 : 1));

    return {
      options: {
        chart: {
          id: 'basic-bar',
          events: {
            click: (e: MouseEvent, context: any, config: any) =>
              handleClickBar(config),
          },
        },
        xaxis: {
          categories: data.map((item) => item.abv.toFixed(1)),
          title: {
            text: 'ABV',
          },
        },
        yaxis: {
          title: {
            text: 'Count',
          },
        },
      },
      series: [
        {
          name: 'Count',
          data: data.map((item) => item.count),
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beers]);

  return (
    <>
      <Chart
        type="bar"
        options={options}
        series={series}
        width={width}
        height={height}
      />
    </>
  );
};

BeerChart.propTypes = {
  handleClick: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

BeerChart.defaultProps = {
  width: '600',
  height: '400',
};

export default BeerChart;
