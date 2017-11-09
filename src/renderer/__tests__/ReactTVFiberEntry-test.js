import React from 'react';
import ReactTVRenderer from '../ReactTVFiberEntry';

const render = ReactTVRenderer.render;

describe('render', () => {
  it('should transform props into attribute', () => {
    const root = document.createElement('div');
    const ReactElement = <div attr={'custom'}>cowboy bebop</div>;

    const expectedElement = document.createElement('div');
    expectedElement.setAttribute('attr', 'custom');
    expectedElement.textContent = 'cowboy bebop';

    expect(render(ReactElement, root)).toEqual(expectedElement);
  });

  it('should transform onClick into onclick attribute', () => {
    function fn() {
      console.log('hatake kakashi...');
    }

    const textNode = 'uzumaki naruto!';
    const root = document.createElement('div');

    const expectedElement = document.createElement('div');
    expectedElement.setAttribute('onclick', fn);
    expectedElement.textContent = textNode;

    expect(render(<div onClick={fn}>{textNode}</div>, root)).toEqual(expectedElement);
  });

  it('should render with the default toJSON behavior', () => {
    const myIncremental = 'it\'s base';
    const Base = () => <div id={'base'}></div>;
    const Page1 = () => <div class={'page-1'}></div>;
    const Page2 = () => <div class={'page-2'}></div>;

    // helper for <Route path={path} component={component}>{children}</Route>
    const Route = (path, component, children) =>
      React.createElement(
        'Route',
        {path: path, component: component, key: path},
        children
      );

    const root = document.createElement('div');
    const element = render(
      Route('/', Base, [
        Route('/page/1', Page1),
        Route('/page/2', Page2)
      ]), root
    );

    const RouteElement = document.createElement('Route');
    RouteElement.setAttribute('path', '/');
    RouteElement.setAttribute('component', Base);

    const Page1Element = document.createElement('route');
    Page1Element.setAttribute('path', '/page/1');
    Page1Element.setAttribute('component', Page1);

    const Page2Element = document.createElement('route');
    Page2Element.setAttribute('path', '/page/2');
    Page2Element.setAttribute('component', Page2);

    RouteElement.appendChild(Page1Element);
    RouteElement.appendChild(Page2Element);

    expect(element).toEqual(RouteElement);
  });
});