import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import Repository from '../repository';
import Account from '../account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRefresh,
  faBell,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';

function Main(props) {
  const [searchText, setSearchText] = useState('');
  const [noti, setNoti] = useState(false);
  const [page, setPage] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [infos, setInfos] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [targetRepo, setTargetRepo] = useState(0);

  const searchRef = useRef(null);

  const fetchData = async () => {
    const m = props.um !== '' ? props.um : 'user10@example.com';
    const sqlQuery = `SELECT profile('${m}')`;
    if (sqlQuery.length <= 0) return;
    const data = await window.electron.connect(sqlQuery);
    setInfos(data.profile);
    setFetched(true);
  };

  useEffect(() => {
    fetchData();
  }, [props.um, refresh]);

  const jsonFrom = (r) => {
    return JSON.stringify(r, null, 2);
  };

  const notification = () => {
    if (!infos || infos.notifications.length === 0) {
      return <p className={styles.pText}>There is no notification!</p>;
    }

    return infos.notifications.map((id, index) => (
      <div key={id} className={styles.notOne}>
        <p className={styles.pText}>{infos.notifications[index]}</p>
      </div>
    ));
  };

  const search = () => {
    if (!infos || infos.repositories.lenght === 0) {
      return <p className={styles.pText}>There is no repository here!</p>;
    }
    return infos.repositories.ids
      .map((id, index) => {
        const n = infos.repositories.names[index];
        if (n.toLowerCase().startsWith(searchText.toLowerCase())) {
          return (
            <div
              onClick={() => {
                setTargetRepo(id);
                setPage(1);
                searchRef.current.value = '';
                setSearchText('');
              }}
              key={id}
              className={styles.repoOne}
            >
              <div className={styles.repoOneLeft}>
                <div className={styles.pText}>{n}</div>
              </div>
              <div className={styles.repoOneRight}>
                <div className={styles.pText}>
                  {infos.repositories.des[index]}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.navbar}>
        <input
          ref={searchRef}
          className={styles.search}
          placeholder='Search Repository'
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <p className={styles.userName}>
          {props.um}
          {' - '}
          {infos && infos['user_id']}
        </p>
        <button
          className={styles.buttonRefresh}
          onClick={() => {
            setRefresh(refresh + 1);
          }}
        >
          <FontAwesomeIcon size='xl' icon={faRefresh} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            noti ? setNoti(false) : setNoti(true);
          }}
        >
          <FontAwesomeIcon size='xl' icon={faBell} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            props.sum('');
            props.sp(0);
          }}
        >
          <FontAwesomeIcon size='xl' icon={faDoorOpen} />
        </button>
        <button
          className={styles.buttonImg}
          onClick={() => {
            setPage(0);
          }}
        >
          <img className={styles.dbImg} src='/dbImg.jpg'></img>
        </button>
      </div>
      {searchText.length > 0 && (
        <div className={styles.searchPop}>{search()}</div>
      )}
      {noti && <div className={styles.notPop}>{notification()}</div>}
      {page === 1 && fetched && (
        <Repository usId={infos['user_id']} repId={targetRepo} r={refresh} />
      )}
      {page === 0 && fetched && (
        <Account
          pc={setPage}
          st={setTargetRepo}
          r={refresh}
          uid={infos['user_id']}
        />
      )}
    </div>
  );
}
export default Main;
