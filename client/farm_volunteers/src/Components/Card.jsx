import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewVolunteer from "./NewVolunteer";

export default function ImgMediaCard() {
  return (<div>
    <Card  className = "home" id="home" sx={{ maxWidth: 700 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image="https://images.unsplash.com/photo-1498191923457-88552caeccb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Welcome to City-Farm
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City Farm is an 89 acre working city farm on the border of the London
          Boroughs of Greenwich and Bexley. As a charity City Farm is run as a
          conservation and education project, which provides an opportunity to
          find out about farming life and farm animals as well as a chance to
          experience the countryside within London. You can see native bird
          species, butterflies, wild flowers and ancient woodlands. If you want
          to volunteer with us, please contact us.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <NewVolunteer />
    </div>
  );
}
