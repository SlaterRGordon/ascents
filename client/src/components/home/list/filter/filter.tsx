import './filter.css';

import { Toolbar, TextField, Stack, Typography, Rating, IconButton, Menu, MenuItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { useState } from "react";

interface FilterProps {
	handleSort: (sort: any, order: any) => void;
	handleQualityChange: (e: any, newQuality: any) => void;
	handleKeyPress: (e: any) => void;
	setName: React.Dispatch<React.SetStateAction<string>>;
	name: string;
	quality: number;
}

const Filter = (props: FilterProps) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
		<Toolbar className='filterbar'>
			<div className='filter-item'>
				<TextField onKeyDown={props.handleKeyPress} name="name" variant="outlined" label="Name"
					fullWidth value={props.name} onChange={(e) => props.setName(e.target.value)} size={'small'} />
			</div>
			<Stack className='filter-item'>
				<Typography>
					Quality
				</Typography>
				<Rating value={props.quality} onChange={props.handleQualityChange} precision={0.1} />
			</Stack>
			<IconButton onClick={handleClick} size="large" >
				<SortIcon fontSize={'large'} />
			</IconButton>
			<Menu
				id="profileMenu"
				sx={{backgroundColor: "transparent"}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem className="sort" onClick={() => {props.handleSort('name', 'asc'); handleClose();}}>Name Ascending<ArrowUpwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => {props.handleSort('name', 'desc'); handleClose();}}>Name Descending<ArrowDownwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => {props.handleSort('quality', 'asc'); handleClose();}}>Quality Ascending<ArrowUpwardIcon /></MenuItem>
				<MenuItem className="sort" onClick={() => {props.handleSort('quality', 'desc'); handleClose();}}>Quality Descending<ArrowDownwardIcon /></MenuItem>
			</Menu>
		</Toolbar>
		</>
	);
}

export default Filter;