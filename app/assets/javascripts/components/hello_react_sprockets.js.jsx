class HelloSprockets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>Hello I am from Sprockets. {this.props.name}!</div>)
    }
}