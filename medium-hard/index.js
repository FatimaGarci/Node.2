//const Joi = require('joi/lib');
const express = require('express');
const app = express();
const data = require('./public/employees.json');

app.use(express.json());
//POST METHOD
app.post('/employees', (req, res) => {
    //const { error } = validateGenre(req.body); 
    //if (error) return res.status(400).send(error.details[0].message);
  
    const employee = {
      id: data.employees.length + 1,
      name: req.body.name
    };
    data.employees.push(employee);
    res.send(employee);
  });


//GET METHOD
app.get('/employees', (req, res) => {
    if (!data){
        res.status(404).send(`Couldnt find the employees`);
    }
    res.send(data);
});


app.get('/employees/:id', (req, res) => {
    const employeeData = data.employees.find( (employee) => {
        return parseInt(req.params.id) === employee.id
    });
    if (!employeeData) {
        res.status(404).send(`Couldn't find the employee id`)
    }
    res.send(employeeData);
});

//PUT METHOD
app.put('/employees/:id', (req, res) => {
    const employee = data.employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The employee  with the given ID was not found.');
  
    //validation
    const schema ={
        name: Joi.string().required()
    };

    const result = Joi.validate(req.body, schema);
    employee.name = req.body.name; 
    res.send(employee);
  });
  

  //DELET METHOD
  app.delete('/employees/:id', (req, res) => {
      //Look up the course
      const employee = data.employees.find(c => c.id === parseInt(req.params.id));
    //Not existing, return 404
    if (!employee) return res.status(404).send('The employee with the given ID was not found.');

  //Delete part
    const index = data.employees.indexOf(employee);
    data.employees.splice(index, 1);


  //Response
    res.send(employee);
  });


  //LISENT TO GET THE ROUT
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`)); 