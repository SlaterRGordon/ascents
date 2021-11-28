import './listItem.css';

import { Rating } from '@mui/material';

interface ListItemProps {
	item: any;
	openItem: (e: any, id: string) => void;
}

const ListItem = (props: ListItemProps) => {
	const { item, openItem } = props;

	return (
		<div className="item" onClick={(e) => openItem(e, item._id)}>
				<div className="itemHeader">
					<div>{item.name}</div>
					<div>V8</div>
				</div>
				<div className="itemBody">
					<div>Place holder description for climb item...</div>
					<div className="itemFooter">
						<Rating name="read-only" value={item.quality} precision={0.1} size={'large'} readOnly />
						<div>67 Ascents</div>
					</div>
				</div>
		</div>
	);
};

export default ListItem;