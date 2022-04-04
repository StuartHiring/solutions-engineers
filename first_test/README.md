## Solutions Engineer's first test
Welcome! Please find my answers to the questions below:

## Questions
* Imagine that you have two classes named "Animal" and "Dog" and you want the class "Dog" to have all the properties and methods from the class "Animal", how would you do it? How is this called? What's the benefit?
    #### Class Dog extends Animal. This is called Class Inheritance. In this scenario, Animal is a parent class with generic properties and its child classes (which extends Animal Class) will be able   to use all properties of Animal class and add its own specific properties or methods. Its useful for code resuability.
  
* A call to the setTimeout() global method can block the event loop in NodeJS. Is this true or false? Why?
    #### False. setTimeout() is non-blocking. It waits for main execution to finish and executes the callback only when the control returns to the event loop. 
  
* How can you share information between components on a React application? 
    #### Using props
  
* How would you protect a REST API against potential SQL Injections?
    #### User Input validation, using ORM to manipulate DB.
  
* What does the level of coupling measure in software development?
    #### Coupling can be either tight or loose. It depends on how a change in one impacts another.
  
* What is CI? Have you used one before?
    #### Continuous Integration is useful when multiple developers work on a single project. When a developer does code commit, it is automated to build and test  immediately to isolate errors and avoid deployment issues. I have used Jenkins.
  
* How would you deploy a Node application?
    #### On Cloud (AWS, GCP), heroku 
  
* Why do we do code reviews?
    #### To minimize erros, writing consistent code, sharing new perspectives, improve optimization skills by mentorship.

* In which files would you store API tokens, passwords, or similars?
    #### .env in Node, Secret Manager or System Manager in AWS
  
* What are the benefits of using Typescript?
    #### Adding static types to JS code, highlight errors at compilation time, easier to refactor
  
* Describe with your own words a web socket?
    #### Websocket is a way to communicate betwween client and sever, where the data flows both ways. 
  
* Describe with your own words a GraphQL API.
    #### GraphQL API is a query language used by client to request only the needed data from server, with no specific endpoints.
  
* How do you keep yourself up-to-date in regards the technologies you do use?
    #### 1. Acquire basic working & understanding of the new tecnology 2. Practice starter projects 3. Learn advanced concepts by following courses or tutorials 4. Implement Complex project which uses most of its concepts
