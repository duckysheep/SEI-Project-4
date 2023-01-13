import TodoItem from "./Events";

export default function EventList(props) {
  return (
    <div>
      <ul>
        {props.todoList.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}
