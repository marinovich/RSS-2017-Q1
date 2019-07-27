var $children, $wrapper, _, callback, chai, children, doc, fs, html, multipleClassNames, nodeToAppend, pathToSolution, prepareDOM, should, singleClassName, sinon, sinonChai, tagName, text, wrapper;

fs = require('fs');
_ = require('lodash');
chai = require('chai');
sinon = require('sinon');
sinonChai = require('sinon-chai');
should = chai.should();
chai.use(sinonChai);
$wrapper = null;
wrapper = null;
(require('./polyfills/classList.js'))(window);
require('./polyfills/dataset.js');
require('./jquery.js');
wrapper = null;
$wrapper = null;
children = null;
$children = null;
nodeToAppend = null;
singleClassName = 'foo';
multipleClassNames = 'foo bar';
callback = function (index, className) {
            return index % 2 ? 'foo bar' : 'foo'
      };

text = 'some text';

tagName = 'p';

html = "<" + tagName + ">" + text + "</" + tagName + ">";

prepareDOM = function() {
  var child, i, j;
  wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  for (i = j = 0; j <= 9; i = ++j) {
    child = document.createElement('div');
    child.classList.add('child');
    wrapper.appendChild(child);
  }
  document.body.innerHTML = '';
  document.body.appendChild(wrapper);
  $wrapper = $('.wrapper');
  children = wrapper.children;
  $children = $('.child');
  nodeToAppend = document.createElement(tagName);
  return nodeToAppend.innerHTML = text;
};

beforeEach(prepareDOM);

describe('#addClass', function() {
  describe("$('.wrapper').addClass('" + singleClassName + "')", function() {
    return it("should add class " + singleClassName + " to wrapper", function() {
      $wrapper.addClass("" + singleClassName);
      return wrapper.classList.contains("" + singleClassName).should.equal(true);
    });
  });
  describe("$('.wrapper').addClass('" + multipleClassNames + "')", function() {
    return it("should add both " + (multipleClassNames.split(' ').join(' and ')) + " classes to wrapper", function() {
      $wrapper.addClass('foo bar');
      wrapper.classList.contains('foo').should.equal(true);
      return wrapper.classList.contains('bar').should.equal(true);
    });
  });
  describe("$('.wrapper').addClass(" + callback + ")", function() {
    it('should pass to callback index and classname of node', function() {
      var spy;
      spy = sinon.spy();
      $wrapper.addClass(spy);
      return spy.should.have.been.calledWith(0, 'wrapper');
    });
    return it("should add class 'foo' to wrapper", function() {
      $wrapper.addClass(callback);
      return wrapper.classList.contains('foo').should.eql(true);
    });
  });
  describe("$('.child').addClass('" + singleClassName + "')", function() {
    return it("should add class " + singleClassName + " to each of children", function() {
      var child, j, len, results;
      $children.addClass("" + singleClassName);
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        results.push(child.classList.contains("" + singleClassName).should.equal(true));
      }
      return results;
    });
  });
  describe("$('.child').addClass('" + multipleClassNames + "')", function() {
    return it("should add both " + (multipleClassNames.split(' ').join(' and ')) + " classes to each of children", function() {
      var child, j, len, results;
      $children.addClass('foo bar');
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.classList.contains('foo').should.equal(true);
        results.push(child.classList.contains('bar').should.equal(true));
      }
      return results;
    });
  });
  return describe("$('.child').addClass(" + callback + ")", function() {
    it('should pass to callback indices and classname of each children', function() {
      var child, index, j, len, results, spy, spyCall;
      spy = sinon.spy(callback);
      $children.addClass(spy);
      index = 0;
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        spyCall = spy.getCall(index);
        spyCall.should.have.been.calledWith(index, 'child');
        results.push(index++);
      }
      return results;
    });
    return it("should add class 'foo' to odd nodes and both 'foo' and 'bar' to even", function() {
      var child, index, j, len, results;
      $children.addClass(callback);
      index = 0;
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.classList.contains('foo').should.eql(true);
        if (index % 2 !== 0) {
          results.push(child.classList.contains('bar').should.eql(true));
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  });
});

