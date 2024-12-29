import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

console.log('This is working, environment variable: ', process.env.VAR_FOR_TEST);

//axios
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });