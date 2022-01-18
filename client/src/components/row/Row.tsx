import React, { FC } from 'react';
import { TableRow, TableCell, makeStyles, Button } from '@material-ui/core';
import { Url, RowStyle } from '../../types';
import DeleteButton from '../delete-button/DeleteButton';
import ViewButton from '../view-button/ViewButton';

const useStyles = makeStyles(() => ({
  contentTableCell: {},
  content: {},
  iconWrapper: {}
}));

const Row: FC<{
  data: Url;
  rowStyle?: RowStyle;
  onDeleteUrl: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  onViewUrl: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}> = ({ data, rowStyle = {}, onDeleteUrl, onViewUrl }) => {
  const { sanitizedLongUrl, custom, createdOn, code } = data;
  const tinyUrl = `http://localhost:5500/${code}`;
  const classes = useStyles();

  const getUniqueViews = () => {
    const unique = Array.from(
      new Set(data.pageVisits.map((item) => item.ip_address))
    );
    return unique.length;
  };

  return (
    <TableRow
      style={rowStyle}
      hover
      tabIndex={-1}
      key={`${data.id}_${sanitizedLongUrl}`}
    >
      <TableCell className={classes.contentTableCell}>
        <a href={sanitizedLongUrl} target="_blank" rel="noopener">
          {sanitizedLongUrl}
        </a>
        <DeleteButton onClick={(e) => onDeleteUrl(e, data.id)} />
      </TableCell>
      <TableCell className={classes.contentTableCell}>
        <a href={tinyUrl} target="_blank" rel="noopener">
          {tinyUrl}
        </a>
        <ViewButton onClick={(e) => onViewUrl(e, data.id)} />
      </TableCell>
      <TableCell>
        <div>
          <b>Unique views: </b> {getUniqueViews()}
        </div>
        <div>
          <b>Total views: </b> {data.pageVisits.length}
        </div>
      </TableCell>
      <TableCell>{new Date(createdOn).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default Row;
