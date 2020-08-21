const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, URL, techs } = request.body;
  
  const repo = {
    id: uuid(), 
    title, 
    URL, 
    techs, 
    likes: 0
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, URL, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoriesIndex < 0 ) {
    response.status(400).json({error: 'Repository not found'});
  }

  const repo = {
    id,
    title, 
    URL,
    techs,
    likes: repositories[repositoriesIndex].likes
  }

  repositories[repositoriesIndex] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoriesIndex < 0) {
    response.status(400).json({error: 'Repository not found'});
  }

  console.log(repositories[repositoriesIndex]);
  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);
   
  if(repositoriesIndex < 0) {
    response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repositoriesIndex].likes += 1;

  return response.json(repositories[repositoriesIndex]);
});

module.exports = app;
