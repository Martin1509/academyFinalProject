import React, {useState} from 'react';
import {css} from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';

import {Attendee} from 'app/models/App/Attendee';
import {deleteAttendee, updateAttendee} from 'app/services/attendeesService';

interface ItemListProps{
    attendees: Attendee[];
    invalidate: () => void;
}

const ItemList: React.FC<ItemListProps> = ({attendees, invalidate}) => {
  const [localChanges, setChanges] = useState({});

  const infoList = {};
  attendees.forEach((attendee) => {
    const localChangesCopy = {...localChanges};
    let changed = false;

    if (localChanges[attendee.id] === attendee.moreInfo){
      delete localChangesCopy[attendee.id];
      changed = true;
    }

    if (localChanges[attendee.id] != undefined){
      infoList[attendee.id] = localChanges[attendee.id];
    } else {
      infoList[attendee.id] = attendee.moreInfo;
    }

    changed && setChanges(localChangesCopy);
  });

  const onChange = (e: ContentEditableEvent, attendeeId: string) => {
    if (attendees.filter(x => x.id === attendeeId)[0].moreInfo === e.target.value!){
      const localChangesCopy = {...localChanges};
      delete localChangesCopy[attendeeId];
      setChanges(localChangesCopy);
    } else {
      setChanges((prev) => ({
        ...prev,
        [attendeeId]: e.target.value!
      }));
    }
  };

  const handleUpdate = (attendeeId: string) => {
    updateAttendee(attendeeId, {moreInfo: localChanges[attendeeId]}).then(() => {
      invalidate();
    });
  };

  return (
    <div css={css`
  display: inline-block;
  margin-top: 40px;
  width: 80%;
  flex-direction: row;
`}
    >
      {attendees.map((attendee, index) => (
        <div key={attendee.id}
          css={css`
        display: flex;
        background-color: #ebebeb;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 10px;
        border: solid 1px black;
        &:hover,&:focus{
          background-color: #dbdbdb;
        };
        gap: 10px;
      `}
        >
          <div css={css`
          width: 2%;
          text-align: left;
          `}
          >
            {index}
          </div>
          <div css={css`
          width: 10%;
          text-align: left;
          `}
          >
            {attendee.file !== '' &&
            <img css={css`max-width: 100%; max-height: 18px`} src={attendee.file} alt="img"/>
            }
          </div>
          <div css={css`
          width: 20%;
          text-align: left;
          `}
          >
            {attendee.name}
          </div>
          <div css={css`
          width: 25%;
          text-align: left;
          `}
          >
            {attendee['e-mail']}
          </div>
          <div css={css`
          flex: 1;
          margin: 0;
          text-align: left;
          `}
          >
            <ContentEditable
              css={css`display: inline-block; width: calc(100% - 25px);`}
              html={infoList[attendee.id]}
              onChange={(e) => onChange(e, attendee.id)}
            />
            {localChanges[attendee.id] != undefined &&
              <div css={css`display: inline-block; float: right;`}>
                <IconButton
                  aria-label="delete"
                  size='small'
                  css={css`padding: 0px; margin-top: -3px;`}
                  onClick={() => handleUpdate(attendee.id)}
                >
                  <SaveIcon fontSize='inherit'/>
                </IconButton>
              </div>}
          </div>
          <IconButton
            aria-label="delete"
            size='small'
            css={css`padding: 0px;`}
            onClick={() => {
              deleteAttendee(attendee.id!).then(() => invalidate());
            }}
          >
            <DeleteIcon fontSize='inherit'/>
          </IconButton>
        </div>
      ))}
    </div>);
};

export {ItemList};
