<!-- how to use mock api

1. npm i -g json-server (run this command)

2. inside src folder create api folder, inside that create db.json file (data should be in the form of object, in json format)
 {
 "activejobs":[
{}
],
}

3. npx json-server --watch src/api/db.json (run this command)

4. create Jobs.jsx file in src, in that (this below code there in website)
const [jobs,setJobs]=useState([])
const fetchjobs=async()=>{
try{
let data=await fetch("write url of first end point",{})
data.then((res)=>res.json()).then((tasks)=>setJobs(tasks))
}catch(err){
constole.log(err.name
}
}

isEffect(()=>{
fetchjobs()
return()=>{}
},[])


jobs?.activejobs.map(()=>{}))} to access the data from db.json -->

# How to Use Mock API (json-server)

- **Step 1:** Install `json-server` globally.

  ```bash
  npm i -g json-server
  ```

- **Step 2:** Inside the `src` folder, create a folder called `api`, inside that create file called `db.json`.

  - Data should be in the form of an object, following JSON format.

  Example:

  ```json
  {
    "activejobs": [
      {}
    ]
  }
  ```

- **Step 3:** Run the server.

  ```bash
  npx json-server --watch src/api/db.json 
  ```

  - After above step, in Terminal it would look like this, you would use Endpoints url in the next step
    ```bash
    Index:
    http://localhost:3000/

    Static files:
    Serving ./public directory if it exists

    Endpoints:
    http://localhost:3000/activejobs
    ```

- **Step 4:** Create a `Jobs.jsx` file inside `src/` folder.

  - In that file, use the following setup, this code available in official website:

  ```javascript
  import React, { useState, useEffect } from 'react';

  const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    const fetchjobs = async () => {
      try {
        let data = await fetch("http://localhost:3004/activejobs");
        data.then((res) => res.json()).then((tasks) => setJobs(tasks));
      } catch (err) {
        console.log(err.name);
      }
    };

    useEffect(() => {
      fetchjobs();
      return () => {};
    }, []);

    return (
      <div>
        {jobs?.map((job, index) => (
          <div key={index}>
            {/* Render job details */}
          </div>
        ))}
      </div>
    );
  };

  export default Jobs;
  ```

- **Step 5:** Access the data.

  - You can map through the `jobs` array and access the fields.

  Example:

  ```javascript
  jobs?.map((job) => {
    // Access job.Role, job.Name, job.Location, etc.
  })
  ```

---

## Notes:
- Make sure your fetch URL matches exactly like: `http://localhost:3004/activejobs`
- If you make any changes to `db.json`, you may need to restart the server.
- Check console for any errors if API call fails.

---

## How to Run Server: 
- In Terminal, while keeping the current terminal, open new terminal, click on the + icon in the bottom terminal, and then mention npm run dev
