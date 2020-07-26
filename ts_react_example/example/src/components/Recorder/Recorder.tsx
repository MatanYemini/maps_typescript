import React, { useRef, useState, useEffect } from 'react';
import './Recorder.css';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { start, selectDateStart, stop } from '../../redux/recorder';
import { WSAEINVALIDPROCTABLE } from 'constants';

const addZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const [, setCount] = useState<number>(0);
  let interval = useRef<number>(0);
  // We will need to do cleanup for the interval
  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  const started = dateStart !== '';
  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(stop());
    } else {
      dispatch(start());
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  let hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button onClick={handleClick} className='recorder-record'>
        <span></span>
      </button>
      <div className='recorder-counter'>
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;