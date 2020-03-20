import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from './Carousel.jsx';
import Viewer from './Viewer.jsx';
//  save on our AWS bill
const sampleURLs = [
  'localhost:3000/images/0.jpeg',
  'localhost:3000/images/1.jpeg',
  'localhost:3000/images/2.jpeg',
  'localhost:3000/images/3.jpeg',
  'localhost:3000/images/4.jpeg',
];

const FlexHoriz = styled.div`
  display: flex;
`;

const server = process.env.SERVER || 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: sampleURLs,
      currentIndex: 0,
    };
    // this.fetch();
    this.fetch = this.fetch.bind(this);
  }

  async fetch() {
    const response = await axios.get(server.concat(`/images/${this.props.ID}`));
    const { state } = this;
    state.urls = response.data;
    this.setState(state);
    return response.data;
  }

  setCurrentIndexGen(i) {
    return () => {
      this.setState({ currentIndex: i });
      return i;
    };
  }

  render() {
    return (
      <FlexHoriz id='imageDisplayer'>
          <Carousel URLs={this.state.urls}
          setIndex={this.setCurrentIndexGen.bind(this)}/>
          <Viewer image={this.state.urls[this.state.currentIndex]} />
      </FlexHoriz>
    );
  }
}

App.propTypes = {
  ID: PropTypes.number,
};

export default App;
