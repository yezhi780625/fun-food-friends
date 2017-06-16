import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Map} from 'immutable';
import './App.css';

const config = {
	apiKey: "AIzaSyBFfHxLapGbn-3oU6KvsSid93i6j20wwrM",
	authDomain: "myproject-a3f8f.firebaseapp.com",
	databaseURL: "https://myproject-a3f8f.firebaseio.com",
	projectId: "myproject-a3f8f",
	storageBucket: "myproject-a3f8f.appspot.com",
	messagingSenderId: "991222632654"
};

const fb = firebase.initializeApp(config);


class App extends Component {
	constructor() {
		super();
		this.state = {
			currentItem: '',
			username: '',
			items: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const itemsRef = fb.database().ref('items');
		itemsRef.on('value', (snapshot) => {
			let items = snapshot.val();
			let newState = [];
			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					user: items[item].user
				});
			}
			this.setState({
				items: newState
			});
		});
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const itemsRef = fb.database().ref('items');
		const item = {
			title: this.state.currentItem,
			user: this.state.username
		}
		itemsRef.push(item);
		this.setState({
			currentItem: '',
			username: ''
		});
	}

removeItem(item) {
  const itemRef = fb.database().ref(`/items/${item.id}`);
  console.log(item);
  const map1 = Map(item);
  console.log(map1.toJSON());
  const map2 = map1.set("deleted","true").delete("id");
  console.log(map2.toJSON());
  itemRef.set(map2.toJSON());
//   itemRef.remove();
}

	render() {
		return (
			<div className='app'>
				<header>
					<div className='wrapper'>
						<h1>Fun Food Friends</h1>

					</div>
				</header>
				<div className='container'>
					<section className="add-item">
						<form onSubmit={this.handleSubmit}>
							<input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
							<input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
							<button>Add Item</button>
						</form>
					</section>
					<section className='display-item'>
						<div className="wrapper">
							<ul>
								{this.state.items.map((item) => {
									return ( !item.deleted &&
										<li key={item.id}>
											<h3>{item.title}</h3>
											<p>brought by: {item.user}</p>
        									<button onClick={() => this.removeItem(item)}>Remove Item</button>
										</li>
									)
								})}
							</ul>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

export default App;
