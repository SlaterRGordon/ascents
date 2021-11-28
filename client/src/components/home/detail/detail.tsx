import './detail.css';

import { IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface DetailProps {
	id: string;
	closeItem: (e) => void;
}

const Detail = (props: DetailProps) => {
	const { id, closeItem } = props;


	return (
		<>
		<Toolbar />
		<div className="detail">
			<div className="detailHeader">
				<div>{id}</div>
				<IconButton onClick={closeItem}>
					<CloseIcon className="headerIcon" />
				</IconButton>
			</div>
			<div className="detailBody">
				Detail body content here...
			</div>
		</div>
		</>
	);
}

export default Detail;