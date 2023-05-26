import React,{ useEffect, useState } from "react";

export default function SearchFilter(){
    const [data,setData] = useState([])
    const [serachApiData, setsearchApiData] = useState([])
    const [filterVal,setFilter] = useState('')
    const [currentPage,setCurrentpage] = useState(1)
    const recordsPerPage = 10
    const lastindex = currentPage * recordsPerPage
    const firstindex = lastindex - recordsPerPage 
    const records = data.slice(firstindex, lastindex)
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        const fetchData = () => {
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                setData(json)
                setsearchApiData(json)
            })
        }
        fetchData()
    },[])

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

    const prePage = () => {
        if(currentPage !== 1){
            setCurrentpage(currentPage -1)
        }
    }

    const changeCPage = (id) => {
        setCurrentpage(id)
    }

    const nextPage = () => {
        if(currentPage !== npage){
            setCurrentpage(currentPage + 1)
        }
    }

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