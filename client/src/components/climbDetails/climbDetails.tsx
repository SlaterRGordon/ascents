import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getClimb } from "../../flux/actions/climbs";
import {
	Card, CardContent, Stack, Rating, Typography, ButtonBase
} from '@mui/material';

const ClimbDetails = () => {
	const { climb } = useSelector((state: RootStateOrAny) => state.climbs);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getClimb(id));
	}, [id]);

	var description = climb ? climb.description?.slice(0, 50) : "";
	if (description > 50) {
		description += '...';
	}

	console.log(climb);

	return (
		climb ? <Card raised elevation={6} className={'card'}>
			<ButtonBase component="span" className={'h-100'}>
				<CardContent className={'h-100'}>
					<Stack spacing={2} className={'card-contents'}>
						<Typography variant="h6">{climb.name}</Typography>
						<Typography variant="body2">{description}</Typography>
						<Stack direction={'row'} spacing={4} alignItems={'center'}>
							<Typography variant="h4">{climb.grade}</Typography>
							<Rating name="read-only" value={climb.quality} precision={0.1} size={'large'} readOnly />
						</Stack>
					</Stack>
				</CardContent>
			</ButtonBase>
		</Card>
		:
		<></>
	);
};

export default ClimbDetails;
