import React, { useState } from 'react';
import Header from '../../components/Header';
import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useGetProductsQuery } from '../../state/api';

const Product = ({ product }) => {
  const { _id, name, description, price, rating, category, supply, productStats } = product;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
          color={theme.palette.secondary[500]}
          fontWeight={'bold'}
          gutterBottom
        >
          {category.toUpperCase()}
        </Typography>
        <Typography variant="h5" component={'div'}>
          {name}
        </Typography>
        <Typography sx={{ mt: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          See more
        </Button>
      </CardActions>
      <Collapse key={_id} in={isExpanded} unmountOnExit sx={{ color: theme.palette.secondary[100] }}>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {productStats[0].yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {productStats[0].yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const isNonMobile = useMediaQuery('(min-width: 768px)');
  const { data } = useGetProductsQuery();
  return (
    <Box m={'1.5rem 2.5rem'}>
      <Header title="Products" subtitle={'See your list of products.'} />
      <Box
        mt={'20px'}
        display={'grid'}
        gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
        justifyContent={'space-between'}
        rowGap={'20px'}
        columnGap={'1.33%'}
        sx={{
          '& > div': {
            gridColumn: isNonMobile ? undefined : 'span 4',
          },
        }}
      >
        {
          data && data.map((product, idx) => (
            <Product key={idx} product={product} />
          ))
        }
      </Box>
    </Box>
  );
};

export default Products;
