import './list.css'

import Filter from './filter/filter';
import ListItem from './listItem/listItem';

import { Grid } from '@mui/material';

import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { clearClimbs, getClimbs } from '../../../flux/actions/climbs';

function isBottom(ref: React.RefObject<HTMLDivElement>) {
	if (!ref.current) {
		return false;
	}
	return ref.current.scrollHeight - ref.current.offsetHeight <= ref.current.scrollTop;
}

interface ListProps {
	openItem: (e: any, id: string) => void;
}

const List = (props: ListProps) => {
	const { openItem } = props;

	const { climbs, hasMore } = useSelector((state: RootStateOrAny) => state.climbs);

	const [initialLoad, setInitialLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const [page, setPage] = useState(1);
	const [name, setName] = useState('');
	const [quality, setQuality] = useState(0);
	const [sortBy, setSortBy] = useState('name');
	const [orderBy, setOrderBy] = useState('asc');

	const dispatch = useDispatch();

	// Search climbs by filters
	const search = async () => {
		setPage(2);

		// Clear climbs if new search
		await dispatch(clearClimbs());

		await dispatch(getClimbs({
			name: name, limit: 12, skip: 0,
			qualityMin: quality, qualityMax: 5,
			sortBy: sortBy,
			orderBy: orderBy
		}));
		setLoading(false);
	};

	const handleQualityChange = (e, newQuality) => {
		setQuality(newQuality);
	};
	const handleSort = (sort, order) => {
		setSortBy(sort);
		setOrderBy(order);
	};
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			setLoading(true);
			search();
		}
	};

	// Hook on filter changes
	useEffect(() => {
		if (!initialLoad) {
			setLoading(true);	
			search();
		}
	}, [quality, sortBy, orderBy]);

	// Hook on initial load
	useEffect(() => {
		const initialLoad = async () => {
			await dispatch(clearClimbs());
			await dispatch(getClimbs({
				name: name, limit: 12, skip: 0,
				qualityMin: quality, qualityMax: 5,
				sortBy: sortBy,
				orderBy: orderBy
			}));
			setPage((page) => page + 1);
			setLoading(false);
		};

		if (initialLoad && !loading) {
			setLoading(true);
			initialLoad();
			setInitialLoad(false);
		}
	}, [initialLoad]);

	// Hook on scroll
	useEffect(() => {
		const onScroll = async () => {
			if (!loading && hasMore && isBottom(contentRef)) {
				setLoading(true);
				await dispatch(getClimbs({ 
					name: name, limit: 12, skip: (page-1)*12, 
					qualityMin: quality, qualityMax: 5,
					sortBy: sortBy,
					orderBy: orderBy
				}));
				setPage((page) => page + 1);
				setLoading(false);
			}
		};

		if(document.getElementById("list")) {
			document.getElementById("list").addEventListener('scroll', onScroll);
			return () => document.getElementById("list").removeEventListener('scroll', onScroll);
		}
	}, [loading, hasMore, contentRef, page]);

	return (
		<>
		<Filter handleSort={handleSort} handleQualityChange={handleQualityChange} quality={quality} handleKeyPress={handleKeyPress} setName={setName} name={name} />
		<Grid container spacing={0} className="list" ref={contentRef} id="list">
			{climbs?.map((climb) => {
				return <Grid key={climb._id} item xs={12} sm={12} lg={12} xl={6}><ListItem item={climb} openItem={(e) => openItem(e, climb._id)} /></Grid>;
			})}
		</Grid>
		</>
	);
}

export default List;