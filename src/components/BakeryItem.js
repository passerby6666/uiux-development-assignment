import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BakeryItem({item}) {
    const dietaryLength = item.dietary.length

    return (
        <div>
            <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography gutterBottom variant="h6" color="text.secondary">
                    ${item.price}
                </Typography>
                <Typography gutterBottom variant="body1" color="text.secondary">
                    Type: {item.type} / Monthly Sales: {item.sales}
                    <br/>
                    {item.dietary.map((entry, i) => <>{entry}{i < dietaryLength-1 && " & "}</>)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
        </div>
    )
}