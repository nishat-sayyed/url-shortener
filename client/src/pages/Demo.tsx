import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Theme, Modal } from '@material-ui/core';
import UrlsTable from '../containers/UrlsTable';
import AddButton from '../components/add-button/AddButton';

import { IStore, PageVisit } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as urlActions from '../redux/actions/url/actions';
import PageVisitsModal from '../containers/PageVisitsModal';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    whiteSpace: 'nowrap'
  },
  form: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  formWrapper: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  demoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    flexDirection: 'column'
  },
  urlListWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    padding: '16px',

    [theme.breakpoints.down('md')]: {
      width: ' 90%',
      padding: '0 6px 6px 6px'
    }
  },
  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const header = [
  { id: 'original', label: 'Url', minWidth: 100 },
  { id: 'tiny', label: 'Tiny', minWidth: 100 },
  { id: 'views', label: 'Views', minWidth: 100 },
  { id: 'createdOn', label: 'Created On', minWidth: 100 }
];

const Demo = () => {
  const [original, setOriginal] = useState<string>('');
  const [custom, setCustom] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [pageVisitData, setPageVisitData] = useState<PageVisit[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const urlState = useSelector((state: IStore) => state.url);
  const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(urlActions.getAllUrls());
    return () => {
      dispatch(urlActions.clearUrls());
    };
  }, []);

  const onDeleteUrlHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (urlId: string) => {
      dispatch(urlActions.deleteUrl(urlId));
    };
  };

  const onAddUrlHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (original.trim()) {
      dispatch(urlActions.addUrl({ original, custom, code }));
      setOriginal('');
      setCode('');
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'original') setOriginal(value);
    else if (name === 'code') {
      setCode(value);
      setCustom(!!value);
    }
  };

  const onViewUrlHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return (urlId: string) => {
      const pageVisits = urlState.urls.find(
        (url) => url.id === urlId
      )?.pageVisits;
      setPageVisitData(pageVisits ? pageVisits : []);
      setOpenModal(true);
    };
  };

  return (
    <>
      <PageVisitsModal
        open={openModal}
        data={pageVisitData}
        onClose={() => setOpenModal(false)}
      />

      <div className={classes.demoWrapper}>
        <div style={{ height: '64px' }} />
        <div className={classes.urlListWrapper}>
          <div className={classes.userLabel}>
            {authState.currentUser?.email &&
              `Hi, ${authState.currentUser?.email}`}
          </div>
          <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onAddUrlHandler}>
              <TextField
                variant="outlined"
                style={{ marginBottom: '1rem' }}
                value={original}
                name="original"
                placeholder="Long URL..."
                onChange={onChangeHandler}
              />
              <TextField
                variant="outlined"
                style={{ marginBottom: '1rem' }}
                value={code}
                name="code"
                placeholder="Custome path (optional)"
                onChange={onChangeHandler}
              />
              <AddButton />
            </form>
          </div>
          <UrlsTable
            isLoading={urlState.isLoading}
            header={header}
            data={urlState.urls}
            stickyHeader={true}
            placeHolder="No items found"
            headerStyle={{ background: 'black' }}
            rowStyle={{ color: 'black', fontSize: '1.5rem' }}
            onDeleteUrl={(e, urlId) => onDeleteUrlHandler(e)(urlId)}
            onViewUrl={(e, urlId) => onViewUrlHandler(e)(urlId)}
          />
        </div>
      </div>
    </>
  );
};

export default Demo;
