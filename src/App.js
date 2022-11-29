import './App.css';
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import Sidebar from "./components/Sidebar";
import BakeryItem from "./components/BakeryItem";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Lato', 'sans-serif'].join(',')
        },
    },
});

function App() {
    const [sort, setSort] = useState("popularity");
    const [type, setType] = useState({
        bread: false,
        cake: false,
        pastry: false
    });
    const [dietary, setDietary] = useState({
        lactoseFree: false,
        nutFree: false,
        vegan: false
    });

    const empty_array = new Array(bakeryData.length).fill(false);
    const [cart, setCart] = useState(empty_array);

    function sortingFunction(a, b) {
        if (sort === "price") {
            return a.price - b.price
        }
        else if (sort === "name") {
            return a.name.localeCompare(b.name)
        }
        else {
            return -(a.sales - b.sales)
        }
    }

    function typeFilter(item) { // OR filter
        if (!type.bread && !type.cake && !type.pastry) {
            return true
        }
        else if((type.bread && item.type === "Bread") || (type.cake && item.type === "Cake") || (type.pastry && item.type === "Pastry")) {
            return true
        }
        else {
            return false
        }
    }

    function dietaryFilter(item) { // AND filter
        if (!dietary.lactoseFree && !dietary.nutFree && !dietary.vegan) { // no filter selected
            return true
        }
        else if((!dietary.lactoseFree || (dietary.lactoseFree && item.dietary.includes("Lactose Free")))
        && (!dietary.nutFree || (dietary.nutFree && item.dietary.includes("Nut Free")))
        && (!dietary.vegan || (dietary.vegan && item.dietary.includes("Vegan")))) {
            return true
        }
        else {
            return false
        }
    }

    function handleSortChange(event) {
        setSort(event.target.value)
    }

    function handleTypeChange(event) {
        setType({
            ...type,
            [event.target.name]: event.target.checked,
        });
    }

    function handleDietaryChange(event) {
        setDietary({
            ...dietary,
            [event.target.name]: event.target.checked,
        });
    }

    function updateCart(cart, index) {
        return cart.map((c, i) => {
            if (i === index)
                return !c;
            return c;
        })
    }

    function getDisplayData(allData) {
        let displayData = allData;
        displayData = displayData.filter(typeFilter);
        displayData = displayData.filter(dietaryFilter);
        displayData.sort(sortingFunction);
        return displayData
    }

    function resetFilters() {
        setType({
            bread: false,
            cake: false,
            pastry: false
        });
        setDietary({
            lactoseFree: false,
            nutFree: false,
            vegan: false
        });
    }

    const dataToDisplay = getDisplayData(bakeryData);

    return (
        <ThemeProvider theme={theme}>
            <Box className="App" my={4}>
                <Grid container>
                    <Grid item xs={3} className="Sidebar">
                        <Sidebar sort={sort} handleSortChange={handleSortChange}
                                 type={type} handleTypeChange={handleTypeChange}
                                 dietary={dietary} handleDietaryChange={handleDietaryChange}
                                 cart={cart} bakeryData={bakeryData} resetFilters={resetFilters}></Sidebar>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
                            {dataToDisplay.map((item, index) => (
                                <Grid item xs={6} sm={6} md={4} key={item.id}>
                                    <Card sx={{ maxWidth: 345, height: "100%"}}>
                                        <BakeryItem item={item} />
                                        <Button size="small" style={{marginBottom: 5}}
                                                color={cart[item.id] ? "error" : "primary"}
                                                onClick = {() => setCart(updateCart(cart, item.id))}>
                                            {cart[item.id] ? "Remove from Cart" : "Add to Cart"}
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default App;
