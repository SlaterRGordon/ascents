import './home.css';

import List from './list/list';
import Detail from './detail/detail'; 

import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';

const Home = () => {
	const [showDetail, setShowDetail] = useState(window.innerWidth > 1200);
	const [detail, setDetail] = useState(<></>);

	const openItem = (e, id) => {
		setDetail(<Detail id={id} closeItem={closeItem} />);
		setShowDetail(true);
	};

	const closeItem = () => {
		setDetail(<></>);
		setShowDetail(false);
	}

	// Hook on window resize
	useEffect(() => {
		const onResize= async () => {
			
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<Grid container spacing={2} alignItems={'stretch'} maxWidth="false" className="container">
			{showDetail ? 
				<>
				<Grid item xs={12} sm={12} md={12} lg={4} xl={6} id="listContainer" className="listContainer" sx={{ display: {xs: "none", sm: "none", md: "none", lg: "block", xl: "block"} }}>
					<List openItem={openItem} />
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={8} xl={6} className="detailContainer">
					{detail}
				</Grid>
				</>
			:
				<>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="listContainer" className="listContainer">
					<List openItem={openItem} />
				</Grid>
				</>
			}
		</Grid>
	);
};

export default Home;