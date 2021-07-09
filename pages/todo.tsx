
import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { Todo } from '@prisma/client';

const ADD_TODO = gql`
  mutation CreateTodo($title: String!,$description: String!) {
    createTodo(title: $title,description:$description) {
      id
      
    }
  }
`;

const TODO_LIST = gql`
  query TodoList {
    todos {
      title
    }
  }
`;


export default function TodoCreateForm() {
    const [formState, setFormState] = useState({ title: "", description: "" })
    const [createTodo] = useMutation(ADD_TODO, {
        update(cache, { data: { addTodo } }) {
            cache.reset()
          
        }
    }  );
    const { data, loading, error } = useQuery(TODO_LIST);

    if (loading) {
        return <h2>Loading...</h2>;
      }
    
      if (error) {
        console.error(error);
        return null;
    }
    
    console.log(data)
    
    return (<div>
        <h2>Todo Create</h2>
        <form onSubmit={e => {
            e.preventDefault()
            console.log(formState)
            createTodo({ variables: formState })
        }}>
            <input type="text" value={formState.title} onChange={e => setFormState({ ...formState, title: e.target.value })}/>
            <input type="text" value={formState.description} onChange={e => setFormState({ ...formState, description: e.target.value })}/>
            <input type="submit" value={"Create!"}></input>
        </form>

        <ul>
            {data.todos.map(({ title }: Todo,pos:number) => {
                return (<li key={pos}>{ title}</li>)
            })}
        </ul>
    </div>)
}