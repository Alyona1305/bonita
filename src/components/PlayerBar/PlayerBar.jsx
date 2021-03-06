import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, Slider, styled, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { actionChangeTime } from '../../store/types/playerTypes';

export const PlayerBar = () => {
  const [position, setPosition] = useState(0);
  const playerState = useSelector(state => state.player);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(actionChangeTime(e.target.value));
  };

  const formatDuration = value => {
    const min = Math.floor(value / 60);
    const sec = Math.floor(value - min * 60);
    const readableSec = sec > 9 ? sec : `0${sec}`;
    return Number.isNaN(value) ? '0:00' : `${min}:${readableSec}`;
  };

  const onTimeUpdate = () => {
    setPosition(Math.floor(playerState.audio.currentTime));
  };

  useEffect(() => {
    playerState.audio?.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      playerState.audio?.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [playerState.audio]);

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.8,
    fontWeight: 500,
    letterSpacing: 0.2,
    margin: '10px 0',
  });
  return (
    <Box sx={{
      width: '100%',
      height: '20%',
      marginBottom: '10px',
      backgroundColor: 'white',
      display: playerState.audio === null ? 'none' : 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      <Slider
        aria-label="time-indicator"
        size="small"
        min={0}
        step={1}
        value={position}
        onChange={onChange}
        sx={{padding: '0'}}
        max={
          playerState.audio?.duration === undefined ? 0
            : Number.isNaN(playerState.audio?.duration)
              ? 0
              : Math.floor(playerState.audio?.duration)
        }
      />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: ' row',
        width: '100%',
      }}
      >
        <TinyText>
          {formatDuration(playerState.audio?.currentTime)}
        </TinyText>
          &nbsp;/&nbsp;
        <TinyText>
          {formatDuration(playerState.audio?.duration)}
        </TinyText>
      </Box>
    </Box>
  );
};
