<h1>Fizzy Validation™<span style="font-size: 14px; position: relative; top: -17px; font-weight: bolder;">™</span></h1>
A bubble-up based approach to validation/error problems for complex interfaces and configuration, similar to an IDE.

### Demo
A version of this proof of concept is hosted [here](https://fizzy-validation-poc.netlify.app).

### Build & Run
To run this locally and explore the code, please clone the repo and run `npm start`.

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

---
## Details
`ValidationProvider` is the top level component of this system and must be a parent component to the interface you are wanting to provide validation for. Inside the provider, the hook `useProblems` can be used to get an array of problems to display in a central location to the user.

```javascript
const App = () => {
  <ValidationProvider>
    <Form></Form> // ValidationIndicator is used inside the form.
    <ProblemList></ProblemList>
  </ValidationProvider>
}

const ProblemList = () => {

  const problems = useProblems();

  return <div>
    { problems.map(problem => (
      <div>{ problem.description }</div>
    ))}
  </div>
}
```