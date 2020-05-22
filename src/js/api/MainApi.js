export default class MainApi {
  constructor(api) {
    this.baseUrl = api.baseUrl;
    this.headers = api.headers;
    this.credentials = api.credentials;
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
  }

  signin(userEmail, userPassword) {
    return fetch((`${this.baseUrl}/signin`), {
      method: 'POST',
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  signup(userEmail, userPassword, userName) {
    return fetch((`${this.baseUrl}/signup`), {
      method: 'POST',
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  getUserData() {
    return fetch((`${this.baseUrl}/users/me`), {
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  logout() {
    return fetch((`${this.baseUrl}/logout`), {
      method: 'PUT',
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .catch((err) => err);
  }
}
