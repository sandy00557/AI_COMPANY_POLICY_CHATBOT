// // import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// import "./App.css";
// import { useState, useRef } from "react";

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// function App() {
//   const [promptText, setPromptText] = useState("");
//   const [show, setShow] = useState(false);
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [companyName, setCompanyName] = useState("");
//   const fileInputRef = useRef(null);
//   function inputText() {
//     setShow(true);
//   }

//   function inputFile(e) {
//     setFile((prev) => !prev);
//     /*
//     What e.target.files actually is
//     When you select a file in <input type="file" />, the browser creates a FileList object.
//     Example:
//     e.target.files

//     Might look like this (array-like):
//     FileList { 0: File, 1: File, length: 1 }

//     It’s not a plain array, but it behaves similarly: you can access each file using an index.
//     */
//     const uploadedFiles = e.target.files[0];
//     /*
//     React calls inputFile(e) and passes the event object.
//     Inside inputFile:
//     const uploadedFiles = e.target.files[0];
//     Grabs the first selected file
//     */
//     setPreviewUrl(URL.createObjectURL(uploadedFiles));
//     //it creates a temporary url for the file.

//   }

//   function removeFile() {
//     setFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef) {
//       fileInputRef.current.value = "";
//     }
//     /*
//     What happens when you set:
//     fileInputRef.current.value = "";

//     This does:
//     ✔ Removes stored file internally
//     ✔ Makes browser think no file is selected

//     So the browser goes back to showing its default message:
//     ✅ "No file chosen"

//     You are not changing text to “No file chosen”
//     The browser UI resets itself.
//     */
//   }
//   return (
//     <>
//       <input
//         id="promptInput"
//         type="text"
//         placeholder="Enter your prompt here"
//         value={promptText}
//         onChange={(e) => setPromptText(e.target.value)}
//       />
//       <button onClick={inputText}>TEXT</button>
//       <input
//         type="text"
//         id="companyInput"
//         placeholder="Enter your company name"
//         value={companyName}
//         onChange={(e) => setCompanyName(e.target.value)}
//       />
//       <h1>Company Name: {companyName}</h1>
//       <h1>{promptText}</h1>
//       {show && <>{promptText}</>}
//       <input
//         type="file"
//         accept="application/pdf"
//         disabled={file !== null}
//         onChange={inputFile}
//         ref={fileInputRef} //fileInputRef.current will hold the whole <input/>
//       />
//       {previewUrl && <iframe src={previewUrl} width="80%" height="80%" />}
//       <button onClick={removeFile}>RemoveFile</button>
//     </>
//   );
// }
// export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { useState, useRef } from "react";
import API from "./api/axios";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

function App() {
  const [promptText, setPromptText] = useState("");
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const fileInputRef = useRef(null);
  function inputText() {
    setShow(true);
  }

  function inputFile(e) {
    // setFile((prev) => !prev);
    /*
    What e.target.files actually is
    When you select a file in <input type="file" />, the browser creates a FileList object.
    Example:
    e.target.files

    Might look like this (array-like):
    FileList { 0: File, 1: File, length: 1 }

    It’s not a plain array, but it behaves similarly: you can access each file using an index.
    */
    if (!companyName.trim()) {
      alert("Please enter company name");
      return;
    }
    //why do we need the above if method? Even though someone

    const uploadedFiles = e.target.files[0];
    /*
    React calls inputFile(e) and passes the event object.
    Inside inputFile:
    const uploadedFiles = e.target.files[0];
    Grabs the first selected file
    */
    setFile(uploadedFiles);
    setPreviewUrl(URL.createObjectURL(uploadedFiles));
    //it creates a temporary url for the file.
    uploadAutomatically(uploadedFiles);
  }

  async function uploadAutomatically(uploadedFile) {
    // if (!companyName.trim()) {
    //   alert("Please enter a company name first");
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("companyName", companyName);

    try {
      const response = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      /*
      You MUST include:
      headers: { "Content-Type": "multipart/form-data" }
      Because:
      ✔ You are sending a file (not JSON)
      ✔ Browser must tell backend the request has multiple parts
      ✔ Multer can only read files from multipart requests
      ✔ Without this header, backend cannot extract the PDF
      */
      alert(`PDF processed and stored for:${companyName}`);
      console.log(response.data);
    } catch (err) {
      console.error("Upload Failed", err);
    }
  }

  function removeFile() {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef) {
      fileInputRef.current.value = "";
    }
    /*
    What happens when you set:
    fileInputRef.current.value = "";

    This does:
    ✔ Removes stored file internally
    ✔ Makes browser think no file is selected

    So the browser goes back to showing its default message:
    ✅ "No file chosen"

    You are not changing text to “No file chosen”
    The browser UI resets itself.
    */
  }
  return (
    <>
      <input
        id="promptInput"
        type="text"
        placeholder="Enter your prompt here"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
      />
      <button onClick={inputText}>TEXT</button>
      <input
        type="text"
        id="companyInput"
        placeholder="Enter your company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <h1>Company Name: {companyName}</h1>
      <h1>{promptText}</h1>
      {show && <>{promptText}</>}
      {companyName.trim().length >= 3 && (
        <input
          type="file"
          accept="application/pdf"
          disabled={file !== null}
          onChange={inputFile}
          ref={fileInputRef} //fileInputRef.current will hold the whole <input/>
        />
      )}
      {!companyName && (
        <p style={{ color: "red" }}>Please enter company name to upload pdf</p>
      )}
      {previewUrl && <iframe src={previewUrl} width="80%" height="80%" />}
      <button onClick={removeFile}>RemoveFile</button>
    </>
  );
}
export default App;
