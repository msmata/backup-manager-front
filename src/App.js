import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { UploadImages } from './components/upload-files.component';

function App() {
  return (
    <div className="container">
      <h3>Creaciones El Marto</h3>
      <h4>A subir imagenes al raspberry</h4>
      <div className="content">
        <UploadImages />
      </div>
    </div>
  );
}

export default App;
