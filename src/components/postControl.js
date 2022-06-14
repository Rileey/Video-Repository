import React, {forwardRef} from "react"
import '../css/playercontrols.modules.css'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
// import Stack  from "@mui/material/Stack"
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import { styled } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
// import Media from "react-media"
import Media from '../../node_modules/react-media/index'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import FullscreenIcon  from '@material-ui/icons/Fullscreen'
import IconButton from '@material-ui/core/IconButton'
// import Screenfull from 'screenfull'


function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={1} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const PlayerControls = forwardRef(({
  onPlayPause, 
  playing,  
  muted, 
  onMute, 
  onEnter,
  onLeave,
  onvolumechange, 
  onVolumeSeekUp, 
  volume, 
  playbackRate,
  onPlaybackRateChange,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration,
  onChangeDisplayFormat,
  film
}, ref) => {



    return(
        <div>
             <div className="controls-wrapper" ref={ref}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: '1'
            }}
            >
                <Grid container alignItems='center' justifyContent='flex-end'>
                  <Button onClick={onChangeDisplayFormat} variant='text' style={{color:'#fff'}}>
                    <Typography > {elapsedTime}</Typography>
                  </Button>
                </Grid>
                  
                        <Grid container direction='row' alignItems='center' justifyContent='center'>

                <IconButton onClick={onPlayPause} className='controlIcons' style={{fontSize: '2.5rem', margin: '0 50px'}} aria-label='rewind'>
                    {playing ? (<PauseIcon fontSize='inherit' className='controlIcons'/> ) : (<PlayArrowIcon fontSize='inherit' className='controlIcons'/>)}
                </IconButton>

                </Grid>


                <Grid container direction='row' alignItems='center' justifyContent='flex-end' style={{display: 'flex', marginBottom: '10px'}}>
                {/* <Grid item xs={10}>
                      <PrettoSlider 
                          min={0}
                          max={100}
                          value={played * 100}
                          onChange={onSeek}
                          onMouseDown={onSeekMouseDown}
                          onChangeCommitted={onSeekMouseUp}
                          ValueLabelComponent={(props)=>(
                            <ValueLabelComponent{...props} value={elapsedTime}/>
                            )}
                          style={{color: '#fff'}}
                          
                      />
                  </Grid> */}
                    <Grid item  >
                        <Grid container alignItems='center' direction='row'>
                            <Box style={{display: 'flex'}}>
                            <IconButton onClick={onMute} className='bottomIcons'>
                                {muted ? (<VolumeOffIcon fontSize='small' style={{marginTop: '-5px', color: 'white'}} className='bottomIcons'/>) : (<VolumeUpIcon fontSize='small' style={{marginTop: '-5px', color: 'white'}} className='bottomIcons'/>)}
                            </IconButton>    
                            </Box>

                        </Grid>
                        
                    </Grid>
                </Grid>
            </div>
        </div>
    )
})

export default PlayerControls
