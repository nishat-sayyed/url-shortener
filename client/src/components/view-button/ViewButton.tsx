import React, { Dispatch, FC } from 'react';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ViewButton: FC<{
  onClick: Dispatch<React.MouseEvent<HTMLButtonElement, MouseEvent>>;
}> = ({ onClick }) => {
  //
  //
  return (
    <IconButton onClick={(e) => onClick(e)}>
      <VisibilityIcon />
    </IconButton>
  );
};

export default ViewButton;
