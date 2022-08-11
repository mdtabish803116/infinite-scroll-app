import React from "react";
import {ListItem} from "./listItem"

function Lists(){
      const [title , setTitle] = React.useState("");
      const [lists , setLists] = React.useState([]);
      const [page , setPage] = React.useState(1);

      function getMoreList(){
          fetch(`http://localhost:8080/Lists?_page=${page}&_limit=25`)
          .then((res) => res.json())
          .then((res) => {
              console.log(res);
              setLists(res);
          }).catch((err) => {
               console.log(err)
          })
      }

      function handleScroll(){
        let listContainer = document.getElementById("listContainer")
           console.log("scrollTop" , listContainer.scrollTop)
           console.log("windowInnerHeight" , listContainer.clientHeight)
           console.log("scrollHeight" , listContainer.scrollHeight);

           if(listContainer.clientHeight + listContainer.scrollTop >=  listContainer.scrollHeight){
                 console.log("Reached to Bottom")
           }
        
      }

      React.useEffect(()=> {
          getMoreList();
          let listContainer = document.getElementById("listContainer")
           console.log(listContainer)
          listContainer.addEventListener("scroll" ,handleScroll)
      }, [page])

        function addList(){
            let listObj = {
                  title : title,
                  status : false
            }

            fetch("http://localhost:8080/Lists" , {
                 method : "POST",
                 body : JSON.stringify(listObj),
                 headers : {
                      "Content-Type": "application/json"
                 }
            }).then((res) => res.json())
              .then((res) => {
                  console.log(res);
              }).catch((err) => {
                   console.log(err);
              })
        }
      return(
          <>
          <div style = {{"width" : "40%" , "margin" : "auto" , "textAlign" : "center" , "marginTop" : "50px" , "height" : "50px"}}>
                 <input style = {{"height" : "86%" , "width" : "70%" , "paddingLeft" : "10px"}} type = "text" placeholder = "Add your list here" onChange = {(e) => setTitle(e.target.value)}/>
                 <button style = {{"height" : "95%"}} onClick = {addList}>Add List</button>
          </div>
             <div id = "listContainer" style = {{  "overflow" : "scroll" ,  "border" : "1px solid red","height" : "500px" , "width" : "40%" , "margin" : "auto" , "textAlign" : "center" , "marginTop" : "20px"}}>
               <ListItem  data = {lists}/>
              </div>
          </>
      )
}

export {Lists}