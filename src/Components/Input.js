import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            original: "",
            result: "",
            method: "",
            options: ["Binary", "ASCII"]
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onTextChange2 = this.onTextChange2.bind(this);
        this.onMethodChange = this.onMethodChange.bind(this);
    }

    async onTextChange(e) { //Encode
        e.persist();
        if (e.target.value === null || e.target.value === "") {
            this.setState({
                original: '',
                result: ''
            });
            return;
        }
        let response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/encode',
            params: {
                method: this.state.method,
                text: e.target.value,
            }
        });
        console.log(response);
        this.setState({
            original: e.target.value,
            result: response.data.text
        });
    }

    onTextChange2(e) { //Decode
        e.persist();
        this.setState((state) => ({
            original: e.target.value,
            result: e.target.value
        }))
    }

    onMethodChange(e) {
        this.setState({
            method: e.target.value
        })
    }

    componentDidMount() {
        this.setState({
            method: this.state.options[0] //Default Method
        })
    }

    render() {
        return (
            <section className="inputs">
                <div className="field">
                    <div className="control">
                        <textarea onChange={this.onTextChange}
                                  defaultValue={this.state.original}
                                  className="textarea is-primary"
                                  placeholder="Texto a cifrar"/>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <div className="select">
                            <select onChange={this.onMethodChange}>
                                {this.state.options.map(e => {
                                    return <option key={e}>{e}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <textarea onChange={this.onTextChange2}
                                  defaultValue={this.state.result}
                                  className="textarea is-info"
                                  placeholder="Resultado"
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default Input;