import { useState, useEffect } from 'react';
import styles from './styles.module.css';

function Account(props) {
  const [uid, setUid] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [add, setAdd] = useState(false);
  const [reponame, setReponame] = useState('');
  const [repodes, setRepodes] = useState('');
  const [focusrepo, setFocusrepo] = useState(0);
  const [contextMenu, setContextmenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contexttext, setcontexttext] = useState('');
  const [contexteditMenu, setContexteditmenu] = useState(false);

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const fetchData = async () => {
    const sqlQuery = `SELECT my_repos('${props.uid}')`;
    const data = await window.electron.connect(sqlQuery);
    setUid(data.my_repos);
    setFetched(true);
  };

  useEffect(() => {
    fetchData();
  }, [props.uid, props.r]);

  const sendQuerry = async (querry) => {
    await window.electron.connect(querry);
    await fetchData();
  };

  const parse = () => {
    if (!uid || uid['ids'].length === 0) {
      return (
        <p className={styles.tText}>You haven't created a repository yet!</p>
      );
    }

    return uid['ids'].map((id, index) => (
      <div
        onClick={() => {
          props.st(id);
          props.pc(1);
        }}
        onContextMenu={() => {
          setFocusrepo(id);
          setContextmenu(!contextMenu);
        }}
        key={id}
        className={styles.repo}
      >
        <div className={styles.ind}>
          <p className={styles.repoId}>{uid.ids[index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.repoName}>{uid.names[index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.repoDate}>{uid.cats[index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.repoDate}>{uid.uats[index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.repoP}>{uid.p[index].toString()}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.page}>
      <div className={styles.repoTitle}>
        <div className={styles.ind}>
          <p className={styles.tText}>id</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>name</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>created</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>updated</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>private</p>
        </div>
      </div>
      <div className={styles.line}></div>
      {fetched && (
        <div onMouseMove={handleMouseMove} className={styles.repos}>
          {parse()}
        </div>
      )}
      {fetched && (
        <div className={styles.addtoRepo}>
          <button
            onClick={() => {
              setAdd(!add);
            }}
            className={styles.addtorepoButton}
          >
            +
          </button>
        </div>
      )}
      {add && (
        <div className={styles.newrepoMenu}>
          <p className={styles.nText}>Repository Name</p>
          <input
            onChange={(e) => {
              setReponame(e.target.value);
            }}
            className={styles.newrepoInput}
          ></input>
          <p className={styles.nText}>Description</p>
          <input
            onChange={(e) => {
              setRepodes(e.target.value);
            }}
            className={styles.newrepoInput}
          ></input>
          <button
            onClick={() => {
              if (reponame !== '') {
                sendQuerry(
                  `INSERT INTO public.repository (name,description,owner_user_id) VALUES ('${reponame}','${repodes}',${props.uid})`
                );
                setReponame('');
                setRepodes('');
                setAdd(!add);
              }
            }}
            className={styles.nButton}
          >
            +
          </button>
        </div>
      )}
      {contextMenu && (
        <div
          style={{ left: position.x, top: position.y }}
          className={styles.context}
        >
          <button
            onClick={() => {
              setContexteditmenu(true);
            }}
            className={styles.contextButton}
          >
            Edit
          </button>
          <button
            onClick={() => {
              sendQuerry(
                `DELETE FROM public.repository WHERE repository_id = ${focusrepo}`
              );
              setContextmenu(false);
            }}
            className={styles.contextButton}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setContextmenu(false);
            }}
            className={styles.contextButton}
          >
            Close Context
          </button>
          {contexteditMenu && (
            <div className={styles.context}>
              <input
                onChange={(e) => {
                  setcontexttext(e.target.value);
                }}
                className={styles.contextInput}
              ></input>
              <button
                onClick={async () => {
                  if (contexttext !== '') {
                    await sendQuerry(
                      `UPDATE public.repository SET "name" = '${contexttext}' WHERE repository_id = ${focusrepo}`
                    );
                    setContexteditmenu(false);
                    setContextmenu(false);
                  }
                }}
                className={styles.contextButton}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
