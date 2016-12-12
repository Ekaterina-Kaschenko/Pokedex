import React, {Component} from "react";
import ReactDOM from "react-dom";
import api from './api';

import styles from '../css/styles.css';

const app = document.getElementById('app');

class PokemonItem extends Component {
  shouldComponentUpdate(newProps) {
    if (
      newProps.pokemon === this.props.pokemon &&
      newProps.className
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {pokemon, onRemove, className} = this.props;
    const {pkdx_id: id, name} = pokemon;
    return (<li className={className}>
              <img src={`http://pokeapi.co/media/img/${id}.png`} />
              {name} {~~(Math.random() * 500)}
              <div onClick={() => onRemove(id)}>[X]</div>
            </li>);
  }
}

class PokemonList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {pokemons: []};

    api.getList().then(data => this.setState({pokemons: data}));
  }

  removePokemon = (id) => {
    const currentPokemons = this.state.pokemons;
    const filteredPokemons = currentPokemons.filter(p => p.pkdx !== id);

    this.setState({pokemons: filteredPokemons});
  }

  render() {
    return (
      <ul>
        {this.state.pokemons.map((p, idx) =>
          <PokemonItem
            key={p.pkdx_id}
            pokemon={p}
            onRemove={this.removePokemon}
            className={idx % 2 === 0 ? styles.odd : styles.even}
          />)}
        </ul>
      );
  }
}

ReactDOM.render(<PokemonList />, app);
