import './climbs.css';
import {
	Grid, CircularProgress, Toolbar, TextField, Stack, Typography, IconButton, Menu, MenuItem, Rating
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Climb from './climb/climb';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { clearClimbs, getClimbs } from '../../flux/actions/climbs';
import { getGrades } from '../../flux/actions/grades';

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
	const [quality, setQuality] = useState(0);
	const [sortBy, setSortBy] = useState('name');
	const [orderBy, setOrderBy] = useState('asc');

	const contentRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const searchPost = async () => {
		await dispatch(clearClimbs());
		await dispatch(getClimbs({ 
			name: name, limit: 12, skip: 0,
			qualityMin: quality, qualityMax: 5,
			sortBy: sortBy,
			orderBy: orderBy
		}));
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleQualityChange = (e, newQuality) => {
		setQuality(newQuality);
	};

	const handleSort = (sort, order) => {
		setSortBy(sort);
		setOrderBy(order);
	};

	useEffect(() => {
		if(!initialLoad) searchPost();
	}, [quality, sortBy, orderBy]);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const loadMore = async () => {
			await dispatch(getClimbs({ 
				name: name, limit: 12, skip: (page)*12,
				qualityMin: quality, qualityMax: 5,
				sortBy: sortBy,
				orderBy: orderBy
			}));
			setPage((page) => page + 1);
			setLoading(false);
		}

		const loadGrades = async () => {
			await dispatch(getGrades());
		}

		if (initialLoad) {
			setLoading(true);
			loadGrades();
			loadMore();
			setInitialLoad(false);
		}
	}, [initialLoad, dispatch, page, name, quality, sortBy, orderBy]);

	useEffect(() => {
		const loadMore = async () => {
			await dispatch(getClimbs({ 
				name: name, limit: 12, skip: (page)*12, 
				qualityMin: quality, qualityMax: 5,
				sortBy: sortBy,
				orderBy: orderBy
			}));
			setPage((page) => page + 1);
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
	}, [loading, dispatch, page, hasMore, name, quality, sortBy, orderBy]);

	const FilterBar = (
		<Toolbar className={'filterbar'}>
			<div className={'filter-item'}>
				<TextField onKeyDown={handleKeyPress} name="name" variant="outlined" label="Name"
					fullWidth value={name} onChange={(e) => setName(e.target.value)} size={'small'} />
			</div>
			<Stack className={'filter-item'}>
				<Typography>
					Quality
				</Typography>
				<Rating value={quality} onChange={handleQualityChange} precision={0.1} />
			</Stack>
			<IconButton onClick={handleClick} size="large" >
				<SortIcon fontSize={'large'} />
			</IconButton>
			<Menu
				id="profileMenu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem className="sort" onClick={() => handleSort('name', 'asc')}>Name Ascending<ArrowUpwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => handleSort('name', 'desc')}>Name Descending<ArrowDownwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => handleSort('quality', 'asc')}>Quality Ascending<ArrowUpwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => handleSort('quality', 'desc')}>Quality Descending<ArrowDownwardIcon /></MenuItem>
			</Menu>
		</Toolbar>
	);

	if (climbs.length === 0 && !loading) return (
		<>
			{FilterBar}
			No posts
		</>
	);

	return (
		<>
			{FilterBar}
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
