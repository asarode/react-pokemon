'use strict';

import React from 'react';
import cx from 'classname';
import axios from 'axios';
import Promise from 'bluebird';
import capitalize from 'capitalize';
import empty from 'is-empty';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      image: ''
    };
  }

  componentDidMount() {
    this.fetchInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.fetchInfo();
    }
  }

  fetchInfo() {
    let base = 'http://pokeapi.co'
    let api = '/api/v1/pokemon/';
    let name = this.props.name
      ? this.props.name.toLowerCase()
      : 'bulbasaur';
    let url = base + api + name;
    axios.get(url)
      .then(res => {
        this.setState({
          pokemon: res.data
        });
        return axios.get(base + res.data.sprites[0].resource_uri);
      })
      .then(res => {
        this.setState({
          image: base + res.data.image
        });
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
        {this.pokemon}
      </div>
    );
  }

  get css() {
    return {
      card: {
        backgroundColor: '#f5f5f5',
        display: 'inline-block',
        borderRadius: '3px',
        border: '1px solid #f0f0f0'
      },
      cardHead: {
        display: 'inline-block',
        width: 100,
        backgroundColor: '#fafafa',
        borderRight: '1px solid #f0f0f0'
      },
      cardHeadImg: {
        width: '100%'
      },
      cardBody: {
        display: 'inline-block',
        width: 360,
        verticalAlign: 'top'
      },
      typeBadge: {
        display: 'inline-block',
        padding: '4px',
        color: '#fff'
      },
      typeGrass: {
        backgroundColor: '#78C850'
      },
      typePoison: {
        backgroundColor: '#A040A0'
      }
    }
  }

  get pokemon() {
    if (empty(this.state.pokemon)) {
      name = this.props.name.toLowerCase();
      return this.previewCard(name);
    }
    return this.card();
  }

  get type() {
    console.log(this.state.pokemon)
    return this.state.pokemon.types.map(type => {
      let _style = {
        ...this.css.typeBadge,
        ...this.css['type' + capitalize(type.name)]
      }
      return (
        <span style={_style}>{type.name}</span>
      );
    });
  }

  card() {
    let { pokemon, image } = this.state;
    return (
      <div style={this.css.card}>
        <div style={this.css.cardHead}>
          <img style={this.css.cardHeadImg} src={image}/>
        </div>
        <div style={this.css.cardBody}>
          <h1>{pokemon.name}</h1>
          {this.type}
        </div>
      </div>
    );
  }

  previewCard(name) {
    name = capitalize(name);
    return (
      <div>
        <div>{name}</div>
      </div>
    );
  }
}

Pokemon.PropTypes = {
  name: React.PropTypes.string
};

Pokemon.defaultProps = {
  name: ''
};

export default Pokemon;
