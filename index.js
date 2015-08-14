'use strict';

import React from 'react';
import axios from 'axios';
import Promise from 'bluebird';

class PokeTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: []
    };
  }

  componentDidMount() {
    this.fetchTeamInfo();
  }

  fetchTeamInfo() {
    let base = 'http://pokeapi.co/api/v1/pokemon/';
    Promise.map(this.props.team, (name) => {
      let url = base + name;
      return this.axiosGet(url);
    })
    .then(data => {
      this.setState({
        team: data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  axiosGet(url) {
    return axios.get(url)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        return res;
      });
  }

  render() {
    let { team } = this.state;

    // let {
    //   name,
    //   item,
    //   hp,
    //   atk,
    //   spa,
    //   def,
    //   spd,
    //   spe,
    //   ability,
    //   nature,
    //   moves,
    // } = this.props;

    return (
      <div>
        <h1>My Pokemon Team</h1>
        {this.pokemonTeam}
      </div>
    );
  }

  get pokemonTeam() {
    if (this.state.team.length === 0) {
      return this.props.team.map((name, i) => {
        return this.preivewPokemon(name, i);
      });
    }
    return this.state.team.map((pokemon, i) => {
      return this.pokemon(pokemon, i);
    });
  }

  pokemon(pokemon, i) {
    return (
      <div key={i}>
        <div>{pokemon.name}</div>
      </div>
    );
  }

  preivewPokemon(name, key) {
    return (
      <div key={key}>
        <div>{name}</div>
        <div>...</div>
        <div>...</div>
      </div>
    );
  }
}

PokeTeam.PropTypes = {
  team: React.PropTypes.array
};

PokeTeam.defaultProps = {
  team: []
};

export default PokeTeam;
