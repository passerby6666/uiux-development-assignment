import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

export default function Sidebar({sort, handleSortChange, type, handleTypeChange, dietary, handleDietaryChange, cart, bakeryData, resetFilters}) {
    return (
        <Grid container>
            <Grid item xs={12} className="SidebarEntry">
                <FormControl>
                    <FormLabel id="radio-buttons-group">Sort By</FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group"
                        name="radio-buttons-group"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <FormControlLabel value="name" control={<Radio /> } label="Name" />
                        <FormControlLabel value="price" control={<Radio />} label="Price" />
                        <FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} className="SidebarEntry">
                <FormControl>
                    <FormLabel>Types (OR Filter)</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={type.bread} onChange={handleTypeChange} name="bread" />
                            }
                            label="Bread"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={type.cake} onChange={handleTypeChange} name="cake" />
                            }
                            label="Cake"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={type.pastry} onChange={handleTypeChange} name="pastry" />
                            }
                            label="Pastry"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} className="SidebarEntry">
                <FormControl>
                    <FormLabel>Dietary (AND Filter)</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={dietary.lactoseFree} onChange={handleDietaryChange} name="lactoseFree" />
                            }
                            label="Lactose Free"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={dietary.nutFree} onChange={handleDietaryChange} name="nutFree" />
                            }
                            label="Nut Free"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={dietary.vegan} onChange={handleDietaryChange} name="vegan" />
                            }
                            label="Vegan"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} className="SidebarEntry">
                <Button variant="outlined" onClick={resetFilters}>Reset Filters</Button>
            </Grid>
            <Grid item xs={12} className="SidebarEntry">
                <h3>My Cart</h3>
                <ul style={{paddingLeft: 15}}>
                    {bakeryData.map(
                        (item, index) => {
                            if (cart[index])
                                return <li>
                                    {item.name}
                                </li>
                        })
                    }
                </ul>
                <h4>
                    Total: ${
                    bakeryData.map((item, index) => item.price * cart[index])
                        .reduce((sum, a) => sum+a, 0).toFixed(2)
                }
                </h4>
            </Grid>
        </Grid>
    );
}