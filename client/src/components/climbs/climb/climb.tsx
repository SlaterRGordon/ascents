import {
    Card, CardContent, Stack, Rating, Typography, ButtonBase 
} from '@mui/material';
import './climb.css';

const Climb = ({climb}) => {
    var description = climb.description?.slice(0,50);
    if (climb.description?.length > 50) {
        description += '...';
    }
    return (
        <Card raised elevation={6} className={'card'}>
            <ButtonBase component="span" className={'h-100'}>
                <CardContent className={'h-100'}>
                    <Stack spacing={2} className={'card-contents'}>
                        <Typography variant="h6">{climb.name}</Typography>
                        <Typography variant="body2">{description}</Typography>
                        <Stack direction={'row'} spacing={4} alignItems={'center'}>
                            <Typography variant="h4">{climb.grade}</Typography>
                            <Rating name="read-only" value={climb.quality} precision={0.1} size={'large'} readOnly />
                        </Stack>
                    </Stack>
                </CardContent>
            </ButtonBase>
        </Card>
    );
};

export default Climb;
