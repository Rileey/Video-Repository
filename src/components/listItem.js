// import { Add, PlayArrowOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState, useLayoutEffect } from 'react' 
import { Link } from 'react-router-dom'
import '../css/listItem.modules.css'
import { useNavigate } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import Media from "react-media"

const ListItem = ({index, item}) => {

    const history = useNavigate()

    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})
    const [video, setVideo] = useState({})
    const [caption, setCaption] = useState([])
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        
        const getVideo = async () => {

            try {
                const { data } = await axios.get('movies/find/'+ item, {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
                    }
                })
                setCaption(data)
                // window.scrollTo(0, 0);
            } catch (err) {
                console.log(err)
            }
        }
        getVideo()
    }, [item, history])


    useEffect(() => {
        
        const getImage = async () => {

            try {
                const { data } = await axios.get('movies/find/'+ item, {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1n'
                    }
                })
                setIsLoading(false)
                setMovie(data.thumbnail[0].thumbnail)

            } catch (err) {
                console.log(err.message)
                setIsLoading(false)
            }
        }
        getImage()
    }, [item, history])



    useEffect(() => {
        
        const getCaption = async () => {

            try {
                const { data } = await axios.get('movies/find/'+ item, {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
                    }
                })
                
                setVideo(data.trailer[0].trailer)
            } catch (err) {
                console.log(err)
            }
        }
        getCaption()
    }, [item, history])

    return (
<>
        <Media query = '(min-width: 769px)'>
                  {
                    matches => {
                      return matches 
                      
                      ? (
        <Link to={`/content/${caption._id}`}>
        <div className="list-item-container">
        <div className='listItem'
        style={{left: isHovered && index * 220 -20 + index * 3}}
        onMouseEnter={()=> setIsHovered(true)} 
        onMouseLeave={()=> setIsHovered(false)}
        >

            

            {
                isLoading ? (
                    <img
                    effect="opacity"
                    className='list-image-two' 
                    src='./loading.gif'
                    // style={{position: 'relative', right: '0px', width: '100%', height: '100%'}}       
                    alt="" />
                    ) : (
                        <img className="list-image"
                        src={movie} 
                        alt="" />
                    )
            }

            {isHovered && (
            < >
            <video className="listVideo" src={video} autoPlay={true} loop />
            <div className="itemInfo">
                <div className="itemIcons">
                    {/* <PlayArrowOutlined style={{fontSize: '15px'}} className="itemIcon"/>
                    <Add style={{fontSize: '15px'}} className="itemIcon"/>
                    <ThumbUpAltOutlined style={{fontSize: '15px'}} className="itemIcon"/>
                    <ThumbDownAltOutlined style={{fontSize: '15px'}} className="itemIcon"/> */}
                    <span className="orange">
                        <span className="now">{caption.title}</span>
                    </span>
                </div>
                {/* <div className="itemInfoTop"> */}
                <div className="item-desc">
                    <span>{caption.duration}</span>
                    <span className="limit">+{caption.ageLimit}</span>
                    <span>{caption.year}</span>
                </div>
                    <div className="list-item-caption">{caption.description} 
                </div>
                <div className="genre">{caption.genre}</div>
                </div>
                
            {/* </div> */}
            </>
             )}
        </div>
        </div>
        </Link> 
                      ) : (
                        <Link to={`/content/${caption._id}`}>
                        <div className="list-item-container">
                        <div className='listItem-sm'>
                            {
                                isLoading ? (
                                    <img
                                    effect="opacity"
                                    className='list-image-two' 
                                    src='./loading.gif'
                                    // style={{position: 'relative', right: '0px', width: '100%', height: '100%'}}       
                                    alt="" />
                                    ) : (
                                        <img className="list-image"
                                        src={movie} 
                                        alt="" />
                                    )
                            }
                        </div>
                        </div>
                        </Link> 
                      )}}
                      </Media>
                      
        </>
    )
}

export default ListItem
