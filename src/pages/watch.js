import { BackspaceOutlined } from '@material-ui/icons'
import React, { useEffect, useState, useRef } from 'react'
import { Link, 
    // useLocation 
} from 'react-router-dom'
import '../css/watch.modules.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
// import ReactPlayer from '../../node_modules/react-player/lib/index'
import PlayerControls from '../components/playerControls'
import Media from "react-media"


const format = (seconds) => {

    

    

    if (isNaN(seconds)){
        return '00:00'
    }
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    
    if (hh){
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }

    return `${mm}:${ss}`
}

let count = 0

   
const Watch = () => {
    
    // console.log(window.screen.orientation.angle)
    const getOrientation = () => window.screen?.orientation?.type

    const params = useParams();
    const [orientation, setOrientation] = useState(getOrientation())
    const [showDetails, setShowDetails] = useState(false)
    const [video, setVideo] = useState([])
    const [film, setFilm] = useState([])
    const [state, setState] = useState({
        playing: true,
        muted: true,
        volume: 0.5,
        playbackRate: 1.0,
        played: 0,
        seeking: false,
        // landscape: window?.screen?.orientation?.type,
    })
    const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal')
    const {playing, muted, volume, playbackRate, played, landscape, seeking} = state
    const playerRef = useRef(null)
    const playerContainerRef = useRef(null)
    const controlsRef = useRef(null)

    const handlePlayPause = () => {
        setState({...state, playing: !state.playing})
    }

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    }

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
    }

    const handleMute = () => {
        setState({...state, muted: !state.muted})
    }

    const handleVolumeChange = (e, newValue) => {
        setState({
            ...state, 
            volume: parseFloat(newValue/100), 
            muted: newValue === 0 ? true:false
        })
    }

    const handleVolumeSeekUp = (e, newValue) => {
        setState({
            ...state, 
            volume: parseFloat(newValue/100), 
            muted: newValue === 0 ? true:false
        })
    }

    const handlePlaybackRateChange = (rate) => {
        setState({...state, playbackRate: rate})
    }


    const handleProgress = (changeState) => {

        if (count > 2){
            controlsRef.current.style.visibility = 'hidden';
            count = 0
            setShowDetails(false)
        }

        if (!state.playing) {
            controlsRef.current.style.visibility = 'visible';
            setShowDetails(true)
        }

        if (controlsRef.current.style.visibility === 'visible' ){
            count+= 1
        }

        

        if(!state.seeking){
            setState({...state, ...changeState})
        }
    }



    const handleSeekChange = (e, newValue) => {
        setState({...state, played: parseFloat(newValue/100)})
    }

    const handleSeekMouseDown = (e) => {
        setState({...state, seeking: true})
    }

    const handleSeekMouseUp = (e, newValue) => {
        setState({...state, seeking: false})
        playerRef.current.seekTo(newValue/100)
    }

    const handleChangeDisplayFormat = () => {
        setTimeDisplayFormat(
         timeDisplayFormat==='normal'
        ?'remaining' : 'normal',)
    }

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = 'visible';
        count = 0
    }
    
    const currentTime = playerRef.current 
    ? playerRef.current.getCurrentTime() 
    : '00:00';
    const duration = playerRef.current 
    ? playerRef.current.getDuration() 
    : '00:00'; 

    const elapsedTime = timeDisplayFormat==='normal' 
    ? format(currentTime) 
    : `-${format(duration - currentTime)}`;
    const totalDuration = format(duration)

    

    useEffect(() => {
        const getContent = async () => {
            try {
                const { data } = await axios.get(`/content/find/${params.id}`, {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
                    }
                })
                setFilm(data)
                setVideo(data.videoHD[0])
            } catch (err) {
                console.log(err)
            }

        }
        getContent()
    }, [params.id])



    return (
        <div className="watch">
            <div className="back">
                <Link
                className="watchLink" 
                to={`/`}
                // {`/content/${film._id}`} 
                style={
                    {
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: 'black',
                        padding: '5px 10px',
                        borderRadius: '15px'
                    }
                }
                >
                    <BackspaceOutlined />
                    <span
                    style={
                        {
                            border: '1px solid white',
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'white',
                            padding: '1px 5px',
                            fontWeight: '600'
                        }
                    }
                    >Exit</span> 
                </Link>

            </div>
            
           
           <div 
           ref={playerContainerRef} 
           className="playwrapper"
           onMouseMove={handleMouseMove}
           >

                { 
                    orientation && (
                        <ReactPlayer 
            ref={playerRef}
            url={video.video} 
            playing={playing} 
            muted={muted}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
            width='100%'
            height='100%'
            // style={{position: 'absolute', top: '0', left: '0', backgroundColor: 'black'}}
            />
                    )
                }
            

            <div className="overlay">
                {
                    showDetails && (
                    <>
                    <Media query = '(min-width: 945px)'>
                  {
                    matches => {
                      return matches 
                      
                      ? (
                    <div className="details">
                        <span className='watching'>Keep Watching</span>
                        <span className='overlay-title'>{film.title}</span>
                        <span className='director'>Directed by {film.director}</span>
                        <span className="overlay-subtitle">{film.description}</span>
                    </div>
                      ) : (null)}}
                      </Media>
                </>
                    )}
            </div>

            <PlayerControls
            film={film}
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onvolumechange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRateChange}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            />
           
            </div>
            </div>
            
    )
}

export default Watch
