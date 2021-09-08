import { useState, useEffect } from "react";
import "../App.css";


function Table() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);


  
  const userDataApi = "https://elctro-api.herokuapp.com/api/v1/shop/admin/";

  useEffect(() => {
    const call = () => {
      fetch(userDataApi)
        .then((response) => response.json())
        .then((json) => {
          //setRows(json.data.customer);
          //console.log(json.data.customer);
          if (json.status === "Ok") success(json.data.customer);
        });
    };
    call();
  }, [result]);

  //loader is dissable..
  const success = (d) => {
    const b = d.filter((item) => item.resolved !== true);
    setResult(b);
    setLoading(false);
  };

  const userId = (_id) => {
    console.log(_id);
    fetch(`https://elctro-api.herokuapp.com/api/v1/shop/admin/${_id}`, {
      method: "POST",
      body: JSON.stringify({
        resolved: true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        let a = json.status;
        if (a === "Ok") succ();
        else fail({ json });
      });
  };

  // login is failed
  const fail = ({ json }) => {
    alert(json.message);
  };

  // login is successfull
  const succ = () => {
    alert("remove successfully");
  };


  return (
    <div className="App"> 
     { sessionStorage.getItem("admin")  ? <> { loading ? (
        <div className="loader" />
      ) : (
        <section className="section">
          
          <div className="data-center">
            <table className="data-table">
              <thead>
                <th>
                  <td>Name</td>
                </th>
                <th>
                  <td>Phone-no</td>
                </th>
                <th>
                  <td>Problem</td>
                </th>
                <th>
                  <td>Address</td>
                </th>
                <th>
                  <td>Date</td>
                </th>
                <th>
                  <td>Status</td>
                </th>
              </thead>
              <tbody>
                {result.map((record) => {
                  return (
                    <tr>
                      <td>{record.name}</td>
                      <td>{record.phoneNumber}</td>
                      <td>{record.problem}</td>
                      <td>{record.address}</td>
                      <td> {record.createdAt.slice(0, 10).split("-").reverse().join("-")}</td>
                      <td> <button
                      style={{
                        border: "none",
                        padding: ".5rem 1rem",
                        background: "red",
                        color: "whitesmoke",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                      onClick={() => userId(record._id)}
                    >
                      Remove
                    </button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}</> : <div className="main">
        <h2 id="login-h">Please Login</h2>
      </div>}
    </div>
  );
}

export default Table;
