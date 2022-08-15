import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=93ebacf76b137d44e7a8af7401818a5d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28,16,80,35`,
    );
    setData(data.results);
  };

  React.useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, []);

  console.log(data);

  const columns = [
    { title: 'STT', field: 'id' },
    { title: 'Name', field: 'title' },
    { title: 'Date', field: 'release_date' },
    { title: 'Point', field: 'vote_count' },
  ];

  return (
    <div className="App">
      <h1 align="center">React App Project</h1>
      <div className="table">
        <MaterialTable
          title="Employee Data"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...data,
                  {
                    id: Math.floor(Math.random() * 100),
                    ...newRow,
                  },
                ];
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...data];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                const updatedRows = [...data];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: 'first',
          }}
        />
      </div>
    </div>
  );
}

export default App;
