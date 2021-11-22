import './climbs.css';
import {
	Grid, CircularProgress, AppBar, Toolbar, TextField
} from '@mui/material';
import Climb from './climb/climb';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { clearClimbs, getClimbs } from '../../flux/actions/climbs';

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
	const [name, setName] = useState('');
	const contentRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const searchPost = async () => {
		setPage(1);
		dispatch(clearClimbs());
		dispatch(getClimbs({ name: name, page: 1 }));
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	useEffect(() => {
		const loadMore = async () => {
			setPage((page) => page + 1);
			await dispatch(getClimbs({ name: name, page: page }));
			setLoading(false);
		}

		if (initialLoad) {
			setLoading(true);
			loadMore();
			setInitialLoad(false);
		}
	}, [initialLoad, dispatch, page, name]);

	useEffect(() => {
		const loadMore = async () => {
			setPage((page) => page + 1);
			await dispatch(getClimbs({ name: name, page: page }));
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
	}, [loading, dispatch, page, hasMore, name]);

	if (climbs.length === 0 && !loading) return (
		<>
			<Toolbar>
				<TextField onKeyDown={handleKeyPress} name="name" variant="outlined" label="Name"
					fullWidth value={name} onChange={(e) => setName(e.target.value)} />
			</Toolbar>
			No posts
		</>
	);

	return (
		<>
			<Toolbar>
				<TextField onKeyDown={handleKeyPress} name="name" variant="outlined" label="Name"
					fullWidth value={name} onChange={(e) => setName(e.target.value)} />
			</Toolbar>
			<Grid ref={contentRef} container alignItems={'stretch'} spacing={3} className={'climbs'}>
				{climbs?.map((climb) => {
					return <Grid key={climb._id} item xs={12} sm={12} md={12} lg={12}>
						<Climb climb={climb} />
					</Grid>;
				})}
			</Grid>
			{hasMore ? <CircularProgress sx={{ alignSelf: "center" }} disableShrink={true} /> : ""}
		</>
	);
};

export default Climbs;
