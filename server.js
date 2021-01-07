const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

let members = [
    {
        id: "1",
        name: "Ben",
        currentGames: [{
            name: "Epic seven",
            consoles: ["PC", "Mobile"]
        }],
        roles: ["Unpaid Mod", "RTA Warrior"]
    },
    {
        id: "2",
        name: "Nex",
        currentGames: [{
            name: "Epic seven",
            consoles: ["PC", "Mobile"]
        }],
        roles: ["Unpaid Mod", "RTA Warrior", "Maple Millionaire"]
    },
    {
        id: "3",
        name: "Tivrey",
        currentGames: [{
            name: "Epic seven",
            consoles: ["PC", "Mobile"]
        }],
        roles: ["RTA Warrior"]
    },
    {
        id: "4",
        name: "Derek",
        currentGames: [{
            name: "Epic seven",
            consoles: ["PC", "Mobile"]
        }],
        roles: ["Unpaid Mod", "Certified Clown"]
    },
    {
        id: "5",
        name: "Gobby",
        currentGames: [{
            name: "Epic seven",
            consoles: ["PC", "Mobile"]
        }],
        roles: ["Clown of the Year"]
    }
]
 
const typeDefs = gql`
  type Game {
      name: String!
      consoles: [String!]!
  }
  type Member {
    id: ID!
    name: String!
    currentGames: [Game!]
    roles: [String!]
  }
  input RegistrationInput {
    name: String!
  }
  type Query {
    getMembers: [Member!]!
    getMember(memberId: ID!): Member!
  }
  type Mutation {
      addMember(registrationInput: RegistrationInput): Member! 
      deleteMember(memberId: ID!): [Member!]!
  }
`;
 
const resolvers = {
  Query: {
    getMembers(){
        return members
    },
    getMember(_, {memberId}){
        const member = members.filter(member =>  member.id === memberId)[0]
        return member
    }
  },
  Mutation: {
    addMember(_, {registrationInput}, {greeting}){
        console.log(greeting)
        members.push({...registrationInput, id: (members.length + 1)})
        return members[members.length - 1]
    },
    deleteMember(_, {memberId}){
        members = members.filter(member => member.id !== memberId)
        return members
    }
  }
};
 
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: {greeting: "hi"} }
    );

 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);