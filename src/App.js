import React from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {SUBMIT_FORM} from './actionCreators/actionTypes';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'react-bootstrap'

const Department = {}
Department['cs']={
  id:1,
  avg_cgpa:8,
  avg_salary:5,
  status_mind:'Empty',
}

Department['me']={
  id:2,
  avg_cgpa:6,
  avg_salary:8,
  status_mind:'Unused',
}


const Students_list = [
  {
      "id": 1,
      "name": "Amit",
      "Number": 14,
      "status": true
  },
  {
      "id": 2,
      "name": "Ravindra",
      "Number": 7,
      "status": true
  },
  {
      "id": 3,
      "name": "Deepak",
      "Number": 30,
      "status": true
  },
  {
      "id": 4,
      "name": "Rajneesh",
      "Number": 0,
      "status": false
  },
  {
      "id": 3,
      "name": "Anubhav",
      "Number": 4,
      "status": false
  }
]

const mapStateToProps = (state) => {
	return {
      email : state.Info.email,
      mobile : state.Info.mobile,
      first_name : state.Info.first_name,
      last_name : state.Info.last_name,
      radio : state.Info.radio,
      checked: state.Info.checked,
      // email : state.email,
      // mobile : state.mobile,
      // first_name : state.first_name,
      // last_name : state.last_name,
	}
}

const mapDispatchToProps = (dispatch) => ({
  onFillupFields: (key, value) => {dispatch ({type: SUBMIT_FORM, key, value})},
})



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      visiblity : true,
      name: this.props.first_name,
      mobile: this.props.mobile,
    }
    this.handleChange = this.handleChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  submit = (payload) => {
    fetch('http://127.0.0.1:8000/api/trial/post/', {
      method: 'POST',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      body: JSON.stringify(payload)
    })
    .then(function (response) {
      console.log(response);
    })
    .then(function(response) {
      return response.json();
    })
  }

  onClick = event =>{
    console.log('clicked checkboxes',event.target.value)
    this.props.checked.push(event.target.value)
    console.log(this.props.checked)
  }
  
  handleChange = event => {
    console.log(event.target.value)
    console.log(this.props.first_name)
    this.setState({
        email : event.target.value,
      })
  }
  
  handleChange1 = event => {
    console.log(event.target.value)
    this.setState({
        mobile : event.target.value,
      })
  }

  componentDidUpdate() {
    console.log('here')

  }

  render() {
    // console.log(Department.cs)
    // console.log(Object.keys(Department))
    // console.log(this.props)

    // let depts = {}
    let depts_names = Object.keys(Department)
    let depts = Object.values(Department).forEach(item => {
      return (
        <h1>
          {item}
        </h1>
      )
    })
    console.log(depts_names)
    let arrayToObject = JSON.stringify(Object.assign({}, depts_names))
    console.log(arrayToObject)

    let dept_names = depts_names.map(items => {
      return(
        <div>
          <Input
            type="radio"
            label="third radio"
            value={items}
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
            onChange={event => this.props.onFillupFields('radio',event.target.value)}
          />
          <span>{items}</span>
        </div>
      )
    })

    var jobList = Students_list.filter(function(item) {
      if(item.status === true){
        return (item)
      }
    });

    let jobList_names = jobList.map(item=>{
      return(
        item.name
      )
    });

    console.log(jobList_names)

    let jobList_names_checkboxes = jobList_names.map(items => {
      return(
        <div>
          <Input
            type="checkbox"
            value={items}
            onClick={this.onClick}
          />
          <span>{items}</span>
        </div>
      )
    })

    let payload = {};
    payload['name']=this.props.first_name;
    payload['email']=this.props.email;
    payload['mobile']=this.props.mobile;
    payload['radio']=this.props.radio;
    payload['names_students']=this.props.checked;

    return (
      <div>
        <div class='mainDiv'>
          <h1 className='h1Class'>Trial Project</h1>
        </div>
        <div class='firstDiv'>
          <Form className='formClass'>
            <FormGroup className='InputBox'>
              <Label for="exampleEmail">Email</Label>
              {/* <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"  onChange = {event => this.handleChange(event)} onBlur={event => this.props.onFillupFields('email',event.target.value)}/> */}
              <Input type="email" name="email" id="exampleEmail" onBlur={event => this.props.onFillupFields('email',event.target.value) }/>
            </FormGroup>
            <FormGroup className='InputBox'>
              <Label for="Mobile">Mobile</Label>
              {/* <Input type="mobile" name="mobile" id="mobile" placeholder="with a placeholder"  onChange = {event => this.handleChange1(event)} onBlur={event => this.props.onFillupFields('mobile',event.target.value)}/> */}
              <Input type="mobile" name="number" id="mobile" onBlur={event => this.props.onFillupFields('mobile',event.target.value)}/>
            </FormGroup>
              <FormGroup >
                  <Input
                    type="radio"
                    label="first radio"
                    value="first radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={event => this.props.onFillupFields('radio',event.target.value)}
                  />
                  <span>First Radio</span>
                  <br/>
                  <Input
                    type="radio"
                    label="second radio"
                    value="second radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onChange={event => this.props.onFillupFields('radio',event.target.value)}
                  />
                  <span>Second Radio</span>
                  <br/>
                  <Input
                    type="radio"
                    label="third radio"
                    value="third radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onChange={event => this.props.onFillupFields('radio',event.target.value)}
                  />
                  <span>Third Radio</span>
                  <br/>

                  {dept_names}

                  {depts}
                  
                  <br/>

                  
                  <Input
                    type="checkbox"
                    value="First Checkbox"
                    onClick={this.onClick}
                  />

                  <span>First Checkbox</span>
                  <br/>
                  <Input
                    type="checkbox"
                    value="Second Checkbox"
                    onClick={this.onClick}
                  />
                  <span>Second Checkbox</span>
                  <br/>
                  <Input
                    type="checkbox"
                    value="Third Checkbox"
                    onClick={this.onClick}
                  />
                  <span>Third Checkbox</span>
                  <br/>
                  {jobList_names_checkboxes}
              </FormGroup>
              <br/>

            <Button class="btn btn-outline-primary" onClick={() => this.submit(payload)} >Submit</Button>
          </Form>
        </div>
        
      </div>
    )  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
// export default App;