describe('#append', function() {
  describe("$('.wrapper').append(" + html + ")", function() {
    return it("should append " + html + " to wrapper", function() {
      var lastChild, ref;
      $wrapper.append(html);
      ref = wrapper.children, lastChild = ref[ref.length - 1];
      lastChild.tagName.toLowerCase().should.eql(tagName);
      return lastChild.innerHTML.should.eql(text);
    });
  });
  describe("$('.wrapper').append(node)", function() {
    return it("should append node to wrapper", function() {
      var lastChild, ref;
      $wrapper.append(nodeToAppend);
      ref = wrapper.children, lastChild = ref[ref.length - 1];
      lastChild.tagName.toLowerCase().should.eql(tagName);
      return lastChild.innerHTML.should.eql(text);
    });
  });
  describe("$('.child').append(" + html + ")", function() {
    return it("should append " + html + " to each child", function() {
      var child, j, lastChild, len, ref, results;
      $children.append(html);
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        ref = child.children, lastChild = ref[ref.length - 1];
        lastChild.tagName.toLowerCase().should.eql(tagName);
        results.push(lastChild.innerHTML.should.eql(text));
      }
      return results;
    });
  });
  return describe("$('.child').append(node)", function() {
    return it("should append node to each child", function() {
      var child, j, lastChild, len, ref, results;
      $children.append(nodeToAppend);
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        ref = child.children, lastChild = ref[ref.length - 1];
        lastChild.tagName.toLowerCase().should.eql(tagName);
        results.push(lastChild.innerHTML.should.eql(text));
      }
      return results;
    });
  });
});

describe('#html', function() {
  describe("$('.wrapper').html()", function() {
    return it("should return innerHTML of wrapper", function() {
      return $wrapper.html().should.eql(wrapper.innerHTML);
    });
  });
  describe("$('.wrapper').html(" + html + ")", function() {
    return it("should set innerHTML of wrapper to " + html, function() {
      $wrapper.html(html);
      return wrapper.innerHTML.should.eql(html);
    });
  });
  describe("$('.child').html()", function() {
    return it("should return html of first matched element", function() {
      html = '<p>some html</p>';
      children[0].innerHTML = html;
      return $children.html().should.eql(html);
    });
  });
  return describe("$('.child').html(" + html + ")", function() {
    return it("should set innerHTML of each selected node to " + html, function() {
      var child, j, len, results;
      $children.html(html);
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        results.push(child.innerHTML.should.eql(html));
      }
      return results;
    });
  });
});

describe('#attr', function() {
  describe("$('.wrapper').attr('class')", function() {
    return it("should return 'wrapper'", function() {
      return $wrapper.attr('class').should.eql('wrapper');
    });
  });
  describe("$('.wrapper').attr('name', 'my-name')", function() {
    return it("should set attribute name of wrapper to 'my-name'", function() {
      $wrapper.attr('name', 'my-name');
      return wrapper.getAttribute('name').should.eql('my-name');
    });
  });
  describe("$('.child').attr('class')", function() {
    return it("should return class of first node", function() {
      children[0].classList.add('foo');
      return $children.attr('class').should.eql('child foo');
    });
  });
  return describe("$('.child').attr('name', 'my-name')", function() {
    return it("should set attribute name of each node to 'my-name'", function() {
      var child, j, len, results;
      $children.attr('name', 'my-name');
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        results.push(child.getAttribute('name').should.eql('my-name'));
      }
      return results;
    });
  });
});

describe('#children', function() {
  describe("$('.wrapper').children()", function() {
    return it('should return collection of children of wrapper', function() {
      var child, index, j, len, results;
      $children = $wrapper.children();
      index = 0;
      results = [];
      for (j = 0, len = $children.length; j < len; j++) {
        child = $children[j];
        child.should.eql(children[index]);
        results.push(index++);
      }
      return results;
    });
  });
  describe("$('.wrapper').children('.foo')", function() {
    return it("should return all children containing class 'foo'", function() {
      var _children, child, i, index, j, k, len, results;
      for (i = j = 0; j <= 4; i = ++j) {
        children[i * 2].classList.add('foo');
      }
      _children = $wrapper.children('.foo');
      _children.length.should.eql(5);
      children = document.querySelectorAll('.foo');
      index = 0;
      results = [];
      for (k = 0, len = _children.length; k < len; k++) {
        child = _children[k];
        child.should.eql(children[index]);
        results.push(index++);
      }
      return results;
    });
  });
  return describe("$('.child').children()", function() {
    return it('should return collection of children of first matched node', function() {
      var __children, _children, child, i, index, j, len, results;
      __children = (function() {
        var j, results;
        results = [];
        for (i = j = 0; j <= 9; i = ++j) {
          child = document.createElement('div');
          children[0].appendChild(child);
          results.push(child);
        }
        return results;
      })();
      _children = $children.children();
      index = 0;
      results = [];
      for (j = 0, len = _children.length; j < len; j++) {
        child = _children[j];
        child.should.eql(__children[index]);
        results.push(index++);
      }
      return results;
    });
  });
});

describe('#css', function() {
  describe("$('.wrapper').css('color')", function() {
    return it('should return inline color style of wrapper', function() {
      wrapper.style.color = 'red';
      return $wrapper.css('color').should.eql('red');
    });
  });
  describe("$('.wrapper').css({color: 'red'})", function() {
    return it('should set inline color style', function() {
      $wrapper.css({
        color: 'red'
      });
      return wrapper.style.color.should.eql('red');
    });
  });
  describe("$('.child').css('color')", function() {
    return it('should return inline color style of first matched element', function() {
      children[0].style.color = 'red';
      return $children.css('color').should.eql('red');
    });
  });
  return describe("$('.child').css({color: 'red'})", function() {
    return it('should set inline color style of each matched element', function() {
      var child, j, len, results;
      $children.css({
        color: 'red'
      });
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        results.push(child.style.color.should.eql('red'));
      }
      return results;
    });
  });
});

