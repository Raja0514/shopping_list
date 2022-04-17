import React, { Component } from "react";
import './Shopping.css'
class Shopping1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewMarbleName: "",
      ListofMarble: [
        { name: "Indian Marble", id: "item-1", purchasecompleted: false },
        { name: "Chinnese Marble", id: "item-2", purchasecompleted: false },
        { name: "Spain Marble",id: "item-3",purchasecompleted: false,},
        { name: "Turkey Marble", id: "item-4", purchasecompleted: false },
        { name: "Brazilian Marble", id: "item-5", purchasecompleted: false },
      ],
      NumberofPurchaseMarble: 5,
      ValidationErrors:'',
    };    
  }
handleOnChange = (e) => {
    const target = e.target;
    console.log(target);
    const name = e.target.name;
    console.log(name);
    const value = e.target.value;
    console.log(value);
    this.setState({
      [name]: value,
    });
  };
handleCompletedToggle=(e)=>{
  const target=e.target
  //console.log(target.checked)
  const index1=e.target.attributes.itemindex.value
  // console.log(index1)
  //console.log(typeof(index1))
   const index2=parseInt(index1,10)
  //console.log(typeof(index2))
  const newchecklist=[...this.state.ListofMarble]
  newchecklist[index2].purchasecompleted=target.checked;
  this.setState({ListofMarble:newchecklist})
}
handleSubmit = (e) => {
    e.preventDefault();
    const Formvalid=this.InputValidation();
    console.log(Formvalid)
    if(Formvalid){
    const NewMarble = {name: this.state.NewMarbleName,purchasecompleted: false};
    this.setState(() => {
      return {
        NumberofPurchaseMarble:this.state.NumberofPurchaseMarble+1,
        ListofMarble: [...this.state.ListofMarble, NewMarble],
        NewMarbleName: "",
      };
    });
  }
  };
InputValidation=()=>{
  const NewMarbleName1=this.state.NewMarbleName
  const errors={};
  if(!NewMarbleName1){
    errors['NewMarbleName']='Please Enter Marble Name';
    this.setState({
      ValidationErrors:errors
    })
  }
  return Object.keys(errors).length === 0;
}
handleDelete=(e)=>{
const target=e.target;
console.log(target)
const itemIndexvalue=target.attributes.itemindex.value
console.log(itemIndexvalue)
console.log(typeof(itemIndexvalue))
const index=parseInt(itemIndexvalue,10)
console.log(typeof(index))
const newlistmarble=[...this.state.ListofMarble]
newlistmarble.splice(index,1)
this.setState({ListofMarble:newlistmarble,NumberofPurchaseMarble:this.state.NumberofPurchaseMarble-1})
}
render() {
  const { NewMarbleName: error } = this.state.ValidationErrors;
    return (
      <React.Fragment>
        <section>
        <h3>Italy-Marmomac 2022 Exhibitions Marble Sample Purchasing List</h3>
        {!this.state.ListofMarble.length&& <p>No Marble !</p>}
        <ul>
          {this.state.ListofMarble.map((item,index) => {
            return (
              <li key={item.id}>
                <label>
                <input type="checkbox"
                checked={item.purchasecompleted}
                onChange={this.handleCompletedToggle}
                itemindex={index}></input></label>
                <span>{item.name}</span>
                <button itemindex={index} onClick={this.handleDelete}>Remove</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span className="error">{error}</span>
            <input
              type="text"
              name="NewMarbleName"
              placeholder="Enter New Marble Name "
              value={this.state.NewMarbleName}
              onChange={this.handleOnChange}
            ></input>
          </label>
          <button type="submit">Add</button>
          <p>Number of Purchase Marble: {this.state.NumberofPurchaseMarble}</p>
        </form>
        </section>
      </React.Fragment>
    );
  }
}
export default Shopping1;
