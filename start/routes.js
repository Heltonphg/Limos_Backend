"use strict";

const Route = use("Route");

//TODO: ROTA RAIZ
Route.get("/", ({ response }) => {
  return response.send("Olá mundo!");
});

//TODO: CADASTRO DO USER
Route.post("users", "UserController.store").validator("User");

//TODO: Autenticações
Route.post("sigIn", "SessionController.store");
Route.post("sigIn_Snack", "SessionController.singInSnack");

//TODO: Esqueci a senha user
Route.post("forgot", "ForgotPasswordController.store").validator("ResetPass");
Route.put("forgot", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.group(() => {
  Route.resource("addresses", "AddressController")
    .apiOnly()
    .validator(new Map([[["addresses.store"], ["Addresses"]]]));
  Route.resource("snack_address", "SnackAddressController")
    .apiOnly()
    .validator(new Map([[["addresses.store"], ["Addresses"]]]));
  Route.resource("snackbar", "SnackBarController")
    .apiOnly()
    .validator(new Map([[["snackbar.store"], ["SnackBar"]]]));
  Route.resource("category", "CategoryController")
    .apiOnly()
    .validator(new Map([[["category.store"], ["Category"]]]));
  Route.resource("snackbar.products", "ProductController")
    .apiOnly()
    .validator(new Map([[["snackbar.products.store"], ["Product"]]]));
  Route.resource("order", "OrderController").apiOnly();
  Route.resource("products.sizes", "ProductSizeController").apiOnly();
  Route.resource("products_bag", "BagController").apiOnly();

  Route.resource("order_items", "OrderItemController").apiOnly();

  Route.resource("user.favorite", "FavoriteController").apiOnly();

  Route.get("users/:id", "UserController.show");
  Route.post("/avatars", "AvatarController.store").validator("Avatar");
}).middleware(["auth"]);

Route.group(() => {}).middleware(["auth:anotherAuth"]);
