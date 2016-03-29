import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Checkbox from 'react-native-checkbox';

import Layout from '../Layout/Main';

import Validation from '../../Validation';
import { validateData, getUrl } from '../../helper';

export default class Page extends Component {
  validationRules = {
    name: [Validation.Required()],
    email: [Validation.Required(), Validation.Email()],
    password: [Validation.Required(), Validation.MinLength(4, 'Password should be more than %min% characters')],
    terms: [Validation.Equal(1, 'Terms should be accepted!')],
  };

  state = {
    form: {
      name: null,
      email: null,
      password: null,
      terms: 1
    },
    errors: {}
  };

  getData = () => {
    return this.state.form;
  };

  getErrorMessage(element) {
    const error = this.state.errors[element] || null;

    if (Array.isArray(error)) {
      return error[0];
    }

    return error;
  }

  isValid = () => {
    const { isValid, errors } = validateData(this.getData(), this.validationRules);

    this.setState({errors});
    return isValid;
  };

  handleCreateButton = () => {
    if (this.isValid()) {
      fetch(getUrl('register'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.getData())
      })
        .then((responce) => responce.json())
        .then((responceData) => {
          this.setState({errors: responceData.errors || {}});

          console.log(responceData);

          if (responceData.status === 'ok') {
            console.log('OK. Go redirection');
          }
        })
    }
  };

  handleFacebookButton = () => {
    console.log('facebook');
  };

  handleFormChange = (element) => {
    return (event) => {
      this.setState({
        form: {
          ...this.state.form,
          [element]: event.nativeEvent.text
        }
      });
    }
  };

  handleFormCheckboxChange = () => {
    this.setState({
      form: {
        ...this.state.form,
        terms: !this.state.form.terms
      }
    });
  };

  handleClick = () => {
    return this.props.routes.login();
  };

  render() {
    return (
      <Layout>
        <View style={styles.block}>
          <TextInput
            ref={component => this._formName = component}
            style={styles.input}
            name="name"
            placeholder="Name"
            value={this.state.form.name}
            onChange={this.handleFormChange('name')}
          />
          <Text>{this.getErrorMessage('name')}</Text>
        </View>
        <View style={styles.block}>
          <TextInput
            style={styles.input}
            name="email"
            placeholder="Email Address"
            value={this.state.form.email}
            onChange={this.handleFormChange('email')}
          />
          <Text>{this.getErrorMessage('email')}</Text>
        </View>
        <View style={styles.block}>
          <TextInput
            style={styles.input}
            name="password"
            placeholder="Password"
            secureTextEntry
            value={this.state.form.password}
            onChange={this.handleFormChange('password')}
          />
          <Text>{this.getErrorMessage('password')}</Text>
        </View>
        <View style={[styles.center, styles.block]}>
          <Checkbox
            label={<Text>I agree to the Terms & Conditions</Text>}
            checked={!!this.state.form.terms}
            onChange={this.handleFormCheckboxChange}
          />
        </View>

        <View style={styles.block}>
          <TouchableHighlight
            style={[styles.center, styles.button, styles.buttonCreate]}
            onPress={this.handleCreateButton}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.center}>
          <Text>OR</Text>
        </View>

        <View style={styles.block}>
          <TouchableHighlight
            style={[styles.center, styles.button, styles.buttonFacebook]}
            onPress={this.handleFacebookButton}
          >
            <Text style={styles.buttonText}>Sign up with Facebook</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.block}>
          <TouchableHighlight
            onPress={this.handleClick}
          >
            <Text style={styles.buttonText}>Go to SignIn</Text>
          </TouchableHighlight>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  agreeBlock: {
    marginTop: 10,
    marginBottom: 10
  },
  block: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderColor: '#333',
    height: 40,
    fontSize: 20,
    borderWidth: 1,
  },
  button: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#333'
  },
  buttonText: {
    fontSize: 20,
  },
  buttonCreate: {
    backgroundColor: '#3fb7a1'
  },
  buttonFacebook: {
    backgroundColor: '#4564a3'
  }
});