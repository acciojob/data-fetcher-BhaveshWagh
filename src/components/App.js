import React, { useState, useEffect } from "react";
import axios from "axios";
import 'regenerator-runtime/runtime';

const App = () => {
  const [output, setOutput] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = "https://dummyjson.com/products";
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        if (response.data && response.data.products && response.data.products.length > 0) {
          setOutput(response.data.products);
        } else {
          setOutput(null);  // Handle case where data is empty
        }
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      } finally {
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
      ) : output ? (
        <div>
          <h1>Data Fetched from API</h1>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      ) : (
        <p>No data found</p>  // Display this if output is null or empty
      )}
    </div>
  );
};

export default App;
