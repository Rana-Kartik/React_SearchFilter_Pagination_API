import { useEffect, useState } from "react"

function Table() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
      .then(response => 
        response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <div>
        <input type="search" placeholder="search games by platform"></input>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
         
          <table className="table">
            <tr>
              <th>title</th>
              <th>platform</th>
              <th>score</th>
              <th>genre</th>
              <th>editors_choice</th>
            </tr>
            {users.map(user => (
              <tr key={user.title}>
                <td>{user.title}</td>
                <td>{user.platform}</td>
                <td>{user.score}</td>
                <td>{user.genre}</td>
                <td>{user.editors_choice}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  )
}

export default Table