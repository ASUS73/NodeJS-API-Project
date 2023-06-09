const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
	{id: 1, name: "courses1"},
	{id: 2, name: "courses2"},
	{id: 3, name: "courses3"},
];

app.get("/", (req,res) => {
	res.send("Hello world!!!");
});

app.get("/api/courses", (req,res) => {
	res.send(courses);
});

app.post("/api/courses", (req,res) => {
	const {error} = validateCourse(req.body);

	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const course = {
		id: courses3.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

app.put("/api/courses/:id", (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The courses with the given ID wasn't found");
		return;
	}
	// Validate
	// If valid, return 400 - bad requests
	
	const {error} = validateCourse(req.body);

	if(error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	course.name = req.body.name;
	res.send(course);
});

app.delete("/api/courses/:id", (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The courses with the given ID wasn't found");
		return;
	}
	
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}

app.get("/api/courses/:id", (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));

	if (!course) {
		res.status(404).send("The courses with the given ID was not found");
		return;
	}
	
	res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at http://127.0.0.1:${port}`));