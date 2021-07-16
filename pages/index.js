import { useState, useEffect } from 'react';
import { Trash2, Check, X } from 'react-feather';

export default function Home() {
	const [todo, setTodo] = useState('');
	const [todoStyles, setTodoStyles] = useState([]);
	const [allTodos, setAllTodos] = useState([]);

	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		const storedTodosParsed = JSON.parse(storedTodos);
		if (storedTodosParsed) {
			setAllTodos(storedTodosParsed);
		}

		const storedStyles = localStorage.getItem('styles');
		const storedStylesParsed = JSON.parse(storedStyles);
		if (storedStylesParsed) {
			setTodoStyles(storedStylesParsed);
		}
	}, []);

	function submitTodo() {
		setAllTodos([...allTodos, todo]);
		localStorage.setItem('todos', JSON.stringify([...allTodos, todo]));
		setTodoStyles([...todoStyles, 'unchecked']);
		localStorage.setItem(
			'styles',
			JSON.stringify([...todoStyles, 'unchecked'])
		);
	}

	function deleteTodo(index) {
		let newAllTodos = [...allTodos];
		newAllTodos.splice(index, 1);
		localStorage.setItem('todos', JSON.stringify(newAllTodos));
		setAllTodos(newAllTodos);

		let newTodoStyles = [...todoStyles];
		newTodoStyles.splice(index, 1);
		localStorage.setItem('styles', JSON.stringify(newTodoStyles));
		setTodoStyles(newTodoStyles);
	}

	function checkTodo(index) {
		let newTodoStyles = [...todoStyles];

		if (newTodoStyles[index] === 'unchecked') {
			newTodoStyles[index] = 'checked';
			localStorage.setItem('styles', JSON.stringify(newTodoStyles));
			setTodoStyles(newTodoStyles);
		} else if (newTodoStyles[index] === 'checked') {
			newTodoStyles[index] = 'unchecked';
			localStorage.setItem('styles', JSON.stringify(newTodoStyles));
			setTodoStyles(newTodoStyles);
		}
	}

	return (
		<div id="app-container">
			<div id="input-container">
				<input
					placeholder="Enter a Todo"
					onChange={(event) => {
						event.preventDefault();
						setTodo(event.target.value);
					}}
				/>
				<button onClick={submitTodo}>Enter</button>
			</div>
			<div>
				<ul>
					{allTodos.map((todo, index) => {
						return (
							<div id="todo-container">
								<li key={index} className={todoStyles[index]}>
									{todo}
									<span id="modify-todos-container">
										{todoStyles[index] === 'unchecked' ? (
											<Check
												className="check-button"
												onClick={() => checkTodo(index)}
											/>
										) : (
											<X
												className="uncheck-button"
												onClick={() => checkTodo(index)}
											/>
										)}

										<Trash2
											className="trash-button"
											onClick={() => deleteTodo(index)}
										/>
									</span>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
