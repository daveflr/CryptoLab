import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import Input from "./Input";

class Encoder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            original: "",
            result: "",
            method: "",
            options: ["Binary", "ASCII"]
        };
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        this.onMethodChange = this.onMethodChange.bind(this);
    }

    async encode(text, method) { //Encode
        // e.persist();
        console.log(text, method);
        if (text === null || text === "") {
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
                method: method,
                text: text
            }
        });
        console.log(response);
        this.setState({
            original: text,
            result: response.data.text
        });
    }

    async decode(text, method) { //Decode
        // e.persist();
        console.log(text, method);
        if (text === null || text === "") {
            this.setState({
                original: '',
                result: ''
            });
            return;
        }
        let response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/decode',
            params: {
                method: method,
                text: text,
            }
        });
        console.log(response);
        this.setState((state) => ({
            result: text,
            original: response.data.text
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
        const originalText = this.state.original;
        const resultText = this.state.result;
        const method = this.state.method;
        return (
            <section className="inputs">

                <Input onTextChange={this.encode}
                       text={originalText}
                       method={method}/>

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

                <Input onTextChange={this.decode}
                       text={resultText}
                       method={method}/>

            </section>
        );
    }
}

export default Encoder;