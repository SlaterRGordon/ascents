import './detailList.css';

import { Grid, CircularProgress } from '@mui/material';

import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { clearAscents, getAscents } from '../../../../flux/actions/ascents';

import DetailListItem from './detailListItem/detailListItem';

function isBottom(ref: React.RefObject<HTMLDivElement>) {
	if (!ref.current) {
		return false;
	}
	return ref.current.scrollHeight - ref.current.offsetHeight <= ref.current.scrollTop;
}

interface DetailListProps {
	climbId: string;
}

const DetailList = (props: DetailListProps) => {
	const { climbId } = props;

	const { ascents, hasMore } = useSelector((state: RootStateOrAny) => state.ascents);

	const [initialLoad, setInitialLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	// Hook on new climbId
	useEffect(() => {
		setLoading(false);
		setInitialLoad(false);
	}, [climbId]);

	// Hook on initial load
	useEffect(() => {
		const initialLoad = async () => {
			await dispatch(clearAscents());
			await dispatch(getAscents({
				limit: 12, skip: 0, climbId: climbId
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
				await dispatch(getAscents({ 
					limit: 12, skip: (page-1)*12, climbId: climbId
				}));
				setPage((page) => page + 1);
				setLoading(false);
			}
		};

		if(document.getElementById("detailList")) {
			document.getElementById("detailList").addEventListener('scroll', onScroll);
			return () => document.getElementById("list").removeEventListener('scroll', onScroll);
		}
	}, [loading, hasMore, contentRef, page]);

	return (
		<>
		<Grid container spacing={0} className="detailList" ref={contentRef} id="detailList">
			{ascents?.map((ascent) => {
				return <Grid key={ascent._id} item xs={12} sm={12} lg={12} xl={6}><DetailListItem item={ascent} /></Grid>;
			})}
		</Grid>
		{loading ? 
			<div className="loaderContainer"><CircularProgress className="loader"></CircularProgress></div>
		:	
			<></>
		}
		</>
	);
}

export default DetailList;