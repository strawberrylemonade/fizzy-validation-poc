import React, { useState } from 'react';
import { ValidationBoundary } from './components/ValidationBoundary';
import { ValidationProvider } from './components/ValidationProvider';
import { ValidationIndicator, useProblems } from './components/ValidationIndicator';

const App = () => {
  return (
    <ValidationProvider>
      <div className="h-screen overflow-hidden bg-cool-gray-100">
        <div className="bg-white p-5">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Fizzy Validation™<span style={{fontSize: 14, top: -9, position: 'relative', fontWeight: 'bolder'}}>™</span>
          </h2>
          <p>A bubble-up based approach to validation/error problems for complex interfaces and configuration, similar to an IDE.</p>
        </div>
        <div className="bg-white p-4 m-4">
          <p><code>ValidationProvider</code> is the top level component of this system and must be a parent component to the interface you are wanting to provide validation for. Inside the provider, the hook <code>useProblems</code> can be used to get an array of problems to display in a central location to the user.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 m-4">
          <div className="bg-white p-5" style={{height: 'fit-content'}}>
            <h2 className="text-xl font-bold leading-7 text-gray-900">Default</h2>
            This is a totally default component that has no special sauce or boundaries. It has some elements that have some validation issues and that gets bubbled to the main problem list.
            <DefaultForm></DefaultForm>
          </div>
          <ValidationBoundary name="">
            <div className="bg-white p-5" style={{height: 'fit-content'}}>
              <h2 className="text-xl font-bold leading-7 text-gray-900">Group 1</h2>
              Group 1 is a component that is wrapped in a <code>ValidationBoundary</code>, this means that in addition to it's validation issues being at the top level, any calls to <code>useProblems</code> inside a boundary will just include those created inside the boundary. This is great for summaries of smaller pieces like individual cards or forms.
              <Group1Form></Group1Form>
              <ProblemList></ProblemList>
            </div>
          </ValidationBoundary>
          <ValidationBoundary>
            <div className="bg-white p-5" style={{height: 'fit-content'}}>
              <h2 className="text-xl font-bold leading-7 text-gray-900">Group 2</h2>
              You can have as many sibling <code>ValidationBoundary</code> groups as you'd like but you cannot currently nest boundaries in boundaries. You'll notice that neither the default or Group 1's issues are included in this section's summary but all issues are included at the top level.
              <Group2Form></Group2Form>
              <ProblemList></ProblemList>
            </div>
          </ValidationBoundary>
        </div>
        <div className="bg-white w-full box-border p-5 absolute bottom-0">
          <ProblemList></ProblemList>
        </div>
      </div>
    </ValidationProvider>
  );
}

const ProblemList = () => {

  const problems = useProblems();

  return <div>
    <h3 className="text-lg font-bold leading-7 text-gray-900">Problems</h3>
    <div className="flex flex-col">
      { problems.map(problem => (
        <div key={problem.id} className="flex justify-between items-center">
          {problem.description}
          <div className="flex">
            { problem.fix ? <span className="inline-flex rounded-md shadow-sm m-1">
              <button type="button" onClick={() => problem.fix!()} className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                Fix
              </button>
            </span> : null }
            { problem.highlight ? <span className="inline-flex rounded-md shadow-sm m-1">
              <button type="button" onClick={() => problem.highlight!()} className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                Show me!
              </button>
            </span> : null }
          </div>
        </div>
      ))}
    </div>
  </div>
}

const DefaultForm = () => {

  const [number, setNumber] = useState('2');
  const [text, setText] = useState('Hello world!');
  
  return <div className="my-3">
    <div className="flex mb-3">
      <input className="form-input block flex-grow" type="number" value={number} onChange={(e) => setNumber(e.target.value)}></input>
      { number !== '3' ? <ValidationIndicator description="This number must be equal to 3, no higher, no lower." fix={() => setNumber('3')}></ValidationIndicator> : null }
    </div>
    <div className="flex">
      <input className="form-input block flex-grow" type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
      { text !== 'Hello there...' ? <ValidationIndicator description="This text must be 'Hello there...' for reasons beyond my control." fix={() => setText('Hello there...')}></ValidationIndicator> : null }
    </div>
  </div>
}

const Group1Form = () => {

  const [number, setNumber] = useState('1');

  return <div className="my-3">
    <div className="flex">
      <input className="form-input block flex-grow" type="number" value={number} onChange={(e) => setNumber(e.target.value)}></input>
      { number !== '5' ? <ValidationIndicator description="This number must be equal to 5, no higher, no lower." fix={() => setNumber('5')}></ValidationIndicator> : null }
    </div>
  </div>
}

const Group2Form = () => {

  const [number, setNumber] = useState('5');

  return <div className="my-3">
    <div className="flex">
      <input className="form-input block flex-grow" type="number" value={number} onChange={(e) => setNumber(e.target.value)}></input>
      { number !== '2' ? <ValidationIndicator description="This number must be equal to 2, no higher, no lower." fix={() => setNumber('2')}></ValidationIndicator> : null }
    </div>
  </div>
}

export default App;
