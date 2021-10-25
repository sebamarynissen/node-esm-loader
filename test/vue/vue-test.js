import { expect } from 'chai';
import Component from './component.vue';

expect(Component.data()).to.eql({
	foo: 'bar',
});
