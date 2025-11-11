import axios from "axios";

/*
| Name             | What it is                                     |
| ---------------- | ---------------------------------------------- |
| `axios`          | Main library                                   |
| `axios.create()` | Creates a custom axios instance                |
| `API`            | A customized axios object, not just a function |

*/

const API=axios.create({
    baseURL:"http://localhost:5000/api/v1",
});

export default API;