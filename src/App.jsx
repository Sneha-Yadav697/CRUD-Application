import './App.css'
import Create from './Component/Create'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import List from './Component/List'
import Details from './Component/Details'
import Edit from './Component/Edit'


function App() {
  

  return (
    <div className='m-10'>

<BrowserRouter>
<Routes>
  <Route path = '/' element = {<List/>}>  </Route>
  <Route path = '/create' element = {<Create/>}>  </Route>
  <Route path = '/detail/:empid' element = {<Details/>}>  </Route>
  <Route path = '/edit/:empid' element = {<Edit/>}>  </Route>


</Routes>
</BrowserRouter>

 
     </div>
  )
}

export default App
