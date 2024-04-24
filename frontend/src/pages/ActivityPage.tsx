import axios from "axios";
import { Component, ReactNode } from "react";
import Header from "../components/Header";
import {Button} from "reactstrap";
import AddActivityForm from "./AddActivity";
import { Link } from 'react-router-dom';


class ActivityPage extends Component {
   constructor (props:any) {
    super(props);    
    this.state = {data: [], error: null};
   }
 
   

    componentDidMount(): void {
        let data;
        axios.get('http://localhost:8000/api/activity/')
        .then(res => {
            this.setState({
                data : res.data
            })
        })
        .catch(error => { 
            this.setState({ error: 'Error fetching data' });
            console.error('Error fetching data:', error);
        })
    }

    render() {
        const { data, error } = this.state;
    
        return (
          <div>
            <h1 style={{ 'font-family': 'Inter' }}>Activities</h1>
            {error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {data.map(output => (
                  <li key={output}>{output.activity_name}</li> 
                ))}
              </ul>
            )}
           <Link to="/AddActivity">Go to Add Item Page</Link> 
          </div>
          
        );
}

}
export default ActivityPage;
