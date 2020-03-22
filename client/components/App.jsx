import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from './Carousel.jsx';
import Viewer from './Viewer.jsx';
import ZoomModal from './ZoomModal.jsx';
//  save on our AWS bill
const sampleURLs = [
  'localhost:3000/images/0.jpeg',
  'localhost:3000/images/1.jpeg',
  'localhost:3000/images/2.jpeg',
  'localhost:3000/images/3.jpeg',
  'localhost:3000/images/4.jpeg',
  'localhost:3000/images/5.jpeg',
  'localhost:3000/images/6.jpeg',
  'localhost:3000/images/7.jpeg',
];

const FlexHoriz = styled.div`
  display: flex;
`;

const server = process.env.SERVER || 'http://localhost:3000';
const numImages = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: sampleURLs,
      currentIndex: 0,
      zoomed: false,
      top: 0,
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

  toggleZoomed() {
    const newState = this.state;
    newState.zoomed = !newState.zoomed;
    this.setState(newState);
  }

  setCurrentIndexGen(i) {
    return () => {
      this.setState({ currentIndex: i });
      return i;
    };
  }

  shiftDown() {
    let index = this.state.top;
    const distance = index + numImages >= this.state.urls.length
      ? this.state.urls.length - 1 - index
      : numImages;
    index += distance;
    this.setState({ top: index });
    return distance;
  }

  shiftUp() {
    let index = this.state.top;
    const distance = index - numImages <= 0
      ? index
      : index - numImages;
    index -= distance;
    this.setState({ top: index });
    return distance;
  }

  render() {
    let zoomModal;
    if (this.state.zoomed) {
      zoomModal = (
        <ZoomModal toggle={this.toggleZoomed.bind(this)}
        URLs = {this.state.urls}
        setIndex={this.setCurrentIndexGen.bind(this)}
        current={this.state.currentIndex}
        top={this.state.top}
        />
      );
    }

    return (
      <FlexHoriz id='imageDisplayer'>
          <Carousel
            URLs={this.state.urls}
            setIndex={this.setCurrentIndexGen.bind(this)}
            top={this.state.top}
            shiftUp={this.shiftUp.bind(this)}
            shiftDown={this.shiftDown.bind(this)}
          />
          <Viewer image={this.state.urls[this.state.currentIndex]}
            toggle={this.toggleZoomed.bind(this)}
           />
          {zoomModal}
      </FlexHoriz>
    );
  }
}

App.propTypes = {
  ID: PropTypes.number,
};

export default App;
