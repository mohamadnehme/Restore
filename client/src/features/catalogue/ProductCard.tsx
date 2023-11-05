import { Product } from "../../app/models/product";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/utils/util";
import { addBasketItemAsync, setBasket } from "../basket/BasketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toLocaleUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: 'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status === ('pendingAddItem' + product.id)} onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))} size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalogue/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}
