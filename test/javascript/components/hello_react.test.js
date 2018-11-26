import Hello from 'hello_react';

test('render a Hello component', () => {
    const wrapper = shallow(
        <Hello name='saisai'/>
    );
    expect(wrapper).toMatchSnapshot();
});