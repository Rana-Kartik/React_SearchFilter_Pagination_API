import React,{ useEffect, useState } from "react";

export default function SearchFilter(){
    //set the default state and change the state using usestate hooks
    const [data,setData] = useState([])
    //set the state for searching and filtering the data
    const [serachApiData, setsearchApiData] = useState([])
    const [filterVal,setFilter] = useState('')
    //set the state for paginaton 
    const [currentPage,setCurrentpage] = useState(1)
    const recordsPerPage = 10
    const lastindex = currentPage * recordsPerPage
    const firstindex = lastindex - recordsPerPage 
    const records = data.slice(firstindex, lastindex)
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    //set the another hooks for loading the page
    useEffect(() => {
        const fetchData = () => {
            //url for fetching the data and store into the json format
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                setData(json)
                setsearchApiData(json)
            })
        }
        fetchData()
    },[])

    //create function for filtering the data based on the search box
    const handleFilter = (e) => {
        if(e.target.value === ''){
            setData(serachApiData)
        }
        else{
                console.log("searchapi data", serachApiData)
                const filterresult = serachApiData.filter(item => item.body?.toLowerCase().includes(e.target.value?.toLowerCase()) ||item.title?.toLowerCase().includes(e.target.value?.toLowerCase()) );
                 if(filterresult.length > 0){
                    setData(filterresult)     
                 }
                 else{
                    setData([{"title":"No Data found","platform":"No data found"}])
                 }
                   
        }
        setFilter(e.target.value)
    }

    //creating the function for set the previous page data
    const prePage = () => {
        if(currentPage !== 1){
            setCurrentpage(currentPage -1)
        }
    }

    //creating the function for current page changing the data
    const changeCPage = (id) => {
        setCurrentpage(id)
    }

    //creating the function for jump to thr next page load the data
    const nextPage = () => {
        if(currentPage !== npage){
            setCurrentpage(currentPage + 1)
        }
    }

    //Display the data in the table and creating the navbar for moving to the rest of all the pages
    return (
        <div style={{margin:'20px'}}>
            
            <div className="p">
                <input type="search" placeholder="search" value={filterVal} onInput={(e) => handleFilter(e)}/>
            </div>
            <table border={1}>
              <th>Id</th>
              <th>title</th>
              <th>body</th>
              {/* <th>genre</th>
              <th>editors_choice</th> */}
                {
                    records.map(item => {
                        return (
                            <tr>
                                {/* <td>{item.userId}</td> */}
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                {/* <td>{item.editors_choice}</td> */}
                            </tr>
                        )
                    })
                }
            </table>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prePage} >Prev</a>
                    </li>
                    {
                        numbers.map((n,i) => (
                            <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`} >
                                <a href="#" className="page-link" onClick={() => changeCPage(n)} >
                                    {n}
                                </a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
} 