import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App.jsx';

describe('App Component', () => {
  test('It should be a class component', () => {
    expect(App.toString().includes('class App '))
      .toBe(true);
  });

  const wrapper = shallow(<App ID={1} />);
  test('It should take an ID number as a prop', () => {
    expect(wrapper.instance().props.ID).toBe(1);
  });

  test('It should fetch an array of objects with urls', async () => {
    const output = await wrapper.instance().fetch();

    expect(Array.isArray(output)).toBe(true);
    expect(output[0].toString() === output[0]).toBe(true);
    expect(output[0].includes('/')).toBe(true);
    expect(output[0].includes('.')).toBe(true);
  });

  test('It should have a function generator to update currentIndex', () => {
    const setIndexToZero = wrapper.instance().setCurrentIndexGen(0);
    expect(typeof setIndexToZero).toBe('function');
    expect(setIndexToZero()).toBe(0);
  });

  test('It should toggle its state when ToggleZoomed is triggered', () => {
    expect(wrapper.state('zoomed')).toBe(false);
    wrapper.instance().toggleZoomed();
    expect(wrapper.state('zoomed')).toBe(true);
    wrapper.instance().toggleZoomed();
  });

  test('It should have functions to shift up and down', () => {
    expect(typeof wrapper.instance().shiftDown).toBe('function');
    expect(typeof wrapper.instance().shiftUp).toBe('function');
  });

  test('It should shift down if there are enough images', () => {
    if (wrapper.state('urls').length > 5) {
      const distance = wrapper.instance().shiftDown();
      expect(wrapper.state('top')).toBe(distance);
      wrapper.instance.shiftUp();
    }
  });

  test('It should shift up if there are enough images', () => {
    if (wrapper.state('urls').length > 5) {
      let distance = wrapper.instance().shiftDown();
      distance -= wrapper.instance().shiftUp();
      expect(wrapper.state('top')).toBe(distance);
    }
  });
});
