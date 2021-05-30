import { useDispatch, useSelector } from 'react-redux';
import GridUITable from "./GridUITable";

const sizeOfTable = [10, 10];


function App() {
  // const dispatch = useDispatch();
  // const {myArr, error} = useSelector((state)=>{
  //   return state.initialReducer;
  // })
  // const handleClick = (e) =>{
  //   dispatch(myThunkCall("hullbulli"));
  // }
  return (
    <>
   <GridUITable size = {sizeOfTable}/>
       </>
  );
}


export default App;
