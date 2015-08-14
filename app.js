'use strict';

import React from 'react';
import PokeTeam from './index';

React.render(
  <PokeTeam team={['bulbasaur', 'squirtle', 'charmander']}/>,
  document.getElementById('root')
);