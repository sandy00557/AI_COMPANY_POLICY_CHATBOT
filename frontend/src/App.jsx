// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";

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
  function inputText() {
    setShow(true);
  }

  function inputFile() {
    setFile((prev) => !prev);
    const uploadedFiles = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(uploadedFiles));
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
      <h1>{promptText}</h1>
      {show && <>{promptText}</>}
      <input
        type="file"
        accept="application/pdf"
        disabled={file !== null}
        onChange={inputFile}
      />
      {previewUrl && <iframe src={previewUrl} width="80%" height="80%" />}
    </>
  );
}
export default App;
