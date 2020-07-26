import React, { useState, useEffect, useRef } from 'react';
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);

  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  const handleTitleClick = () => {
    setEditable(true);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const hadleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateUserEvent({
          ...event,
          title,
        })
      );
    }
    setEditable(false);
  };

  return (
    <div key={event.id} className='calendar-event'>
      <div className='calendar-event-time'>10:00 - 12:00</div>
      <button
        className='calendar-event-delete-button'
        onClick={handleDeleteClick}
      >
        &times;
      </button>
      <div className='calendar-event-info'>
        {editable ? (
          <input
            type='text'
            ref={inputRef}
            value={title}
            onChange={handleChange}
            onBlur={hadleBlur}
          />
        ) : (
          <span onClick={handleTitleClick}>{event.title}</span>
        )}
      </div>
    </div>
  );
};

export default EventItem;
