import React, { FC } from 'react';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import DeleteButton from '../delete-button/DeleteButton';
import { Url, RowStyle } from '../../types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  contentTableCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {},
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Row: FC<{
  data: Url;
  rowStyle?: RowStyle;
  onDeleteUrl: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}> = ({ data, rowStyle = {}, onDeleteUrl }) => {
  const { sanitizedLongUrl, custom, createdOn, code } = data;
  const tinyUrl = `${window.location.host}/${code}`;
  const classes = useStyles();

  return (
    <TableRow
      style={rowStyle}
      hover
      tabIndex={-1}
      key={`${data.id}_${sanitizedLongUrl}`}
    >
      <TableCell className={classes.contentTableCell}>
        <div className={classes.content}>
          <a href={sanitizedLongUrl} target="_blank" rel="noopener">
            {sanitizedLongUrl}
          </a>
        </div>
        <div className={classes.iconWrapper}>
          <DeleteButton onClick={(e) => onDeleteUrl(e, data.id)} />
        </div>
      </TableCell>
      <TableCell>
        <Link to={code} rel="noopener">
          {tinyUrl}
        </Link>
      </TableCell>
      <TableCell>{custom ? 'Yes' : 'No'}</TableCell>
      <TableCell>{new Date(createdOn).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default Row;
