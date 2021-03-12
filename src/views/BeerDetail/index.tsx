import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { IAppState } from 'src/redux/store';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(100),
    margin: 'auto',
    marginTop: theme.spacing(20),
  },
  media: {
    height: theme.spacing(20),
    backgroundSize: 'contain',
  },
  detail: {
    margin: theme.spacing(1),
  },
}));

const BeerDetail: React.FC = () => {
  const classes = useStyles();
  const params: { id: string } = useParams();

  const { beers } = useSelector((state: IAppState) => state.beer);

  const beer = useMemo(() => {
    return beers.find((item) => item.id.toString() === params.id.toString());
  }, [params, beers]);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={beer?.image_url} />
      <CardContent>
        <Typography component="h5" gutterBottom>
          Name: {beer?.name}
        </Typography>
        <Typography component="h5" gutterBottom>
          Tagline: {beer?.tagline}
        </Typography>
        <Typography component="h5" gutterBottom>
          ABV: {beer?.abv}
        </Typography>
        <Typography component="h5" gutterBottom>
          Description: {beer?.description}
        </Typography>
        <Typography component="h5" gutterBottom>
          Date first brewed: {beer?.first_brewed}
        </Typography>
        <Typography component="h5">
          Brewer&apos;s tips: {beer?.brewers_tips}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BeerDetail;
