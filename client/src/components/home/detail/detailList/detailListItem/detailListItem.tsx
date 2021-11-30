import './detailListItem.css';

import { Rating } from '@mui/material';

interface DetailListItemProps {
	item: any;
}

const DetailListItem = (props: DetailListItemProps) => {
	const { item } = props;

	return (
		<div className="detailItem">
				<div className="itemHeader">
					<div>Grade - {item.grade}</div>
				</div>
				<div className="itemBody">
					<div>{item.description}</div>
					<div className="itemFooter">
						<Rating name="read-only" value={item.quality} precision={0.1} size={'large'} readOnly />
					</div>
				</div>
		</div>
	);
};

export default DetailListItem;