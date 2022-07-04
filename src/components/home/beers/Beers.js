import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, getSort, setBeers } from "../store/action";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { SelectField } from "../../UI/SelectField/SelectField";
import { Field, Form, Formik } from "formik";
import Button from "@mui/material/Button";

import throttle from "lodash.throttle";
import { NavLink } from "react-router-dom";
import { Loading } from "../../loading/Loading";

const sorters = {
    abv_ascending: (a, b) => {
        return a.abv - b.abv;
    },
    abv_descending: (a, b) => {
        return b.abv - a.abv;
    },
    name_ascending: (a, b) => {
        return a.name < b.name ? -1 : 1;
    },
    name_descending: (a, b) => {
        return a.name > b.name ? -1 : 1;
    },
};

export const Beers = ({ tabValue: tabValueFromProps }) => {
    const tabValue = tabValueFromProps || "all";
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { beers, offset, hasMore, isLoading } = useSelector(
        (state) => state.home[tabValue]
    );

    useEffect(() => {
        if (tabValue && offset === 1 && beers.length !== 4) {
            dispatch(getBeers(tabValue, offset));
        }
    }, [tabValue]);

    const scrollHandler = useCallback(
        async (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) <
                100
            ) {
                if (hasMore && !isLoading) {
                    dispatch(getBeers(tabValue, offset + 1));
                }
            }
        },
        [offset, tabValue, dispatch, isLoading, hasMore]
    );
    const throttleScroller = useMemo(
        () => throttle(scrollHandler, 1000),
        [scrollHandler]
    );

    const onSubmit = (values) => {
        const beersCopy = [...beers].sort(sorters[values.sort]);
        dispatch(setBeers(beersCopy, tabValue));
    };
    useEffect(() => {
        document.addEventListener("scroll", throttleScroller);
        return function () {
            document.removeEventListener("scroll", throttleScroller);
        };
    }, [throttleScroller]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl" sx={{ pt: 5, pb: 20 }}>
                <Formik
                    initialValues={{
                        sort: "",
                    }}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form>
                            <Grid
                                container
                                columnSpacing={2}
                                alignItems={"end"}
                            >
                                <Grid item xs={3}>
                                    <Field
                                        name="sort"
                                        type="select"
                                        component={SelectField}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Grid container spacing={2} sx={{ mt: 5 }}>
                    {beers
                        ? beers.map((item) => (
                              <Grid item xs={4} key={item.id}>
                                  <NavLink to={"/details/" + item.id}>
                                      <img
                                          src={item.image_url}
                                          style={{
                                              display: "block",
                                              maxWidth: "100%",
                                              height: 300,
                                              objectFit: "contain",
                                              margin: "auto",
                                          }}
                                      />
                                      <h3>{item.name}</h3>
                                      <p>{item.abv}</p>
                                  </NavLink>
                              </Grid>
                          ))
                        : null}
                </Grid>
                {isLoading ? <Loading /> : null}
            </Container>
        </Box>
    );
};
