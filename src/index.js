import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';




// const App = (props) => {  
//   console.log('snapshot', props);
//   return (
//     <div>
//       <h1>My Prototype</h1>
//       <p>{JSON.stringify(props)}</p>
//     </div>
//   );
// }

// fb.on('value', snapshot => {  
//   const store = snapshot.val();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// });
