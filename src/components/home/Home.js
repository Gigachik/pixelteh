import { Beers } from "./beers/Beers";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState } from "react";

export const Home = () => {
    const [tabValue, setTabValue] = useState("");

    const tabs = ["pizza", "steak", "all"];
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl" sx={{ pt: 5 }}>
                <Stack spacing={2} direction="row">
                    {tabs.map((item) => (
                        <Button
                            key={item}
                            variant="contained"
                            onClick={() => setTabValue(item)}
                            value={item}
                        >
                            {item}
                        </Button>
                    ))}
                </Stack>
                <Beers tabValue={tabValue} />
            </Container>
        </Box>
    );
};
