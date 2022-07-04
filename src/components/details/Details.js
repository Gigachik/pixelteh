import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getDetails } from "./store/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

export const Details = () => {
    const dispatch = useDispatch();
    const [foodOpen, setFoodOpen] = useState(false);
    const [descriptionOpen, setDescriptionOpen] = useState(false);

    const foodHandleClick = () => {
        setFoodOpen((prevstate) => !prevstate);
    };
    const descriptionHandleClick = () => {
        setDescriptionOpen((prevstate) => !prevstate);
    };

    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetails(id));
    }, []);
    const { beer } = useSelector((state) => state.details);

    return beer ? (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl" sx={{ pt: 5 }}>
                <NavLink to={"/home/"}>
                    <strong>BACK</strong>
                </NavLink>
                <Grid container justifyContent="center" sx={{ mt: 5 }}>
                    <Grid item xs={4}>
                        <img
                            src={beer.image_url}
                            style={{
                                display: "block",
                                maxWidth: "100%",
                                height: 300,
                                objectFit: "contain",
                                margin: "auto",
                            }}
                        />
                        <h3>{beer.name}</h3>
                        <p>{beer.tagline}</p>
                        <p>{beer.abv}</p>

                        {beer.food_pairing.length > 2 ? (
                            <>
                                <ListItemButton onClick={foodHandleClick}>
                                    <ListItemText
                                        style={{
                                            textAlign: "center",
                                        }}
                                        primary="Food pairing toggle"
                                    />
                                </ListItemButton>
                                <Collapse
                                    in={foodOpen}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    {beer?.food_pairing.map((food, index) => (
                                        <List
                                            component="div"
                                            disablePadding
                                            key={index}
                                        >
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                    primary={food}
                                                />
                                            </ListItemButton>
                                        </List>
                                    ))}
                                </Collapse>
                            </>
                        ) : (
                            beer.food_pairing.map((food, index) => (
                                <p key={index}>{food}</p>
                            ))
                        )}
                        {beer.description.length > 160 ? (
                            <>
                                <ListItemButton
                                    onClick={descriptionHandleClick}
                                >
                                    <ListItemText
                                        style={{
                                            textAlign: "center",
                                        }}
                                        primary="DESCRIPTION"
                                    />
                                </ListItemButton>
                                <Collapse
                                    in={descriptionOpen}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <p>{beer[0].description}</p>
                                </Collapse>
                            </>
                        ) : (
                            <p>{beer.description}</p>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    ) : null;
};
