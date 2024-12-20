import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    basket: [BasketItem]
    basketCount: Int
    basketTotal: Float
    orders: [Order]
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    imageUrl: String!
    price: Float!
    stock: Int!
    onSale: Boolean
    salePrice: Float
    onSaleDate: String
    reviews: [Review]
    reviewCount: Int
    rating: Float
  }

  input ProductInput {
    name: String!
    description: String!
    imageUrl: String!
    price: Float!
    stock: Int!
    onSaleDate: String
  }

  type Review {
    _id: ID
    username: String!
    review: String!
    rating: Int!
    dateCreated: String
  }

  type BasketItem {
    _id: ID
    product: Product!
    quantity: Int
    dateAdded: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    name: String!
    imageUrl: String!
    products: [Product]
    productCount: Int
  }

  input CategoryInput {
    name: String!
    imageUrl: String!
  }

  type CategoryName {
    _id: ID
    name: String!
    imageUrl: String!
    products: [Product]
    productCount: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type CheckoutSession {
    sessionId: String!
    url: String!
  }

  type Query {
    me: User

    product(productId: ID!): Product
    products: [Product]
    category(categoryId: ID!): Category
    categories: [Category]

    categoryByName(categoryName: String!): Category
    categoryNames: [CategoryName]

    checkout(products: [ID!]!): CheckoutSession
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addProduct(productData: ProductInput): Product
    removeProduct(productId: ID!): Product
    addStock(productId: ID!, quantity: Int!): Product
    removeStock(productId: ID!, quantity: Int!): Product

    addCategory(categoryData: CategoryInput): Category
    removeCategory(categoryId: ID!): Category
    addProductToCategory(productId: ID!, categoryId: ID!): Category

    addReview(productId: ID!, review: String!, rating: Int!): Product
    editReview(productId: ID!, review: String!, rating: Int!): Product
    addBasketItem(productId: ID!, quantity: Int!): User
    removeBasketItem(productId: ID!): User
    decrementBasketItem(productId: ID!): User
    clearBasket: User
  }
`;

export default typeDefs;

