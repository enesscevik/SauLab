import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faStar,
  faEye,
  faComment,
  faTag,
  faCircleExclamation,
  faCodePullRequest,
  faCodeCommit,
  faCode,
  faBoxArchive,
  faClose,
  faFolderOpen,
  faFileEdit,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faFileCode } from '@fortawesome/free-solid-svg-icons/faFileCode';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons/faLeftLong';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Repository(props) {
  const [pageVal, setPageVal] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [repo, setRepo] = useState(null);
  const [starred, setStarred] = useState(0);
  const [watched, setWacthed] = useState(0);
  const [addText, setAddText] = useState('');
  const [addBlock, setAddBlock] = useState(true);
  const [plist, SetPlist] = useState([]);
  const [thisfolder, setThisFolder] = useState(null);
  const [folderid, setFolderid] = useState(0);
  const [fileloc, setFileloc] = useState([]);
  const [filecontent, setFilecontent] = useState('');
  const [filename, setFilename] = useState('');
  const [fileid, setFileid] = useState(0);
  const [fileviewer, setFileviewer] = useState(false);
  const [newfoldermenu, setNewfoldermenu] = useState(false);
  const [newfilemenu, setNewfilemenu] = useState(false);
  const [newfoldername, setNewfoldername] = useState('');
  const [newfilename, setNewfilename] = useState('');
  const [newfilecontent, setNewfilecontent] = useState('');
  const [contextMenu, setContextmenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [focusfolder, setFocusfolder] = useState(0);
  const [focusfile, setFocusfile] = useState(0);
  const [contexteditMenu, setContexteditmenu] = useState(false);
  const [contexttext, setcontexttext] = useState('');

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const addTextRef = useRef(null);
  const addTextRefButton = useRef(null);

  const fetchData = async () => {
    const sqlQuery = `SELECT get_repository(${props.repId},${props.usId})`;
    const data = await window.electron.connect(sqlQuery);
    setStarred(data.get_repository.starred);
    setWacthed(data.get_repository.watched);
    setRepo(data.get_repository);
    setFetched(true);
  };

  useEffect(() => {
    fetchData();
  }, [props.repId, props.usId, props.r]);

  const release = () => {
    if (!repo || repo['release'].length === 0 || !repo.release.version) {
      return <p className={styles.tText}>There is no release!</p>;
    }

    return repo.release.version.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['release']['version'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>
            {repo['release']['description'][index]}
          </p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['release']['date'][index]}</p>
        </div>
      </div>
    ));
  };
  const commit = () => {
    if (!repo || !repo.commit.user || repo['commit'].length === 0) {
      return <p className={styles.tText}>There is no commit!</p>;
    }

    return repo.commit.user.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.ind}>
          <p className={styles.tText}>{repo['commit']['user'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>{repo['commit']['description'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['commit']['date'][index]}</p>
        </div>
      </div>
    ));
  };
  const pullRequest = () => {
    if (!repo || !repo.pullrequest.user || repo['pullrequest'].length === 0) {
      return <p className={styles.tText}>There is no pull-request!</p>;
    }

    return repo.pullrequest.user.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.ind}>
          <p className={styles.tText}>{repo['pullrequest']['user'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['pullrequest']['status'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['pullrequest']['title'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>
            {repo['pullrequest']['description'][index]}
          </p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['pullrequest']['date'][index]}</p>
        </div>
      </div>
    ));
  };
  const issue = () => {
    if (!repo || !repo.issue.user || repo['issue'].length === 0) {
      return <p className={styles.tText}>There is no issue!</p>;
    }

    return repo.issue.user.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.ind}>
          <p className={styles.tText}>{repo['issue']['user'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['issue']['status'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['issue']['title'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>{repo['issue']['description'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['issue']['date'][index]}</p>
        </div>
      </div>
    ));
  };
  const comment = () => {
    if (!repo || !repo.comment.user || repo['comment'].length === 0) {
      return <p className={styles.tText}>There is no comment!</p>;
    }

    return repo.comment.user.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.ind}>
          <p className={styles.tText}>{repo['comment']['user'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>{repo['comment']['text'][index]}</p>
        </div>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['comment']['date'][index]}</p>
        </div>
      </div>
    ));
  };
  const tag = () => {
    if (!repo || !repo.tag.name || repo['tag'].length === 0) {
      return <p className={styles.tText}>There is no tag!</p>;
    }

    return repo.tag.name.map((id, index) => (
      <div key={id} className={styles.elOne}>
        <div className={styles.st}>
          <p className={styles.tText}>{repo['tag']['name'][index]}</p>
        </div>
        <div className={styles.stlonglong}>
          <p className={styles.tText}>{repo['tag']['description'][index]}</p>
        </div>
      </div>
    ));
  };

  const sendQuerry = async (querry) => {
    await window.electron.connect(querry);
    await fetchData();
  };

  const getFolderBy = async (id) => {
    const q = `SELECT get_folder(${id})`;
    const data = await window.electron.connect(q);
    setFolderid(id);
    setThisFolder(data.get_folder);
  };
  const starWatch = (b) => {
    if (b === 0) {
      if (starred === 1)
        sendQuerry(
          `DELETE FROM public.star WHERE repository_id = ${props.repId} AND user_id = ${props.usId};`
        );
      else
        sendQuerry(
          `INSERT INTO public.star (user_id,repository_id) VALUES (${props.usId}, ${props.repId});`
        );
      //setStarred(!starred);
    } else if (b === 1) {
      if (watched === 1)
        sendQuerry(
          `DELETE FROM public.watch WHERE repository_id = ${props.repId} AND user_id = ${props.usId};`
        );
      else
        sendQuerry(
          `INSERT INTO public.watch (user_id,repository_id) VALUES (${props.usId}, ${props.repId});`
        );
      //setWacthed(!watched);
    }
  };

  const folderClick = async (id, name) => {
    SetPlist([...plist, id]);
    setFileloc([...fileloc, name]);
    await getFolderBy(id);
  };

  const mainfolderFol = () => {
    if (!repo || !repo.folder.id || repo.folder.id.length === 0) {
      return null;
    }

    return repo.folder.id.map((id, index) => (
      <div
        onClick={() => {
          folderClick(id, repo.folder.name[index]);
        }}
        onContextMenu={() => {
          setFocusfolder(id);
          setFocusfile(0);
          setContextmenu(true);
        }}
        folder_id={id}
        key={id}
        className={styles.mFolder}
      >
        <FontAwesomeIcon icon={faFolder} size='sm' />
        <div style={{ width: '10px' }}></div>
        <p className={styles.tText}>{repo.folder.name[index]}</p>
      </div>
    ));
  };

  const fileClick = (id, layer) => {
    if (layer === 0) {
      const index = repo.file.id.indexOf(id);
      setFilecontent(repo.file.content[index]);
      setFilename(repo.file.name[index]);
    } else {
      const index = thisfolder.file.id.indexOf(id);
      setFilecontent(thisfolder.file.content[index]);
      setFilename(thisfolder.file.name[index]);
    }

    setFileid(id);
    setFileviewer(!fileviewer);
  };
  const mainfolderFil = () => {
    if (!repo || !repo.file.id || repo.file.id.length === 0) {
      return null;
    }

    return repo.file.id.map((id, index) => (
      <div
        onClick={() => {
          fileClick(id, 0);
        }}
        onContextMenu={() => {
          setFocusfolder(0);
          setFocusfile(id);
          setContextmenu(true);
        }}
        file_id={id}
        key={id}
        className={styles.mFile}
      >
        <div className={styles.mFileIcon}>
          <FontAwesomeIcon icon={faFileCode} size='sm' />
          <div style={{ width: '10px' }}></div>
          <p className={styles.tText}>{repo.file.name[index]}</p>
        </div>
        <p className={styles.tText}>
          {'Created: '}
          {repo.file.cat[index]}
        </p>
        <p className={styles.tText}>
          {'Updated: '}
          {repo.file.uat[index]}
        </p>
      </div>
    ));
  };
  const cbackClick = async () => {
    SetPlist((plist) => {
      const updatedPlist = plist.slice(0, -1);
      setFolderid(updatedPlist[updatedPlist.length - 1] || null);
      return updatedPlist;
    });

    setFileloc((fileloc) => fileloc.slice(0, -1));

    const lastFolderId = plist[plist.length - 2] || null;
    if (lastFolderId) {
      await getFolderBy(lastFolderId);
    } else {
      console.warn('.');
    }
  };
  const cbackrooms = () => {
    return fileloc.map((name, index) => {
      return (
        <div key={name} className={styles.cbackfolder}>
          <p className={styles.tText}>
            {' > '} {fileloc[index]}
          </p>
        </div>
      );
    });
  };

  const mainfolder = () => {
    if (plist.length === 0) {
      return (
        <div className={styles.mainfolder}>
          <div className={styles.mainBackrooms}>
            <p className={styles.tText}>{repo.name}</p>
          </div>
          {mainfolderFol()}
          {mainfolderFil()}
        </div>
      );
    } else {
      return (
        <div className={styles.childfolder}>
          <div className={styles.childBackrooms}>
            <div className={styles.cbackfolder}>
              <p className={styles.tText}>{repo.name}</p>
            </div>
            {cbackrooms()}
            <button
              onClick={() => {
                cbackClick();
              }}
              className={styles.fileback}
            >
              <FontAwesomeIcon icon={faLeftLong} size='2x' />
            </button>
          </div>
          {folderFol()}
          {folderFil()}
        </div>
      );
    }
  };

  const folderFol = () => {
    if (
      !thisfolder ||
      !thisfolder.folder.id ||
      thisfolder.folder.id.length === 0
    ) {
      return null;
    }

    return thisfolder.folder.id.map((id, index) => (
      <div
        onClick={() => {
          folderClick(id, thisfolder.folder.name[index]);
        }}
        onContextMenu={() => {
          setFocusfolder(id);
          setFocusfile(0);
          setContextmenu(true);
        }}
        folder_id={id}
        key={id}
        className={styles.mFolder}
      >
        <FontAwesomeIcon icon={faFolder} size='sm' />
        <div style={{ width: '10px' }}></div>
        <p className={styles.tText}>{thisfolder.folder.name[index]}</p>
      </div>
    ));
  };
  const folderFil = () => {
    if (!thisfolder || !thisfolder.file.id || thisfolder.file.id.length === 0) {
      return null;
    }

    return thisfolder.file.id.map((id, index) => (
      <div
        onClick={() => {
          fileClick(id, 1);
        }}
        onContextMenu={() => {
          setFocusfolder(0);
          setFocusfile(id);
          setContextmenu(true);
        }}
        file_id={id}
        key={id}
        className={styles.mFile}
      >
        <div className={styles.mFileIcon}>
          <FontAwesomeIcon icon={faFileCode} size='sm' />
          <div style={{ width: '10px' }}></div>
          <p className={styles.tText}>{thisfolder.file.name[index]}</p>
        </div>
        <p className={styles.tText}>
          {'Created: '}
          {thisfolder.file.cat[index]}
        </p>
        <p className={styles.tText}>
          {'Updated: '}
          {thisfolder.file.uat[index]}
        </p>
      </div>
    ));
  };

  return (
    <div className={styles.page}>
      {/* {repo.name} */}
      {fetched && (
        <div className={styles.pageNav}>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(0);
            }}
          >
            <FontAwesomeIcon icon={faCode} size='xl' /> Repository
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(1);
            }}
          >
            <FontAwesomeIcon icon={faBoxArchive} size='xl' /> Releases
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(2);
            }}
          >
            <FontAwesomeIcon icon={faCodeCommit} size='xl' /> Commits
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(3);
            }}
          >
            <FontAwesomeIcon icon={faCodePullRequest} size='xl' /> P-Requests
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(4);
            }}
          >
            <FontAwesomeIcon icon={faCircleExclamation} size='xl' /> Issues
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(5);
            }}
          >
            <FontAwesomeIcon icon={faComment} size='xl' /> Comment
          </button>
          <button
            className={styles.pageNavButton}
            onClick={() => {
              setPageVal(6);
            }}
          >
            <FontAwesomeIcon icon={faTag} size='xl' /> Tags
          </button>
          <button
            className={`${styles.pageNavButtonfClick} ${
              starred === 1 ? styles.swyes : styles.swno
            }`}
            onClick={() => {
              starWatch(0);
            }}
          >
            <FontAwesomeIcon icon={faStar} size='xl' /> {repo.star}
          </button>
          <button
            className={`${styles.pageNavButtonfClick} ${
              watched === 1 ? styles.swyes : styles.swno
            }`}
            onClick={() => {
              starWatch(1);
            }}
          >
            <FontAwesomeIcon icon={faEye} size='xl' /> {repo.watch}
          </button>
        </div>
      )}
      {fetched && (
        <div className={styles.desk}>
          {pageVal === 0 && (
            <div onMouseMove={handleMouseMove} className={styles.deskPage}>
              {mainfolder()}
            </div>
          )}
          {pageVal === 1 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.st}>
                  <p className={styles.tText}>Version</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Description</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Date</p>
                </div>
              </div>
              <div className={styles.deskPage}>{release()}</div>
            </div>
          )}
          {pageVal === 2 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.ind}>
                  <p className={styles.tText}>User</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Description</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Date</p>
                </div>
              </div>
              <div className={styles.deskPage}>{commit()}</div>
            </div>
          )}
          {pageVal === 3 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.ind}>
                  <p className={styles.tText}>User</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Status</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Title</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Description</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Date</p>
                </div>
              </div>
              <div className={styles.deskPage}>{pullRequest()}</div>
            </div>
          )}
          {pageVal === 4 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.ind}>
                  <p className={styles.tText}>User</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Status</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Title</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Description</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Date</p>
                </div>
              </div>
              <div className={styles.deskPage}>{issue()}</div>
            </div>
          )}
          {pageVal === 5 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.ind}>
                  <p className={styles.tText}>User</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Comment</p>
                </div>
                <div className={styles.st}>
                  <p className={styles.tText}>Date</p>
                </div>
              </div>
              <div className={styles.deskPage}>{comment()}</div>
            </div>
          )}
          {pageVal === 6 && (
            <div className={styles.deskCon}>
              <div className={styles.elTitle}>
                <div className={styles.st}>
                  <p className={styles.tText}>Tag</p>
                </div>
                <div className={styles.stlonglong}>
                  <p className={styles.tText}>Description</p>
                </div>
              </div>
              <div className={styles.deskPage}>{tag()}</div>
            </div>
          )}
        </div>
      )}
      {fetched && fileviewer && (
        <div className={styles.fileView}>
          <div className={styles.fileViewTitle}>
            <p className={styles.tText}>{filename}</p>
            <button
              onClick={async () => {
                await sendQuerry(
                  `UPDATE folder_schema.file SET content = '${filecontent}' WHERE file_id = ${fileid};`
                );
                await getFolderBy(folderid);
                setFilecontent('');
                setFileid(0);
                setFilename('');
                setFileviewer(false);
              }}
              className={styles.fileViewClose}
            >
              <FontAwesomeIcon icon={faClose} size='2x' />
            </button>
          </div>
          <ReactQuill
            value={filecontent}
            readOnly={repo.owner ? false : true}
            onChange={setFilecontent}
            modules={{ toolbar: false }}
          />
        </div>
      )}
      {fetched && pageVal === 0 && repo.owner && (
        <div className={styles.addtoRepo}>
          <button
            onClick={() => {
              setNewfoldermenu(!newfoldermenu);
              setNewfilemenu(false);
            }}
            className={styles.addtorepoButton}
          >
            <FontAwesomeIcon icon={faFolderOpen} size='xl' />
          </button>
          <button
            onClick={() => {
              setNewfilemenu(!newfilemenu);
              setNewfoldermenu(false);
            }}
            className={styles.addtorepoButton}
          >
            <FontAwesomeIcon icon={faFileEdit} size='xl' />
          </button>
        </div>
      )}
      {newfoldermenu && (
        <div className={styles.newfolderMenu}>
          <p className={styles.nText}>Folder Name</p>
          <input
            onChange={(e) => {
              setNewfoldername(e.target.value);
            }}
            className={styles.newMenuInput}
          ></input>
          <button
            onClick={async () => {
              if (newfoldername !== '') {
                const i = plist.length !== 0 ? folderid : repo.mainfolder;
                await sendQuerry(`SELECT add_folder('${newfoldername}',${i})`);
                setNewfoldermenu(false);
                const lastid = plist[plist.length - 1];
                await getFolderBy(lastid);
              }
            }}
            className={styles.nButton}
          >
            <FontAwesomeIcon icon={faPlus} size='xl' />
          </button>
        </div>
      )}
      {newfilemenu && (
        <div className={styles.newfileMenu}>
          <p className={styles.nText}>File Name</p>
          <input
            onChange={(e) => {
              setNewfilename(e.target.value);
            }}
            className={styles.newMenuInput}
          ></input>
          <p className={styles.nText}>File Content</p>
          <input
            onChange={(e) => {
              setNewfilecontent(e.target.value);
            }}
            className={styles.newMenuInput}
          ></input>
          <button
            onClick={async () => {
              if (newfilename !== '') {
                const i = plist.length !== 0 ? folderid : repo.mainfolder;
                await sendQuerry(
                  `INSERT INTO folder_schema.file ("name", "content", "folder_id") VALUES ('${newfilename}', '${newfilecontent}', ${i});`
                );
                setNewfilemenu(false);
                // const lastid = plist[plist.length - 1];
                // const lastnaem = fileloc[fileloc.length - 1];
                await getFolderBy(folderid);
              }
            }}
            className={styles.nButton}
          >
            <FontAwesomeIcon icon={faPlus} size='xl' />
          </button>
        </div>
      )}
      {fetched && pageVal === 5 && (
        <div className={styles.add}>
          {!addBlock && (
            <div className={styles.addP}>
              <input
                ref={addTextRef}
                className={styles.addInput}
                onChange={(e) => {
                  setAddText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTextRefButton.current.click();
                }}
              ></input>
              <button
                ref={addTextRefButton}
                className={styles.addSubmit}
                onClick={() => {
                  if (addText.length === 0) return;
                  sendQuerry(
                    `INSERT INTO public.comment (user_id,repository_id,comment_text) VALUES (${props.usId},${props.repId},'${addText}');`
                  );
                  fetchData();
                  addTextRef.current.value = '';
                  setAddText('');
                }}
              >
                {'>'}
              </button>
            </div>
          )}

          <div></div>
          <button
            className={styles.addButton}
            onClick={() => {
              setAddBlock(!addBlock);
            }}
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
              setContexteditmenu(!contexteditMenu);
            }}
            className={styles.contextButton}
          >
            Edit
          </button>
          <button
            onClick={async () => {
              if (focusfolder === 0 && focusfile) {
                await sendQuerry(
                  `DELETE FROM folder_schema.file WHERE file_id = ${focusfile}`
                );
              } else {
                await sendQuerry(
                  `DELETE FROM folder_schema.folder WHERE folder_id = ${focusfolder}`
                );
              }
              await getFolderBy(folderid);
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
                    if (focusfolder === 0 && focusfile) {
                      await sendQuerry(
                        `UPDATE folder_schema.file SET "name" = '${contexttext}' WHERE file_id = ${focusfile}`
                      );
                    } else {
                      await sendQuerry(
                        `UPDATE folder_schema.childfolder SET "name" = '${contexttext}' WHERE folder_id = ${focusfolder}`
                      );
                    }
                    await getFolderBy(folderid);
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

export default Repository;
