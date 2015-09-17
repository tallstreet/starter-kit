import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../index';

function setup() {
  let props = {

  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('header');
      expect(output.props.style.display).toBe('flex');

      let [img, div] = output.props.children;

      expect(img.type).toBe('img');
      expect(div.props.children[0].props.children).toBe('Tallstreet Starter Kit');

    });
  });
});
