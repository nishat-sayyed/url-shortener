import { Box, Modal, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { IPageVisitModal } from '../types';
import PageVisitsTable from './PageVisitsTable';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const PageVisitsModal: FC<IPageVisitModal> = ({ data, open, onClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <PageVisitsTable data={data} />
        </Box>
      </Modal>
    </div>
  );
};

export default PageVisitsModal;