describe('#data', function() {
  describe("$('.wrapper').data()", function() {
    return it('should return data with all data attributes', function() {
      wrapper.dataset.a = 1;
      wrapper.dataset.b = 2;
      return $wrapper.data().should.eql({
        a: 1,
        b: 2
      });
    });
  });
  describe("$('.wrapper').data('foo')", function() {
    return it('should return value of data-foo attribute', function() {
      wrapper.dataset.foo = 1;
      return $wrapper.data('foo').should.eql(1);
    });
  });
  describe("$('.wrapper').data('foo', 1)", function() {
    return it('should set data-foo to 1', function() {
      $wrapper.data('foo', 1);
      return wrapper.dataset.foo.should.eql(1);
    });
  });
  describe("$('.wrapper').data({foo: 1, bar: 2})", function() {
    return it('should set data-foo to 1 and data-bar to 2', function() {
      $wrapper.data({
        foo: 1,
        bar: 2
      });
      wrapper.dataset.foo.should.eql(1);
      return wrapper.dataset.bar.should.eql(2);
    });
  });
  describe("$('.child').data('foo')", function() {
    return it('should return value of data-foo attribute of first child', function() {
      children[0].dataset.foo = 1;
      return $children.data('foo').should.eql(1);
    });
  });
  describe("$('.child').data('foo', 1)", function() {
    return it('should set data-foo to 1 of all children', function() {
      var child, j, len, results;
      $children.data('foo', 1);
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        results.push(child.dataset.foo.should.eql(1));
      }
      return results;
    });
  });
  return describe("$('.child').data({foo: 1, bar: 2})", function() {
    return it('should set data-foo to 1 and data-bar to 2 of all children', function() {
      var child, j, len, results;
      $children.data({
        foo: 1,
        bar: 2
      });
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.dataset.foo.should.eql(1);
        results.push(child.dataset.bar.should.eql(2));
      }
      return results;
    });
  });
});

describe('#on', function() {
  describe("$('.wrapper').on('click', callback)", function() {
    return it('should add event listener to wrapper', function() {
      var event;
      callback = sinon.spy();
      $wrapper.on('click', callback);
      event = document.createEvent('HTMLEvents');
      event.initEvent('click', false, true);
      wrapper.dispatchEvent(event);
      return callback.should.have.been.calledWith(event);
    });
  });
  describe("$('.wrapper').on('click', '.child', callback)", function() {
    return it('should delegate event to child which matches to selector', function() {
      var child, event;
      callback = sinon.spy();
      $wrapper.on('click', '.child', callback);
      child = document.createElement('div');
      child.classList.add('child');
      wrapper.appendChild(child);
      event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, true);
      child.dispatchEvent(event);
      return callback.should.have.been.called;
    });
  });
  describe("$('.wrapper').on('click', '.child', callback)", function() {});
  return it('should not delegate event to child which does not match to selector', function() {
    var child, event;
    callback = sinon.spy();
    $wrapper.on('click', '.child', callback);
    child = document.createElement('div');
    wrapper.appendChild(child);
    event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    child.dispatchEvent(event);
    return callback.should.not.have.been.called;
  });
});

describe('#one', function() {
  return describe("$('.wrapper').one('click', handler)", function() {
    return it('should add event listener that will be removed after first execution', function() {
      var event, handler, i, j;
      handler = sinon.spy();
      $wrapper.one('click', handler);
      for (i = j = 0; j <= 2; i = ++j) {
        event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, true);
        wrapper.dispatchEvent(event);
      }
      return handler.should.have.been.calledOnce;
    });
  });
});

describe('#each', function() {
  describe("$('.child').each(function (index, element) { return 42; })", function() {
    return it('should pass index of iteration and node to callback', function() {
      var child, index, j, len, results, spy, spyCall;
      spy = sinon.spy();
      $children.each(spy);
      index = 0;
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        spyCall = spy.getCall(index);
        spyCall.should.have.been.calledWith(index, child);
        spyCall.should.have.been.calledOn(child);
        results.push(index++);
      }
      return results;
    });
  });
  return describe("$('.child').each(function (index, element) {\n    if (index > 2) {\n        return false;\n    }\n})", function() {
    return it('should stop looping if callback returned false', function() {
      var spy;
      callback = function(index) {
        if (index === 2) {
          return false;
        }
      };
      spy = sinon.spy(callback);
      $children.each(spy);
      return spy.calledThrice.should.be.ok;
    });
  });
});
