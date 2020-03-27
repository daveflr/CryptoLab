import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) {
        this.props.onTextChange(e.target.value, this.props.method);
    }

    render() {
        const text = this.props.text;
        return (
            <div className="field">
                <div className="control">
                        <textarea onChange={this.onTextChange}
                                  value={text}
                                  className="textarea is-primary"
                                  placeholder="Texto original"/>

                </div>
            </div>
        );
    }
}

export default Input;