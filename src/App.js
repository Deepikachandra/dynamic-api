import './App.css';
import React from 'react';
import axios from 'axios';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      type:'',
      book:'',
      magazine:'',
      data: [],
      searchInput: ''
    };
     this.dropdownType = ["All","books","magazines"];
    this.fetchData = this.fetchData.bind(this);
  }

  extractData(items){
    let data = items.map(item => {
      return({
        title: item.volumeInfo.title,
        publisher: item.volumeInfo.publisher,
        printType: item.volumeInfo.printType
      })
    })
    return data
  }

  async fetchData(e){
    this.setState({searchInput: e})
    let fetchURL="https://www.googleapis.com/books/v1/volumes?q="+e+(this.state.type==="All" ? "" : "&printType="+this.state.type)+"&key=AIzaSyCgWnLD7riCTk4lJ4wPXSWHe8uTnFtfTv8"
    const response = await axios.get(fetchURL)
    const items = response.data.items
    const data = this.extractData(items)
    this.setState({data: data})  
  }
  
  render() {
    return (
      <div className="App">
       <AutoComplete value={this.state.searchInput} onChange={(e) => this.fetchData(e.value)} />
       <Dropdown value={this.state.type} options={this.dropdownType} onChange={(e) => this.setState({type:e.value})} placeholder="Select a type"/>
       <DataTable value={this.state.data}>
          <Column field="title" header="Title"></Column>
          <Column field="publisher" header="Publisher"></Column>
          <Column field="printType" header="PrintType"></Column>
       </DataTable>
      </div>
    );
  }
}

export default App;
