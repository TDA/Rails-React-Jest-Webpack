class HelloSprockets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>Hello {props.name}!</div>)
    }
}