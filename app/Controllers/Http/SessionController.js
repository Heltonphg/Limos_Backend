"use strict";
const User = use("App/Models/User");
const SnackBar = use("App/Models/SnackBar");

class SessionController {
  async store({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const usr = await User.findByOrFail("email", email);
      await usr.load("avatar");

      if (usr) {
        const token = await auth.authenticator("jwt").attempt(email, password);
        const user = {
          token,
          user_info: usr,
        };
        return user;
      }
    } catch (error) {
      return response.status(error.status).json({
        error: {
          message: "Impossível Autenticar-se com as credenciais fornecidas",
        },
      });
    }
  }

  async singInSnack({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const snk = await SnackBar.findByOrFail("email", email);
      if (snk) {
        const token_snack = await auth
          .authenticator("anotherAuth")
          .attempt(email, password);
        const snackbar = {
          token_snack,
          snack_info: snk,
        };
        return snackbar;
      }
    } catch (error) {
      console.log(error);
      return response.status(error.status).json({
        error: {
          message: "Impossível Autenticar-se com as credenciais fornecidas",
        },
      });
    }
  }
}

module.exports = SessionController;
