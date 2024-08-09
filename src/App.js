import logo from './assets/logo.png'
import QueyBar from "./components/QueyBar";
import Card from "./components/Card";

function App() {
  return (
    <div className="container">
        <div className="text-center">
            <img src={logo} alt="Logo" className="img-fluid"/>
        </div>
        <QueyBar/>
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  );
}

export default App;
