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
            options: ["MD5", "SHA-1", "SHA-256", "SHA-512", "Malespin", "XCrypt"]
        };
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        this.onMethodChange = this.onMethodChange.bind(this);
    }

    async encode(text, method) { //Encode
        if (text === null || text === "") {
            this.setState({
                original: '',
                result: ''
            });
            return;
        }
        let response = await axios({
            method: 'get',
            url: 'https://whispering-stream-25026.herokuapp.com/encode',
            params: {
                method: method,
                text: text
            }
        });
        this.setState({
            original: text,
            result: response.data.text
        });
    }

    async decode(text, method) { //Decode
        if (text === null || text === "") {
            this.setState({
                original: '',
                result: ''
            });
            return;
        }
        let response = await axios({
            method: 'get',
            url: 'https://whispering-stream-25026.herokuapp.com/decode',
            params: {
                method: method,
                text: text,
            }
        });
        this.setState((state) => ({
            result: text,
            original: response.data.text
        }))
    }

    onMethodChange(e) {
        e.persist();
        this.encode(this.state.original, e.target.value).then(r => {
            this.setState({
                method: e.target.value
            });
        });
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
                                    return <option key={e} value={e}>{e}</option>
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