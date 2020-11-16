import chai from 'chai';
import Component from './component.vue';

chai.expect(Component.data()).to.eql({
	foo: 'bar',
});
