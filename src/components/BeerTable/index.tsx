import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CardMedia,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@material-ui/core';

import { Beer } from 'src/models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  media: {
    minHeight: theme.spacing(15),
    backgroundSize: 'contain',
  },
}));

interface IBeerTableProps {
  beers: Array<Beer>;
  handleChange?: (page: number, perPage: number) => void;
  visiblePagination?: boolean;
}

const BeerTable: React.FC<IBeerTableProps> = ({
  handleChange,
  beers,
  visiblePagination,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const handleChangePage = (_page: number) => {
    setPage(_page);
    if (typeof handleChange === 'function') {
      handleChange(_page + 1, perPage);
    }
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(+e.target.value);
    if (typeof handleChange === 'function') {
      handleChange(page + 1, +e.target.value);
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Tagline</TableCell>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="center">ABV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beers.map((beer) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={beer.id}>
                <TableCell>{beer.name}</TableCell>
                <TableCell>{beer.tagline}</TableCell>
                <TableCell align="center">
                  <NavLink to={`/beer/${beer.id}`}>
                    <CardMedia
                      className={classes.media}
                      image={beer.image_url}
                    />
                  </NavLink>
                </TableCell>
                <TableCell align="center">{beer.abv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visiblePagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={1000}
          rowsPerPage={perPage}
          page={page}
          onChangePage={(e, v) => handleChangePage(v)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

BeerTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  beers: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
  visiblePagination: PropTypes.bool,
};

BeerTable.defaultProps = {
  handleChange: () => {},
  visiblePagination: true,
};

export default memo(BeerTable);
