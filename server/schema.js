const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const axios = require("axios");
const KarakterTipi = new GraphQLObjectType({
  name: "Karakter",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    status: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const KonumTipi = new GraphQLObjectType({
  name: "Konum",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    dimension: { type: GraphQLString },
    residents: { type: GraphQLList(GraphQLString) },
  }),
});

const BilgiTipi = new GraphQLObjectType({
  name: "Bilgi",
  fields: () => ({
    pages: { type: GraphQLInt },
    next: { type: GraphQLString },
    prev: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    karakterler: {
      type: new GraphQLList(KarakterTipi),
      args: {
        sayfa: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get("https://rickandmortyapi.com/api/character/?page=" + args.sayfa)
          .then((res) => res.data.results);
      },
    },
    karakterBilgi: {
      type: BilgiTipi,
      args: {
        sayfa: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get("https://rickandmortyapi.com/api/character/?page=" + args.sayfa)
          .then((res) => res.data.info);
      },
    },
    karakter: {
      type: KarakterTipi,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get("https://rickandmortyapi.com/api/character/" + args.id)
          .then((res) => res.data);
      },
    },
    konumlar: {
      type: new GraphQLList(KonumTipi),
      args: {
        sayfa: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get("https://rickandmortyapi.com/api/location?page=" + args.sayfa)
          .then((res) => res.data.results);
      },
    },
    konumBilgi: {
      type: BilgiTipi,
      args: {
        sayfa: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get("https://rickandmortyapi.com/api/location?page=" + args.sayfa)
          .then((res) => res.data.info);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
