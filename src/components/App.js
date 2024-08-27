import React, { useState, useEffect } from "react";
import axios from "axios";
import 'regenerator-runtime/runtime';

const App = () => {
  const [output, setOutput] = useState();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = "https://dummyjson.com/products";
    const fetchData =  async () => {
      try {
        const response = await axios(api);
        setOutput(response.data);
        setFetching(false);
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
        setFetching(false);
    }
    };
    fetchData();
  }, []);

  return (
    <div>
      <u>Output : </u>
      {fetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Data Fetched from API</h1>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;