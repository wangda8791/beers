import { Container } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BeerChart, BeerModal, BeerTable } from 'src/components';
import { Beer } from 'src/models';
import * as actions from 'src/redux/actions';
import { IAppState } from 'src/redux/store';

const BeerList: React.FC = () => {
  const dispatch = useDispatch();

  const { beers } = useSelector((state: IAppState) => state.beer);

  const storedBeers = useMemo(() => {
    return beers;
  }, [beers]);

  const [beersByAbv, setBeersByAbv] = useState<Array<Beer>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleGetBeers = (_page: number, _perPage = 10) => {
    dispatch(
      actions.getBeerListRequest({
        page: _page,
        perPage: _perPage,
      })
    );
  };

  const handleSelectBeers = (_beers: Beer[]) => {
    setBeersByAbv(_beers);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setBeersByAbv([]);
  };

  useEffect(() => {
    handleGetBeers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <BeerChart handleClick={handleSelectBeers} height="250" />
      <BeerTable beers={storedBeers} handleChange={handleGetBeers} />
      <BeerModal
        beers={beersByAbv}
        open={modalOpen}
        handleClose={handleModalClose}
      />
    </Container>
  );
};

export default BeerList;
