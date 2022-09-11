import React, { useEffect, useState  } from 'react';
import './PaintingList.scss'
import {Pagination } from 'fwt-internship-uikit';
import '../select/SimpleBar.scss';
import '../select/Select.scss';
import { Select, Input} from 'fwt-internship-uikit';


const PaitingList = () => {

    // const currentPage = 2

    const [currentPage, setCurrentPage] = useState(1)


    const [paints, setPaints] = useState([]);
    const [location, setLocation] = useState([])
    const [locations, setLocations] = useState([])
    const [authors, setAuthors] = useState([])
    const [value, setValue] = useState('')

    const filteredPaints = paints.filter(paint => {
        return paint.name.toLowerCase().includes(value.toLowerCase()) 
    })

    
    const getPaints = async (currentPage) => {
        const response = await fetch(`https://test-front.framework.team/paintings?_page=${currentPage}&_limit=12`)
            .then((response) => response.json());
            setPaints(response)
    }

    useEffect(() => {
        getPaints(currentPage);
    }, [currentPage])



    const getLocation = async () => {
        const response = await fetch('https://test-front.framework.team/locations')
            .then((response) => response.json());
            setLocation(response)
    }
    
    useEffect(() => {
        getLocation();
    }, [])


    const getLocations = async () => {
        const response = await fetch('https://test-front.framework.team/locations')
            .then((response) => response.json());
            const reLocation = response.map((location) => {
                return {
                    'id': location.id,
                    'name': location.location
                }
            })
            setLocations(reLocation)
    }

    useEffect(() => {
        getLocations();
    }, [])


    const getAuthors = async () => {
        const response = await fetch('https://test-front.framework.team/authors')
            .then((response) => response.json());

            setAuthors(response)
    }    

    useEffect(() => {
        getAuthors();
    }, [])

    return (
        <div className='container'>
            <div className="filter-items">
                <div className="filter-item">
                    <Input 
                        placeholder='name'
                        onChange={(event) => setValue(event.target.value)}
                        />
                </div>
                <div className="filter-item">
                    <Select
                        value='Author'
                        options={authors}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        value='Location'
                        options={locations}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        value='Created'
                        data-simplebar
                    />
                </div>
            </div>
            <div className="wrapper">
                <div className="items">
                        {
                            filteredPaints.map((paint) => (
                                <div key={paint.id} className='item'>
                                    <img className='img' src={`https://test-front.framework.team` + paint.imageUrl} alt="" />
                                    <div className="item-title">  
                                        <h4 className='item-text'>{paint.name}</h4>
                                    </div>
                                    <div className='block__hidden'>
                                        <div className='block__hidden-wrapper'>
                                            <div className="block__hidden-item">
                                                <h3 className='block__hidden-item-big-title'>{paint.name}</h3>
                                            </div>
                                        {authors.map((author) => {
                                            return (
                                                (author.id === paint.authorId) ?
                                                    <div key={author.name} className='block__hidden-item'>
                                                        <h5 className='block__hidden-item-title'><span className='block__hidden-span'>Author: </span> {author.name}</h5>
                                                    </div>  : null  
                                                )
                                            }
                                        )}
                                        <div className='block__hidden-item'>
                                            <h5 className='block__hidden-item-title'><span className='block__hidden-span'>Created: </span>{paint.created}</h5>
                                        </div> 
                                        {location.map((loc) => {
                                            return (
                                                (loc.id === paint.locationId) ? 
                                                    <div key={loc.name} className='block__hidden-item'>
                                                            <h5 className='block__hidden-item-title'><span className='block__hidden-span'>Location: </span>{loc.location}</h5>
                                                    </div>  : null  
                                                )
                                            }  
                                        )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }             
                </div>
            </div >   
            <Pagination 
                    pagesAmount='3'
                    currentPage={currentPage}
                    onChange={(currentPage )  => setCurrentPage(currentPage)} 
                />
        </div>
    );
};

export default PaitingList;








////            {locations.map(location => (
            //                 <Select 
            //                 options={location.location}
            //                 disabled = 'false'
            //                 className='select'
            //                 value='stringgg'
            //                 />
                
            // ))}