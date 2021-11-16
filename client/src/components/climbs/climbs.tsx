import './climbs.css';
import {
    Grid, LinearProgress, Paper
} from '@mui/material';
import Climb from './climb/climb';
import Paginate from '../pagination/pagination';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Climbs = () => {
    const { climbs, isLoading } = useSelector((state: RootStateOrAny) => state.climbs);

    const query = useQuery();
    const page = query.get('page') || 1;

    if (!climbs.length && !isLoading) return (<>No posts</>);

    return (
        <>
            {isLoading ? <LinearProgress sx={{marginTop: '-24px', width: '100vw', position: 'absolute', left: '0px', display: 'flex', flexGrow: 1}} /> : (
            <Grid container alignItems={'stretch'} spacing={3} className={'climbs'}>
                {climbs?.map((climb) => (
                    <Grid key={climb._id} item xs={12} sm={12} md={6} lg={3}>
                        <Climb climb={climb} />
                    </Grid>
                ))}
            </Grid>
            )}
            <Paper elevation={6} className='paginate'>
                <Paginate page={page} />
            </Paper>
        </>
    );
};

export default Climbs;
