import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import img from "../asset/imgs/test.jpg"
class App extends Component{
     render(){
         return(
            <div>
                index.html
                <img id="outputpath" src={img}/>
                {/* <img id="outputpath" src="../asset/imgs/test.jpg"/> */}
            </div>
         )
     }
}

ReactDOM.render(<App/>,document.getElementById("root"))


