import React from 'react'

let names=["Pedro", "Jose", "Gabriel","Pedro"];

names.map((namn)=>{
  return "Mr. "+namn;
  //above adds to the variables(REPLACES value)
  // return <h1>{namn}</h1>  //returns h1
});

names.filter((namNet)=>{
  return namNet !== "Pedro"; //excludes PedroS
})


export default function AdminPage() {
  return (
    <div>
      <p>admin</p>
      <p>admin</p>
      <button onClick={()=>{console.log('hello from anonymous function')}}>consolebutton</button>
    </div>
  );
}
