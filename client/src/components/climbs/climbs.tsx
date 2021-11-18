import './climbs.css';
import {
    Grid, CircularProgress
} from '@mui/material';
import Climb from './climb/climb';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getClimbs } from '../../flux/actions/climbs';

function isBottom(ref: React.RefObject<HTMLDivElement>) {
    if (!ref.current) {
        return false;
    }
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const Climbs = () => {
    const { climbs, hasMore } = useSelector((state: RootStateOrAny) => state.climbs);
    const [initialLoad, setInitialLoad] = useState(true);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMore = async () => {
            setPage((page) => page + 1);
            await dispatch(getClimbs(page));
            setLoading(false);
        }

        if (initialLoad) {
            setLoading(true);
            loadMore();
            setInitialLoad(false);
        }
    }, [initialLoad, dispatch, page]);

    useEffect(() => {
        const loadMore = async () => {
            setPage((page) => page + 1);
            await dispatch(getClimbs(page));
            setLoading(false);
        }

        const onScroll = () => {
            if (!loading
                && hasMore
                && isBottom(contentRef)) {
                setLoading(true);
                loadMore();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, dispatch, page, hasMore]);

    if (!climbs.length && !loading) return (<>No posts</>);

    return (
        <>
            <Grid ref={contentRef} container alignItems={'stretch'} spacing={3} className={'climbs'}>
                {climbs?.map((climb) => {
                    return <Grid key={climb._id} item xs={12} sm={12} md={12} lg={12}>
                        <Climb climb={climb} />
                    </Grid>;
                })}
            </Grid>
            {hasMore?<CircularProgress sx={{ alignSelf: "center" }} disableShrink={true} />:""}
        </>
    );
};

export default Climbs;
