import React from 'react';
import Navbar from '../components/navbar';
import Featured from '../components/featured';
import List from '../components/list'
import '../css/home.modules.css'
import Contentlist from '../components/contentlist';
import Footer from '../components/footer';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import UploadList from '../components/uploadlist'
// import { Modal } from '../components/modal';

const Home = ({ type }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);


    useEffect(() => {
        const getRandomList = async () => {
            try {
                const res = await axios.get(`lists${type ? '?type='+ type : ''}${genre ? '&genre='+ genre : ''}`) 
                setLists(res.data)
            } catch (err) {
                console.log(err )
            }
        };
        getRandomList()
    }, [type, genre])
    return(
        <div className="App">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="home-body">
            <Featured type={ type } setGenre={setGenre}/>
            <div className="bottom-body">
            <Contentlist lists={lists}/>
            <UploadList />
            {lists.map((list) => (
                <div key={list._id}>
                <List list={list}/>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}

export default Home