import './App.css';
import FileUploadForm from './FileUploadForm';
import FileView from './FileView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <FileUploadForm/>}></Route>
        <Route path="/FileView" element={ <FileView/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
