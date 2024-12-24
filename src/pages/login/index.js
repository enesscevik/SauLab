import { useState, useRef } from 'react';
import styles from './styles.module.css';

function Login(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const userRef = useRef(null);
  const passRef = useRef(null);

  const controlData = async () => {
    const sqlQuery = `SELECT COUNT(*) FROM public.user WHERE email = '${user}' AND password = '${password}'`;
    const data = await window.electron.connect(sqlQuery);
    if (data['count'] == 1) {
      props.sum(user);
      props.sp(1);
    } else {
      userRef.current.value = '';
      passRef.current.value = '';
    }
  };

  return (
    <div className={styles.loginPage}>
      <img src='/dbImg.jpg' className={styles.dbImg}></img>
      <div className={styles.form}>
        <p className={styles.text}>Mail</p>
        <input
          className={styles.input}
          ref={userRef}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          placeholder='user5@example.com'
        ></input>
        <p className={styles.text}>Password</p>
        <input
          className={styles.input}
          ref={passRef}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='user5password'
        ></input>
        <button className={styles.button} onClick={controlData}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
