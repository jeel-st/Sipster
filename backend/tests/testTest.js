import axios from "axios"

axios.get(`http://localhost:3000/login/gamsa/JoelStink*100`)
            .then(response => {
                console.log("A suitable user has been found.")
            })
            .catch(error => {
                console.log(error);
             })