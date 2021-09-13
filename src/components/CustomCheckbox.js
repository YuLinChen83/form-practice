import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const CustomCheckbox = (props) => <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} {...props} />;

export default CustomCheckbox;
