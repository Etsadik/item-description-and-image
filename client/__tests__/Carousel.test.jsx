import { shallow, mount } from 'enzyme';
import jsdom from 'jsdom';
import React from 'react';
import Carousel from '../components/Carousel.jsx';
import App from '../components/App.jsx';

const { JSDOM } = jsdom;
global.window = (new JSDOM('')).window;
global.document = global.window.document;

const sampleURLs = [
  'localhost:3000/images/0.jpeg',
  'localhost:3000/images/1.jpeg',
  'localhost:3000/images/2.jpeg',
  'localhost:3000/images/3.jpeg',
  'localhost:3000/images/4.jpeg',
];

describe('Carousel component', () => {
  test('It should be a class component', () => {
    expect(Carousel.toString().includes('class Carousel '))
      .toBe(true);
  });

  const wrapper = shallow(<Carousel URLs={sampleURLs} setIndex={() => {}}/>);
  const urls = wrapper.instance().props.URLs;
  test('It should take an array of urls as a prop', () => {
    expect(Array.isArray(urls)).toBe(true);
    expect(urls[0].toString() === urls[0]).toBe(true);
    expect(urls[0].includes('/')).toBe(true);
    expect(urls[0].includes('.')).toBe(true);
  });

  test('It should display an image for each image url', () => {
    expect(wrapper.children()).toHaveLength(urls.length);
  });

  test('It should alter the App state when a thumbnail is clicked', () => {
    const app = mount(<App ID={1} />);
    const thumbnail = app.find(Carousel).find('img').last();
    thumbnail.simulate('click');
    expect(app.state('currentIndex')).toBe(app.state('urls').length - 1);
  });
});