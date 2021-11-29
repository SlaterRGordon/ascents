import './detail.css';

import { IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { getClimb } from '../../../flux/actions/climbs';


interface DetailProps {
	id: string;
	closeItem: (e) => void;
}

const Detail = (props: DetailProps) => {
	const { id, closeItem } = props;

	const { climb } = useSelector((state: RootStateOrAny) => state.climbs);

	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	// Hook on new id
	useEffect(() => {
		const loadClimb = async () => {
			await dispatch(getClimb(id));
			setLoading(false);
		};

		if (!loading) {
			setLoading(true);
			loadClimb();
		}
	}, [id]);

	return (
		<>
			{climb ?
				<>
					<Toolbar />
					<div className="detail">
						<div className="detailHeader">
							<div>{climb.name}</div>
							<IconButton onClick={closeItem}>
								<CloseIcon className="headerIcon" />
							</IconButton>
						</div>
						<div className="detailBody">
							<div>Detail body content here...</div>
							<div className="ascents">
								
							</div>
						</div>
					</div>
				</>
				:
				<></>
			}
		</>
	);
}

export default Detail;