
function ListItem({data}){
      return(
           <>
                 {
                      data.map((list) => (
                           <h1>{list.title}</h1>
                      ))
                 }
           </>
      )
}

export {ListItem}