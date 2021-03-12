import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';
import { Beer } from 'src/models';
import BeerTable from '../BeerTable';

interface IBeerModal {
  beers: Array<Beer>;
  open: boolean;
  handleClose: () => void;
}

const BeerModal: React.FC<IBeerModal> = ({ beers, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <BeerTable beers={beers} visiblePagination={false} />
    </Modal>
  );
};

BeerModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  beers: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BeerModal;
