import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { IAppState } from 'src/redux/store';

const BeerChart: React.FC = () => {
  const { beers } = useSelector((state: IAppState) => state.beer);

  const { options, series } = useMemo(() => {
    return {
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: beers.map((beer) => beer.name),
        },
      },
      series: [
        {
          name: 'series-1',
          data: beers.map((beer) => beer.abv),
        },
      ],
    };
  }, [beers]);

  return (
    <>
      <Chart type="bar" options={options} series={series} width="500" />
    </>
  );
};

export default BeerChart;
