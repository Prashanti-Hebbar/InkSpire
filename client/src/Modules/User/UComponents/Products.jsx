import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Products() {
  const [expanded, setExpanded] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/product/getProducts");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:3000/category/getCategories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error(err));
  };

  const filteredproducts =
    selectedcategory === "All"
      ? products
      : products.filter((p) => p.categoryId === selectedcategory);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>

        <Select
          value={selectedcategory}
          label="Category"
          onChange={(e) => setSelectedcategory(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>

          {Array.isArray(categories) &&
            categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {filteredproducts.map((pdata) => (
        <Card key={pdata._id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                P
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={pdata.name}
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image={`http://localhost:3000/uploads/${pdata.productimage}`}
            alt={pdata.name}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {pdata.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              onClick={() => { console.log("clicked", pdata._id); navigate(`/user/product/${pdata._id}`)}}
              size="small"
              variant="outlined"
            >View Product</Button>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {/* <ExpandMoreIcon /> */}
            </ExpandMore>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
