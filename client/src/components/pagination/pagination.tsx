import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { getClimbs } from '../../flux/actions/climbs';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state: RootStateOrAny) => state.climbs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getClimbs(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;