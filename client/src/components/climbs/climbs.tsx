import './climbs.css';
import {
	Grid, CircularProgress, AppBar, Toolbar, TextField, Slider, Stack, Typography, IconButton, Menu, MenuItem
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Climb from './climb/climb';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { clearClimbs, getClimbs } from '../../flux/actions/climbs';
import { getGrades } from '../../flux/actions/grades';
import { Filter } from '@mui/icons-material';

function isBottom(ref: React.RefObject<HTMLDivElement>) {
	if (!ref.current) {
		return false;
	}
	return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const Climbs = () => {
	const { climbs, hasMore } = useSelector((state: RootStateOrAny) => state.climbs);
	const { grades } = useSelector((state: RootStateOrAny) => state.grades);
	const [initialLoad, setInitialLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [name, setName] = useState('');
	const [quality, setQuality] = useState([0, 5]);
	const [grade, setGrade] = useState([0, 17]);

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

	const handleQualityChange = (e, newQuality) => {
		setQuality(newQuality);
	};

	const handleGradeChange = (e, newGrade) => {
		setGrade(newGrade);
	};

	function gradeText(value) {
		return `v${value}`;
	}

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
			setPage((page) => page + 1);
			await dispatch(getClimbs({ name: name, page: page }));
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

	useEffect(() => {
		if (grades.length > 0) {
			setGrade([grades[0][0].value, grades[0][grades[0].length - 1].value]);
		};
	}, [grades])

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
				<Slider value={quality} onChange={handleQualityChange} min={0} max={5} step={0.1} />
			</Stack>
			<Stack className={'filter-item'}>
				<Typography>
					Grade
				</Typography>
				<Slider value={grade} onChange={handleGradeChange} step={1} min={0} max={17} valueLabelFormat={gradeText} valueLabelDisplay="on" />
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
				<MenuItem onClick={handleClose}>Name</MenuItem>
				<MenuItem onClick={handleClose}>Quality</MenuItem>
				<MenuItem onClick={handleClose}>Grade</MenuItem>
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
